# YourMusic2.0

## 0. About
A better interface for your Spotify library. Built with React and the Spotify API.

### 0.1 What's new
- [x] New UI
- [X] Random Suggestions
- [X] Current song playing
- [X] Clickable song name to open spotify
- [X] Better search experience
- [X] Playback estimation
- [x] Infinite scroll not working on chorme / safari
- [X] fix chrome searchbar moving the playback card way to low 
- [X] Menu closing animation

### 0.2 Why doing it again?
So, I looked at the original project UI and i thought, 'Hmm, this needs a makeover'. So i decided it's time to pimp up the project's interface, make it more modern and more user friendly. I also added some new features that i thought would be cool to have, like, i'm not kidding, i've added more features than a Swiss Army knife on steroids. It's like the original project was using stone tools.

# 1. How do i run it?

## 1. Setup
### 1.1 Prerequisites
- Got to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and create a new app.

### 1.2 Configuration
`docker-compose.yml` is included for easy setup. You can also run the app locally by running `npm install` and `npm start`.

#### What to change
- Change the `docker-compose.yml` file to include your own spotify client id and secret. You can get these by creating a new app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
- Also change the `spotify_redirect_uri` to your own redirect uri. This can be anything you want, but it has to be the same as the redirect uri you set in the Spotify Developer Dashboard.
- The `homepage_url` is used to redirect to the homepage from the php file.
you can find what i'm talking about in the `backend/api/v1/callback.php` line **22**
- Change `VITE_API_URL` in `docker-compose.yml` to the backend api url. (this is the url that the frontend uses to make requests to the backend)


### 1.4 Running the app
- Run `docker-compose up --build -d` or ``docker compose up --build -d`` in the root directory to start the app.   

### 1.5 Authentication
Go to `https://BACKEND.com/api/v1/auth.php` in the browser and login with the account you want to use. (this is account who gets the song in queue) [keep in mind that it should redirect you to the homepage (`homepage_url`)]

### 1.6 Enjoy
Go to `https://YourBeautifulFRONTEND.com` and enjoy the app. (every one can use it and add songs to the queue)   

<hr/>

## Original Authors [(Original repo)](https://github.com/Lettly/YourMusic)
- [ **@Lettly** - Marco Giuseppini ](https://github.com/Lettly)
- [**@Lockso** - Lorenzo Chiaese](https://github.com/Lockso)


 
