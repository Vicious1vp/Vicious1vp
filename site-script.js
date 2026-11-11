
// EDIT YOUR LINKS HERE. Leave empty until you have the real URL.
const TWITCH_STATUS_API_URL='./data/twitch-status.json'; // GitHub Pages generated feed
const QOTD_API_URL='./data/qotd.json'; // GitHub Pages generated feed
const SITE={twitchUsername:'Vicious1vp',websiteDomain:'vicious1vp.github.io',youtubeChannelId:'UCJ5wVSvYwwlmMZmLgea77UA',youtubeVideoId:'',links:{twitch:'https://www.twitch.tv/Vicious1vp',youtube:'https://www.youtube.com/channel/UCJ5wVSvYwwlmMZmLgea77UA',discord:'https://discord.gg/fpEeUbtRfb',tiktok:'https://www.tiktok.com/@vicious1vp',instagram:'https://www.instagram.com/vicious1vp/',x:'https://twitter.com/vicious1vp',threads:'https://www.threads.net/@vicious1vp',bluesky:'https://bsky.app/profile/vicious1vp.bsky.social',facebook:'https://www.facebook.com/profile.php?id=61557901868190',gamerprofiles:'https://gamerprofiles.com/gamer/Vicious1vp',kick:'https://www.kick.com/vicious1vp',throne:'https://throne.com/vicious1vp',merch:'https://streamlabs.com/vicious1vp/merch'}};

