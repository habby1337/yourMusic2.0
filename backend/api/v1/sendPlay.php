<?php
require $_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php';

include 'cors_middleware.php';

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

$context_uri = []
if(isset($_GET['context_uri'])) {
    $context_uri = $_GET['context_uri'];
}
// Fetch the saved access token from somewhere. A database for example.

// hot hits italia playlist
// var_dump($api->play(false, ['context_uri' => 'spotify:playlist:37i9dQZEVXbIQnj7RRhdSX',]));
var_dump($api->play(false, $context_uri ));
