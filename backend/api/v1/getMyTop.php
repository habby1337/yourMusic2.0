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

$type = $_GET['type'];

$types = array("tracks", "artists");

if(!in_array($type, $types)) {
    echo json_encode([
        "message" => "Invalid type, accepted types: ". implode(", ", $types) ."",
        "code" => 400,
    ]);
    exit();
}

$limit = $_GET['limit'];

if($limit == null) {
    $limit = 10;
}

$offset = $_GET['offset'];

if($offset == null) {
    $offset = 0;
}

try {
$myTop = $api->getMyTop($type, [
    'limit' => $limit,
    'offset' => $offset,
    'time_range' => 'short_term',
]);

}
catch (SpotifyWebAPI\SpotifyWebAPIException $e) {
    echo json_encode([
        "message" => $e->getMessage(),
        "code" => $e->getCode(),
    ]);
    exit();
}



if($myTop == null) {
    echo json_encode([
        "message" => "No data found",
        "code" => 404,
    ]);
    exit();
}

echo json_encode($myTop);

?>