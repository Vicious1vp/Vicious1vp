# Vicious1VP Discord QOTD auto-sync setup

Discord server: `813239704195301386`  
QOTD channel: `1547970307074171010`

1. Create a Discord application and bot in the Discord Developer Portal. Turn on **Message Content Intent** (required to read message text).
2. Invite the bot to your Discord server with **View Channel** and **Read Message History** permission for the QOTD channel. No administrator permission is needed.
3. Create a Cloudflare account and install Wrangler (`npm install -g wrangler`), then log in (`wrangler login`).
4. From this website directory, run `wrangler secret put DISCORD_BOT_TOKEN` and paste your bot token into the terminal prompt. **Never paste the token into index.html or share it publicly.**
5. Run `wrangler deploy`. Copy the Worker URL printed by Wrangler.
6. Open `index.html` and set `QOTD_API_URL` to the Worker URL, e.g. `const QOTD_API_URL='https://vicious1vp-discord-qotd.YOUR-SUBDOMAIN.workers.dev';`.
7. Publish the updated website. New QOTDs tagged `🟢 VICIOUS QOTD 🟢` are read from the channel and displayed automatically, with up to 2 minutes of browser refresh delay and about 1 minute of Worker caching.

The Worker only reads up to 300 recent channel messages; if the newest tagged QOTD is older than that it won't be found. The Worker returns the newest matching message, not arbitrary channel messages. The website shows a Discord link when the integration is not deployed or unavailable. This is **not live yet** until steps 1–7 are complete. QOTD text is rendered as text, not HTML. The public Worker endpoint allows read-only access to the latest QOTD.
