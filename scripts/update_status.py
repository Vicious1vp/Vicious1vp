#!/usr/bin/env python3
"""Build public status JSON for a static GitHub Pages site; secrets only in Actions."""
import json, os, re, urllib.request, urllib.parse
from datetime import datetime, timezone
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'data'
DATA.mkdir(exist_ok=True)

def request(url, headers=None, body=None):
    req=urllib.request.Request(url,headers=headers or {},data=body)
    with urllib.request.urlopen(req,timeout=20) as res:
        return json.load(res)

def write(name, value):
    (DATA/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def twitch():
    client=os.environ.get('TWITCH_CLIENT_ID')
    secret=os.environ.get('TWITCH_CLIENT_SECRET')
    if not client or not secret:
        print('Twitch credentials missing; status unavailable')
        write('twitch-status.json',{'live':None,'checked_at':None})
        return
    params=urllib.parse.urlencode({'client_id':client,'client_secret':secret,'grant_type':'client_credentials'}).encode()
    token=request('https://id.twitch.tv/oauth2/token',body=params)['access_token']
    result=request('https://api.twitch.tv/helix/streams?user_login=Vicious1vp',{'Client-ID':client,'Authorization':'Bearer '+token})
    stream=(result.get('data') or [None])[0]
    write('twitch-status.json',{'live':bool(stream),'title':stream.get('title','') if stream else '', 'game':stream.get('game_name','') if stream else '', 'checked_at':datetime.now(timezone.utc).isoformat()})

def discord():
    token=os.environ.get('DISCORD_BOT_TOKEN')
    if not token:
        print('Discord bot token missing; retaining existing QOTD')
        return
    channel='1547970307074171010'
    guild='813239704195301386'
    tag=re.compile(r'(?:🟢\s*)?VICIOUS\s+QOTD(?:\s*🟢)?',re.I)
    before=None
    for _ in range(3):
        url=f'https://discord.com/api/v10/channels/{channel}/messages?limit=100'
        if before: url+='&before='+before
        messages=request(url,{'Authorization':'Bot '+token,'User-Agent':'Vicious1vpSite/1.0'})
        for message in messages:
            content=message.get('content') or ''
            match=tag.search(content)
            if match:
                question=content[:match.start()]+content[match.end():]
                question=question.strip(' \n\r\t:–—-')
                write('qotd.json',{'question':question or content,'timestamp':message.get('timestamp'), 'url':f'https://discord.com/channels/{guild}/{channel}/{message["id"]}'})
                return
        if len(messages)<100: break
        before=messages[-1]['id']
    print('No matching QOTD found; retaining previous QOTD')


def youtube():
    key=os.environ.get('YOUTUBE_API_KEY')
    if not key:
        print('YouTube API key missing; retaining existing data')
        return
    def api(resource, **params):
        params['key']=key
        return request('https://www.googleapis.com/youtube/v3/'+resource+'?'+urllib.parse.urlencode(params))
    result=api('channels',part='contentDetails',id='UCJ5wVSvYwwlmMZmLgea77UA')
    playlist=result['items'][0]['contentDetails']['relatedPlaylists']['uploads']
    ids=[]
    page=None
    while len(ids)<100:
        params={'part':'contentDetails','playlistId':playlist,'maxResults':50}
        if page: params['pageToken']=page
        result=api('playlistItems',**params)
        ids += [i['contentDetails']['videoId'] for i in result.get('items',[]) if i.get('contentDetails',{}).get('videoId')]
        page=result.get('nextPageToken')
        if not page: break
    videos=[]
    for start in range(0,len(ids),50):
        result=api('videos',part='snippet,contentDetails,status',id=','.join(ids[start:start+50]))
        videos+=result.get('items',[])
    output={'video':None,'short':None}
    for video in sorted(videos,key=lambda v:v.get('snippet',{}).get('publishedAt',''),reverse=True):
        if video.get('status',{}).get('privacyStatus')!='public': continue
        duration=video.get('contentDetails',{}).get('duration','')
        m=re.fullmatch(r'P(?:(\\d+)D)?T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+)S)?',duration)
        if not m: continue
        seconds=int(m.group(1) or 0)*86400+int(m.group(2) or 0)*3600+int(m.group(3) or 0)*60+int(m.group(4) or 0)
        if seconds<=0: continue
        kind='short' if seconds<=180 else 'video'
        if output[kind]: continue
        info=video['snippet']
        thumbnails=info.get('thumbnails',{})
        thumb=(thumbnails.get('high') or thumbnails.get('medium') or thumbnails.get('default') or {}).get('url','')
        vid=video['id']
        output[kind]={'id':vid,'title':info.get('title','YouTube upload'),'thumbnail':thumb,'published_at':info.get('publishedAt',''),'url':('https://www.youtube.com/shorts/' if kind=='short' else 'https://www.youtube.com/watch?v=')+vid}
        if output['video'] and output['short']: break
    output['checked_at']=datetime.now(timezone.utc).isoformat()
    write('youtube-latest.json',output)

for name,func in [('Twitch',twitch),('Discord',discord),('YouTube',youtube)]:
    try: func()
    except Exception as exc:
        print(f'{name} refresh failed: {exc}; retaining previous data')
        if name=='Twitch': write('twitch-status.json',{'live':None,'checked_at':None})
