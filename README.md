# Up-lify - small "Spotify" app in your browser

App based on Spotify API and Spotify Web-player SDK enables few functions, mainly to **manage** your playlists, **search** for new music and also **play** it in your browser.

## Usage

Just open the app in your browser via [this link](). You will be redirected to the Spotify login and afterwards to consent needed authorization scope for the app. Next, you should be redirected back to the app. When you open it, you see the app interface, which could is split in three parts: 

1) **Left panel**: 
This is where you find search bar, your own Spotify playlists, and also Spotify Web-player, where you can toggle choosing currently active device (either Up-lify app, your desktop/mobile Spotify app, etc...). 

2) **Central Panel**:
In the middle, there's a container holding search results. It stands with few filters - you can get either tracks, albums or artists results based on your search string. Those results you can immediately send to the Web-player on the left panel and listen to your favorite music. "Tracks" filter also enables to add track to new playlist, which you can create on the right side of the app.

3) **Right panel**:
Right side holds informations about new playlist, you might create, or it lists tracks from your own Spotify playlists. Visible content depends on your actions in the app. New playlists gets saved in Spotify immediately after clicking "Save playlist" button. In existing playlists, you can remove single tracks, or just play them.

**Warning:** When you click "X" button, belonging track in existing playlist **gets removed instantly**, without reassurance. Be aware of that before using app :)

## Technologies

1) React
2) Javascript
3) DOM
4) HTML
5) CSS


## Other notes
* **Main goal** of this project was to start learning React in practice ASAP. 
* **Optimalization** - project is not responsive and not optimalized for all browsers (tested only in Chrome and Opera GX) as it wasn't main goal of this project. 
* **Practical usability** of this app is honestly zero as the main goal of creating this was otherelse...