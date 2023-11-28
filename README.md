
# 📃About **YourMusic2.0**
A better interface for your Spotify Queue. Built with React and the Spotify API.

##  ✨ What's new 
- [x] New UI
- [X] Random Suggestions
- [X] Current song playing
- [X] Clickable song name to open spotify
- [X] Better search experience
- [X] Playback estimation
- [x] Infinite scroll not working on chorme / safari
- [X] fix chrome searchbar moving the playback card way to low 
- [X] Menu closing animation
- [ ] Add a way to add playlists to the discover page ??
- [x] Add a rate limiter for adding songs to the queue
- [ ] Add the top artists and top songs of the user to the discover / suggestions page
- [ ] Add user playlists to discover page

## 😕 Why doing it again?
So, I looked at the original project UI and i thought, 'Hmm, this needs a makeover'. So i decided it's time to pimp up the project's interface, make it more modern and more user friendly. I also added some new features that i thought would be cool to have, like, i'm not kidding, i've added more features than a Swiss Army knife on steroids. It's like the original project was using stone tools.

<br/><br/>

# 🛠️ How do i run it? - Setup
## ⚠️ 1.1 Prerequisites
Got to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and create a new app.

## ⚙️ 1.2 Configuration
`docker-compose.yml` is included for easy setup. You can also run the app locally by running `npm install` and `npm start`.

#### ✏️ What to change
- Change the `docker-compose.yml` file to include your own spotify client id and secret. You can get these by creating a new app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
- Also change the `spotify_redirect_uri` to your own redirect uri. This can be anything you want, but it has to be the same as the redirect uri you set in the Spotify Developer Dashboard.
- The `homepage_url` is used to redirect to the homepage from the php file.
you can find what i'm talking about in the `backend/api/v1/callback.php` line **22**
- Change `VITE_API_URL` in `docker-compose.yml` to the backend api url. (this is the url that the frontend uses to make requests to the backend)

## 🔓 1.3 Folder permissions
- Make sure the `backend/api/data` folder has write permissions. (this is where the access token is stored)
  - use `chmod 777 api/v1/data` 
  

## 🛫 1.4 Running the app
- Run `docker-compose up --build -d` or ``docker compose up --build -d`` in the root directory to start the app.   

## 👮 1.5 Authentication
Go to `https://BACKEND.com/api/v1/auth.php` in the browser and login with the account you want to use. (this is account who gets the song in queue) [keep in mind that it should redirect you to the homepage (`homepage_url`)]

## 🎉 1.6 Enjoy
Go to `https://YourBeautifulFRONTEND.com` and enjoy the app. (every one can use it and add songs to the queue)   

<br/>

<br/><br/>

## 🪙 Bonus: How to add personal playlists to the discover page   
Go to `frontend/src/helpers/arrayList.ts` and add your playlist uri to the array. Follows the object structure:
 ```javascript
  {
    title: "Playlist Title", // This will show up on the discover page and in the title of the page
    description: "Playlist keywords", // This will show up on the discover page (keep it short max 4/5 words)
    imageUrl: "https://imageurl.com/image.png", // Could be of any size, but keep it square (should be self explanatory what this is and where it shows up) 
    trackUri: "PL=1TZ5ySqWeHGbEKoyDcBIj", // Check under for how to use it
  },
  ```   
  - `trackUri`, this is the most important part, this is the uri of the playlist you want to add to the discover page. 
     1. You can get this by going to the playlist on spotify and clicking the three dots and then `Share` and then `Copy Spotify URL`. 
     2. You should see the full url ("https://open.spotify.com/playlist/1TZ5ySqWeHGbEKoyDcBIjY?si=60493d5fc4a142b0)
    you should get the part after `playlist/` and before `?si=60493d5fc4a142b0` (in this case `1TZ5ySqWeHGbEKoyDcBIjY`)




  - Also keep in mind that you need to add the `PL=` before the uri (in this case `PL=1TZ5ySqWeHGbEKoyDcBIjY`), because the backend uses this to understand if it's a playlist or a query word. (if it's a query word it will search for it on spotify)


<br/><br/>


## 🎷 How to add your personal playlists to the base build?
Do a pull request and add your playlist to the `frontend/src/helpers/arrayList.ts` file. (check above for how to do it)

<br/><br/>

## 🧑‍🔬 Original Authors [(Original repo)](https://github.com/Lettly/YourMusic)
- [ **@Lettly** - Marco Giuseppini ](https://github.com/Lettly)
- [**@Lockso** - Lorenzo Chiaese](https://github.com/Lockso)


 
