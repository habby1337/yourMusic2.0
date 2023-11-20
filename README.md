# YourMusic2.0


## 1. Setup
`docker-compose.yml` is included for easy setup. You can also run the app locally by running `npm install` and `npm start` in both the `client` and `server` directories.

### 1.2 What to change
- Change the `docker-compose.yml` file to include your own spotify client id and secret. You can get these by creating a new app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
- Also change the `spotify_redirect_uri` to your own redirect uri. This can be anything you want, but it has to be the same as the redirect uri you set in the Spotify Developer Dashboard.
- The `homepage_url` is used to redirect to the homepage from the php file.
you can find what i'm talking about in the `backend/api/v1/callback.php` line **22**
- Change in the `frontend/.env` the `VITE_API_URL` to the backend url.


### 1.3 Running the app
- Run `docker-compose up` in the root directory to start the app.   




 
