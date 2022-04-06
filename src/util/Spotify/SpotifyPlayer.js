
import { accessToken } from "./Spotify";

const SpotifyPlayer = {

    initializePlayer() {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.head.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = accessToken;
            const player = new window.Spotify.Player({
                name: 'Up-lify',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
            // Ready
            player.addListener('ready', ({ device_id }) => {
                // console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });

            player.addListener('account_error', ({ message }) => {
                console.error(message);
            });

            player.connect();
        }
    }
}

export {SpotifyPlayer};