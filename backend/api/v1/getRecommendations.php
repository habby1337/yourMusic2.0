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

$currentTrackSeed = array($api->getMyCurrentTrack()->item->id);

$limit = 20;

if(isset($_GET['limit']) && $_GET['limit'] > 0) {
    $limit = intval($_GET["limit"]);
}

try {
$recommendations = $api->getRecommendations([
    'seed_tracks' => $currentTrackSeed,
    'limit'=> $limit,
    'market' => 'IT',
]);
} catch (SpotifyWebAPI\SpotifyWebAPIException $e) {
    echo json_encode([
        "message" => "Error: " . $e->getMessage(),
        "code" => 400,
    ]);
    exit();
}

if($recommendations->tracks == null) {
    echo json_encode([
        "message" => "No recommendations found",
        "code" => 400,
    ]);
    exit();
}


echo json_encode($recommendations);


?>