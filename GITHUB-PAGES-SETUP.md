# Vicious1VP GitHub Pages setup

Website: https://vicious1vp.github.io/Vicious1vp/
Repository: https://github.com/vicious1vp/Vicious1vp

## Upload
Upload the contents of this ZIP to the ROOT of the `main` branch, preserving `.github/workflows/update-site.yml`, `scripts/update_status.py`, `data/`, and `index.html`. GitHub's web uploader may hide dot-directories; verify the `.github` workflow was uploaded. Use git or GitHub's file editor if needed.

## Configure GitHub Pages
Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Add repository secrets
Repository **Settings → Secrets and variables → Actions → New repository secret**:

- `TWITCH_CLIENT_ID`: From a Twitch developer application at https://dev.twitch.tv/console/apps
- `TWITCH_CLIENT_SECRET`: From that Twitch developer application (never place it in HTML or public files)
- `DISCORD_BOT_TOKEN`: From a Discord Developer Portal bot at https://discord.com/developers/applications

The Discord bot must be invited to guild `813239704195301386` and granted **View Channel** and **Read Message History** in channel `1547970307074171010`. In the Discord Developer Portal, enable the bot's **Message Content Intent** so its API can read QOTD text. Do not share tokens in chat.

## Run and verify
Go to **Actions → Update Twitch and Discord data / Deploy Pages → Run workflow**. When deployment finishes, verify:

- https://vicious1vp.github.io/Vicious1vp/data/twitch-status.json
- https://vicious1vp.github.io/Vicious1vp/data/qotd.json

The website will use these files to display the status and latest tagged Discord QOTD. Scheduled checks are requested every 5 minutes, but GitHub may delay or skip scheduled runs. Browser refreshes are every 60 seconds for Twitch and 2 minutes for QOTD; those refreshes cannot be faster than the latest published data. If credentials or API requests fail, the previous successful data is retained. For Twitch, that means the displayed status can become stale after an API failure.

**Note:** This package does not activate the integration until you upload it, configure the secrets and Pages, and run the workflow. GitHub Actions workflows on public repositories may be disabled after long periods of inactivity.
