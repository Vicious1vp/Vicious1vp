# Automatic Twitch live status — V32

The site now has a live/offline badge, Twitch link when live, and YouTube highlights link when offline. **Status is not active until the API is deployed.** Until then it displays CHECK TWITCH (not a false offline status).

1. Create a Twitch developer application at https://dev.twitch.tv/console/apps and obtain its Client ID and Client Secret. Set its OAuth redirect URL according to Twitch's app registration requirements; this Worker uses an app access token, not a user login.
2. Deploy `twitch-status-worker.js` as a Cloudflare Worker (separate from the Discord QOTD Worker).
3. In the Worker's Settings > Variables and Secrets, set `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET` as **secrets**. Never put the secret in index.html.
4. Copy the deployed Worker URL (https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev) into `TWITCH_STATUS_API_URL` near the bottom of `index.html`.
5. Publish the updated website and test while live and offline. The page checks every 60 seconds; API responses are cacheable for 45 seconds.

The Worker queries Twitch Helix's official `/helix/streams?user_login=Vicious1vp` endpoint. No login is required for website visitors. Consider restricting the Worker CORS origin to your final site domain before public launch.
