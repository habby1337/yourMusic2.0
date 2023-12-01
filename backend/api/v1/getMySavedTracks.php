<?php
require $_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php';
include 'cors_middleware.php';

$session = new SpotifyWebAPI\Session(
    getenv("spotify_client_id"),
    getenv("spotify_client_secret")
);

$accessToken = unserialize(file_get_contents("data/.accesstoken"));
$refreshToken = unserialize(file_get_contents("data/.refreshToken"));

if($accessToken) {
    $session->setAccessToken($accessToken);
    $session->setRefreshToken($refreshToken);
} else {
    $session->refreshAccessToken($refreshToken);
}

$options = [
    'auto_refresh' => true,
];



$limit = $_GET['limit'];
$offset = $_GET['offset'];


if($limit == null) {
    $limit = 10;
}

if($offset == null) {
    $offset = 0;
}

$api = new SpotifyWebAPI\SpotifyWebAPI($options, $session);

$savedTracks = $api->getMySavedTracks([
    'limit' => $limit,
    'offset' => $offset,
]);

echo json_encode($savedTracks);


?>