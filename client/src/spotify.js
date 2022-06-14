const authEndpoint = 'https://accounts.spotify.com/authorize';

const redirectURL = 'http://localhost:3000/mood/';

const scopes = ['streaming', 'user-read-email', 'user-read-private', 'user-read-recently-played']

export const loginURL = `${authEndpoint}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectURL}&scope=${scopes.join('%20')}`