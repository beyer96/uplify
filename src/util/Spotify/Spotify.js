var authCode;
var accessToken;
const redirect = 'http://localhost:3000/';
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
            }, data.expires_in * 1000);
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
                uri: playlist.uri
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
                id: device.id
            }))
        })
    },
    changeDevice(deviceID) {
        return fetch('https://api.spotify.com/v1/me/player', {
            headers: {'Authorization': `Bearer ${accessToken}`},
            method: 'PUT',
            body: JSON.stringify({
                device_ids: [deviceID],
                play: true
            })
        })
    },
    search(query) {
        return fetch('https://api.spotify.com/v1/search?type=album&include_external=audio', {
            'Authorization': `Bearer ${accessToken}` 
        })
    }
}
/*
// helper function, get random string of any length needed
function generateRandomString(number) {
    let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for(let x = 0; x < number; x++) {
        randomString += chars.charAt(Math.floor(Math.random() * number));
    }
    return randomString;
}
*/
export {Spotify, accessToken, authCode};