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

$api = new SpotifyWebAPI\SpotifyWebAPI($options, $session);

$isUriSet = isset($_GET['uri']);
if ($isUriSet === false) {
    echo json_encode([
        "message" => "Error: <uri> parameter not specified, please use ?uri=3xxx0xxx9xx9",
        "code" => 400,
    ]);
    exit();
} else {
    $playlistURI = $_GET['uri'];

}

try {
    $imageObj = $api->getPlaylistImage($playlistURI);
} catch (SpotifyWebAPI\SpotifyWebAPIException $e) {
    echo json_encode([
        "message" => "Error: " . $e->getMessage(),
        "code" => 400,
    ]);
    exit();
}

echo json_encode($imageObj);

?>