// Seven community invites provided by Vicious1VP. Replace generic names/descriptions when server details are supplied.
const TRUSTED_DISCORDS=[
  {name:'Featured Community',description:'Explore this featured Discord community.',invite:'https://discord.gg/Erj47qnv5c'},
  {name:'Featured Community',description:'Explore this featured Discord community.',invite:'https://discord.gg/7zN4u8v3eq'},
  {name:'Featured Community',description:'Explore this featured Discord community.',invite:'https://discord.gg/Jx5fGDg7W3'},
  {name:'Featured Community',description:'Explore this featured Discord community.',invite:'https://discord.gg/Y8Q7vwQMAe'},
  {name:'Featured Community',description:'Explore this featured Discord community.',invite:'https://discord.gg/VEqw5WvSGP'},
  {name:'Featured Community',description:'Explore this featured Discord community.',invite:'https://discord.gg/zyfvnSJgnj'}
];
const trustedGrid=document.getElementById('trusted-discord-grid');
if(TRUSTED_DISCORDS.length){trustedGrid.replaceChildren();for(const server of TRUSTED_DISCORDS){if(!server.name||!server.invite||!/^https:\/\/(discord\.gg|discord\.com\/invite)\//i.test(server.invite))continue;const card=document.createElement('article');card.className='trusted-card';const icon=document.createElement('span');icon.className='trusted-icon';icon.textContent='⚡';const label=document.createElement('span');label.className='trusted-label';label.textContent='TRUSTED COMMUNITY';const title=document.createElement('h3');title.textContent=server.name;const desc=document.createElement('p');desc.textContent=server.description||'Discover this community on Discord.';const a=document.createElement('a');a.className='btn secondary';a.href=server.invite;a.target='_blank';a.rel='noopener noreferrer';a.textContent='JOIN DISCORD ↗';card.append(icon,label,title,desc,a);trustedGrid.append(card);
// Public Discord invite preview: update names and descriptions when the API permits it.
const inviteCode=server.invite.split('/').pop();
fetch('https://discord.com/api/v10/invites/'+encodeURIComponent(inviteCode)+'?with_counts=true', {mode:'cors'})
 .then(response=>{if(!response.ok)throw Error('Invite lookup unavailable');return response.json()})
 .then(data=>{if(data.guild&&data.guild.name){title.textContent=data.guild.name;desc.textContent=data.guild.description||'Explore '+data.guild.name+' on Discord.';if(data.guild.icon&&data.guild.id){const img=document.createElement('img');img.src='https://cdn.discordapp.com/icons/'+encodeURIComponent(data.guild.id)+'/'+encodeURIComponent(data.guild.icon)+'.png?size=128';img.alt='';img.loading='lazy';img.style.cssText='width:100%;height:100%;object-fit:cover;border-radius:inherit';icon.replaceChildren(img)}}})
 .catch(()=>{title.textContent='Featured Community';desc.textContent='Explore this trusted Discord community. Invite: '+inviteCode});}if(!trustedGrid.children.length){trustedGrid.innerHTML='<div class="trusted-empty"><h3>TRUSTED COMMUNITIES COMING SOON</h3><p>Featured servers will appear here once they are approved.</p></div>'}}
document.getElementById('year').textContent=new Date().getFullYear();
for(const a of document.querySelectorAll('[data-link]')){const url=SITE.links[a.dataset.link];if(url){a.href=url;a.target='_blank';a.rel='noopener noreferrer'}else{a.setAttribute('aria-disabled','true');a.title='Link coming soon';a.addEventListener('click',e=>{e.preventDefault();alert('This link will be available soon!')})}}
const labels={twitch:'Twitch',youtube:'YouTube',discord:'Discord',tiktok:'TikTok',instagram:'Instagram',x:'X / Twitter',threads:'Threads',bluesky:'Bluesky',facebook:'Facebook',gamerprofiles:'GamerProfiles',kick:'Kick',throne:'Throne',merch:'Merch'};
const footerPlatforms=[['twitch','Twitch','◈'],['youtube','YouTube','▶'],['discord','Discord','◉'],['tiktok','TikTok','♪'],['instagram','Instagram','◎'],['x','X / Twitter','𝕏'],['threads','Threads','@'],['bluesky','Bluesky','☁'],['facebook','Facebook','f'],['gamerprofiles','GamerProfiles','🎮'],['kick','Kick','▶'],['merch','Merch Store','🛍'],['throne','Throne','♛']];const footerGrid=document.getElementById('footer-social-grid');for(const [key,label,symbol] of footerPlatforms){const url=SITE.links[key];const el=document.createElement(url?'a':'div');el.className='footer-social-link'+(url?'':' pending');if(url){el.href=url;el.target='_blank';el.rel='noopener noreferrer';el.setAttribute('aria-label','Visit Vicious1VP on '+label)}else{el.title=label+' link coming soon';}const ico=document.createElement('span');ico.className='social-symbol';ico.textContent=symbol;const copy=document.createElement('span');const name=document.createElement('strong');name.textContent=label;const status=document.createElement('small');status.textContent=url?'Follow / Join ↗':'Link coming soon';copy.append(name,status);el.append(ico,copy);footerGrid.append(el)}
if(SITE.twitchUsername&&location.protocol==='https:'&&location.hostname){const f=document.createElement('iframe');f.title='Vicious1VP Twitch stream';f.allowFullscreen=true;f.src=`https://player.twitch.tv/?channel=${encodeURIComponent(SITE.twitchUsername)}&parent=${encodeURIComponent(location.hostname)}`;document.getElementById('twitch-player').replaceChildren(f)}else if(SITE.twitchUsername){document.getElementById('twitch-player').innerHTML='<div class="video-placeholder"><b>▶</b><strong>Watch Vicious1VP on Twitch</strong><p>Live player activates when the website is published with HTTPS.</p><a class="btn" href="https://www.twitch.tv/Vicious1vp" target="_blank" rel="noopener noreferrer">Open Twitch ↗</a></div>'}
if(SITE.youtubeVideoId||SITE.youtubeChannelId){const f=document.createElement('iframe');f.title='Vicious1VP YouTube videos';f.allowFullscreen=true;f.loading='lazy';f.referrerPolicy='strict-origin-when-cross-origin';const uploadsId=SITE.youtubeChannelId?'UU'+SITE.youtubeChannelId.slice(2):'';f.src=SITE.youtubeVideoId?`https://www.youtube-nocookie.com/embed/${encodeURIComponent(SITE.youtubeVideoId)}`:`https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(uploadsId)}`;document.getElementById('youtube-feature').replaceChildren(f)}
// Pull the newest tagged QOTD from a separately hosted, read-only Worker endpoint.
async function refreshDiscordQotd(){
 const question=document.getElementById('discord-qotd-question');
 const status=document.getElementById('discord-qotd-status');
 const post=document.getElementById('discord-qotd-post');
 if(!QOTD_API_URL){return;}
 try{
  const response=await fetch(QOTD_API_URL,{cache:'no-store'});
  if(!response.ok)throw new Error('QOTD feed unavailable');
  const data=await response.json();
  if(!data.question){status.textContent='No QOTD has been posted in Discord yet.';return;}
  question.textContent=data.question;
  status.textContent='Latest Discord QOTD'+(data.timestamp?' • '+new Date(data.timestamp).toLocaleString():'');
  if(data.url&&/^https:\/\/discord\.com\/channels\/813239704195301386\/1547970307074171010\/\d+$/.test(data.url)){post.href=data.url;post.textContent='VIEW ORIGINAL QOTD ↗';}
 }catch(err){status.textContent='QOTD temporarily unavailable. Open Discord to see the latest question.';}
}
refreshDiscordQotd();
if(QOTD_API_URL)window.setInterval(refreshDiscordQotd,120000);

// Twitch live status: status is unknown unless the API is configured and responds.
async function refreshTwitchStatus(){
 const badge=document.getElementById('twitch-live-status');
 const label=document.getElementById('twitch-live-label');
 const heading=document.getElementById('live-state-heading');
 const desc=document.getElementById('live-state-description');
 const action=document.getElementById('live-state-action');
 if(!TWITCH_STATUS_API_URL){label.textContent='CHECK TWITCH';heading.textContent='Catch Vicious1VP on Twitch';desc.textContent='Live status will appear here once Twitch integration is connected.';return;}
 try{
  const res=await fetch(TWITCH_STATUS_API_URL,{cache:'no-store'});
  if(!res.ok)throw new Error('Status unavailable');
  const data=await res.json();
  if(typeof data.live!=='boolean')throw new Error('Invalid status');
  badge.classList.toggle('is-live',data.live);
  label.textContent=data.live?'🔴 LIVE NOW':'OFFLINE';
  heading.textContent=data.live?'Vicious1VP is live right now!':'Stream is currently offline';
  desc.textContent=data.live?(data.title||'Jump into the stream for games, laughs and community!'):'Missed the stream? Watch recent videos and highlights on YouTube.';
  action.textContent=data.live?'Watch Live on Twitch ↗':'Watch YouTube Highlights ↗';
  action.href=data.live?'https://www.twitch.tv/Vicious1vp':'https://www.youtube.com/channel/UCJ5wVSvYwwlmMZmLgea77UA';
 }catch(err){badge.classList.remove('is-live');label.textContent='STATUS UNAVAILABLE';heading.textContent='Catch Vicious1VP on Twitch';desc.textContent='Unable to verify live status right now. Check Twitch directly.';action.href='https://www.twitch.tv/Vicious1vp';action.textContent='Check Twitch ↗';}
}
refreshTwitchStatus();
if(TWITCH_STATUS_API_URL)window.setInterval(refreshTwitchStatus,60000);
