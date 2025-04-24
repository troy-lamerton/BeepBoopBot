# Hosting the static files

surge.sh hosting is unreliable - currently seeing 503 responses

## Automatic deployment

- [x] Deployment on changes to the webpage folder to a static site hostage like:
    - [x] cloudflare pages
    - github pages

## Monitoring

To ensure the site is up, and cached in an AU/NZ region

- [ ] Automated: load page, check an Element (rendered by react) is shown

## Browser support

- [ ] show the alert warning later (after first react full render or just setTimeout 3 seconds)
    - [ ] save to localStorage that alert was shown at this date
- [ ] Safari: remove the alert altogether if it looks good
- [ ] Firefox: fix the elevator image not showing (0x0 width height)

Mobile:

- [ ] make the select level button shown as hamburger icon sooner

Audio:

- [ ] autoplaying the music (without user click) doesn't work in 2025 but we probably don't want it anyway