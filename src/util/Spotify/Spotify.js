var authCode;
var accessToken;
const redirect = 'http://uplify.netlify.app';
const clientID = 'e844090178ad411d93f568bd9d8038d0';
const clientSecret = 'e3e44d2521be4f84a88ad7305814f7e4';


const Spotify = {
    // get access token to use Spotify API
    getAuthCode() {
        const authCodeMatch = window.location.href.match(/code=([^&]*)/);
        if(authCodeMatch) {
            authCode = authCodeMatch[1];
            return authCode;
        }
        else {
            var scope = 'playlist-modify-public+user-modify-playback-state+user-read-playback-state+streaming+user-read-email+user-read-private'
            var url = 'https://accounts.spotify.com/authorize?';
            url += 'client_id=' + clientID;
            url += '&response_type=code';
            url += '&redirect_uri=' + redirect;
            url += '&scope=' + scope;
            
            window.location = url;
        }
    },
    getToken(authCode) {
        if(accessToken) {
            return accessToken;
        }
        if(!authCode) {
            authCode = this.getAuthCode();
        }
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret)
        }
        return fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: headers,
            body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${encodeURIComponent(redirect)}`
        })
        .then(response => response.json())
        .then(data => {
            window.history.pushState('Access Token', null, '/');
            accessToken = data.access_token;
            setTimeout((accessToken) => {
                accessToken = undefined;
            }, data.expires_in * 10000);
        });
    },
    returnUser() {
        return fetch('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        })
    },
    getUserPlaylists() {
        // get user ID
        return this.returnUser()
        .then(response => response.json())
        .then(jsonResponse => {
            var user_id = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                headers: {'Authorization': `Bearer ${accessToken}`}
            })
        })
        .then(response1 => response1.json())
        .then(jsonResponse1 => {
            return jsonResponse1.items.map(playlist => ({
                name: playlist.name,
                uri: playlist.uri,
                id: playlist.id
            }))
        })
        
    },
    getActiveDevices() {
        return fetch('https://api.spotify.com/v1/me/player/devices', {
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        .then(devices => devices.json())
        .then(activeDevices => {
            return activeDevices.devices.map(device => ({
                name: device.name,
                id: device.id,
                is_active: device.is_active
            }))
        })
    },
    getCurrentTrack() {
        return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        .then(response => {
            if(response.status === 204) {
                throw new Error('No song playing currently on any device');
            }
            return response.json()
        })
        .then(track => {
            return {
                name: track.item.name,
                artist: track.item.artists[0].name,
                album: track.item.album.name,
                album_img: track.item.album.images[0].url,
                track_length: track.item.duration_ms,
                track_uri: track.item.uri
            }
        });    
    },
    skipToPrev() {
        return fetch('https://api.spotify.com/v1/me/player/previous', {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'POST'
        })
    },
    skipToNext() {
        return fetch('https://api.spotify.com/v1/me/player/next', {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'POST'
        })
    },
    play() {
        return fetch('https://api.spotify.com/v1/me/player/play', {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'PUT'
        })
    },
    pause() {
        return fetch('https://api.spotify.com/v1/me/player/pause', {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'PUT'
        })
    },
    setPlayerVolume(volume) {
        return fetch('https://api.spotify.com/v1/me/player/volume?volume_percent='+volume, {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'PUT'
        })
    },
    setTrackTime(position_ms) {
        return fetch('https://api.spotify.com/v1/me/player/seek?position_ms='+position_ms, {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'PUT'
        })
    },
    changeDevice(deviceID) {
        return fetch('https://api.spotify.com/v1/me/player', {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'PUT',
            body: JSON.stringify({
                device_ids: [deviceID]
            })
        })
    },
    updatePlayer() {
        return fetch('https://api.spotify.com/v1/me/player', {
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        .then(response => {
            if(response.status === 204) {
                return '204'
            }
            return response.json()
        })
        .then(data => {
            return data;
        })
    },
    search(query) {
        if(query.trim() === '') {
            throw new Error('Nothing to search');
        }
        return fetch('https://api.spotify.com/v1/search?q='+query+'&type=track,album,artist&limit=30', {
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        .then(response => response.json())
        .then(data => {
            let tracks = data.tracks.items.map(track => {
                return {
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    album_img: track.album.images[0].url,
                    track_length: track.duration_ms,
                    uri: track.uri
                }
            })
            let artists = data.artists.items.map(artist => {
                return {
                    name: artist.name,
                    context_uri: artist.uri
                }
            })
            let albums = data.albums.items.map(album => {
                return {
                    name: album.name,
                    type: album.album_type,     // single or album
                    artist: album.artists[0].name,
                    context_uri: album.uri,
                    id: album.id
                }
            })
            return {
                tracks: tracks,
                artists: artists,
                albums: albums
            }
        })
    },
    playChosenSong(uri) {
        return fetch('https://api.spotify.com/v1/me/player/play', {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'PUT',
            body: JSON.stringify({
                uris: [uri]
            })
        })
    },
    playChosenAlbum(context_uri) {
        return fetch('https://api.spotify.com/v1/me/player/play', {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'PUT',
            body: JSON.stringify({
                context_uri: context_uri,
                offset: {
                    position: 0
                }
            })
        })
    },
    playChosenArtist(context_uri) {
        return fetch('https://api.spotify.com/v1/me/player/play', {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'PUT',
            body: JSON.stringify({
                context_uri: context_uri
            })
        })
    },
    createPlaylist(playlistName, track_uris) {
        return this.returnUser()
        .then(response => response.json())
        .then(jsonResponse => {
            var user_id = jsonResponse.id;
            // create new playlist in Spotify
            fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                headers: {'Authorization': `Bearer ${accessToken}`},
                method: 'POST',
                body: JSON.stringify({
                    name: playlistName
                })
            })
            .then(playlistResponse => playlistResponse.json())
            .then(data => {
                let playlist_id = data.id;
                fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
                    headers: {'Authorization': `Bearer ${accessToken}`},
                    method: 'POST',
                    body: JSON.stringify({
                        uris: track_uris
                    })
                })
            })
        })
    },
    getChosenPlaylist(playlist_id) {
        return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        .then(response => response.json())
        .then(playlist => {
            return {
                name: playlist.name,
                tracks: playlist.tracks.items,
                id: playlist.id
            }
        })
    },
    deleteSongInPlaylist(playlist_id, track_uri) {
        return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'DELETE',
            body: JSON.stringify({
                tracks: [{
                    uri: track_uri
                }]
            })
        })
    }
}
export {Spotify, accessToken, authCode};