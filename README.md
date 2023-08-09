# Wallpaper App

![](https://github.com/skorodenko/WallpaperApp/blob/master/preview.GIF)

This is an app to host wallpapers. Designed to work well on both desktop and mobile.

## App capabilities:

- Create user account
- Upload wallpapers by users (Add tags to images during upload)
- View (and download) uploaded wallpapers
- Upvote/Dornvote wallpapers on the website
- Sort by date/upvote count

## Techonlogical stack:
- Django + DRF + JWT token auth
- React
- Docker

## How to run:
Start using docker compose
```
docker compose up
```

## Test usecase:
1. Register account
2. Log in
3. Automatically redirected to account page
4. Click upload button
5. Click on circkle button
6. Add wallpapers
7. __Optional__ add tags
8. Click on upload staged to upload wallpapers
9. Go to homepage to view wallpapers

## Todo:

- Add tag search
- Add monetiztion (possibly some crypto miner)
- Improve stability and performance
