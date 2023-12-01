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

$id = $api->me()->id;
$display_name = $api->me()->display_name;
$images = $api->me()->images;
$external_urls = $api->me()->external_urls;
$product = $api->me()->product;

echo "<pre>";
echo json_encode([
    "id" => $id,
    "display_name" => $display_name,
    "images" => $images,
    "external_urls" => $external_urls,
    "product" => $product
]);
echo "</pre>";

?>