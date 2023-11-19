<?php
require $_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php';

$session = new SpotifyWebAPI\Session(
    getenv("spotify_client_id"),
    getenv("spotify_client_secret")
);

$accessToken = unserialize(file_get_contents("data/.accesstoken"));
$refreshToken = unserialize(file_get_contents("data/.refreshToken"));

// Use previously requested tokens fetched from somewhere. A database for example.
if ($accessToken) {
    $session->setAccessToken($accessToken);
    $session->setRefreshToken($refreshToken);
} else {
    // Or request a new access token
    $session->refreshAccessToken($refreshToken);
}

$options = [
    'auto_refresh' => true,
];



$api = new SpotifyWebAPI\SpotifyWebAPI($options, $session);

// Fetch the saved access token from somewhere. A database for example.

// pause song
var_dump($api->pause());
