# Vicious1VP V34 — Launch on GitHub Pages

Website: https://vicious1vp.github.io/Vicious1vp/
Repository: https://github.com/vicious1vp/Vicious1vp

## Upload
1. Extract this ZIP on your computer.
2. Open the GitHub repository, choose **Add file → Upload files**, and upload the files and folders into the repository root. **Important:** GitHub browser uploads may not preserve hidden `.github` folders reliably. For the workflow, use GitHub web editor to create `.github/workflows/update-site.yml` with the content in this ZIP, or use Git locally.
3. Commit to the `main` branch. Do not upload the ZIP as one file.
4. In repository **Settings → Pages**, choose **GitHub Actions** as the build/deployment source.
5. In **Actions**, open **Update Twitch and Discord data / Deploy Pages**, then **Run workflow**. Check that it completes successfully.

## Enable live status
6. Create a Twitch developer application at https://dev.twitch.tv/console/apps and obtain Client ID and Client Secret. Never paste the secret into website code.
7. Repository **Settings → Secrets and variables → Actions → New repository secret**: add `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET`.

## Enable Discord QOTD
8. Create a bot application at https://discord.com/developers/applications and enable **Message Content Intent** on the Bot page. Invite the bot to your server with View Channel and Read Message History permissions for channel `1547970307074171010`.
9. Add GitHub Actions repository secret `DISCORD_BOT_TOKEN` with the bot token. Do not post it in chat or commit it to GitHub.
10. Run the workflow again, then check https://vicious1vp.github.io/Vicious1vp/data/twitch-status.json and https://vicious1vp.github.io/Vicious1vp/data/qotd.json. Both should contain refreshed values.

## Verify
- Visit the live site in a private/incognito browser and on mobile. Test images, links, YouTube/Twitch embeds, QOTD, and live badge.
- The workflow runs about every five minutes; GitHub scheduled runs can be delayed. The live badge falls back to CHECK TWITCH when the feed is older than 20 minutes.
- GitHub Pages must be set to deploy using GitHub Actions. This package does not configure your GitHub account or create secrets automatically.
