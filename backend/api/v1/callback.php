<?php
require $_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php';

$session = new SpotifyWebAPI\Session(
    getenv("spotify_client_id"),
    getenv("spotify_client_secret"),
    getenv("spotify_redirect_uri")
);


// Request a access token using the code from Spotify
$session->requestAccessToken($_GET['code']);

$accessToken = $session->getAccessToken();
$refreshToken = $session->getRefreshToken();

file_put_contents("data/.accesstoken", serialize($accessToken));
file_put_contents("data/.refreshToken", serialize($refreshToken));

// echo "<br>" . $accessToken;
    // Send the user along and fetch some data!
header('Location: /');
die();