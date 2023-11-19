<?php
require $_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php';

session_start();

if (empty($_SESSION['accesstoken'])) {
    $session = new SpotifyWebAPI\Session(
        getenv("spotify_client_id"),
        getenv("spotify_client_secret")
    );



    $session->requestCredentialsToken();
    $accessToken = $session->getAccessToken();

    $_SESSION['accesstoken'] = $accessToken;
}

$accessToken = $_SESSION['accesstoken'];


$api = new SpotifyWebAPI\SpotifyWebAPI();

// Fetch the saved access token from somewhere. A database for example.
$api->setAccessToken($accessToken);


// foreach ($results->artists->items as $artist) {
// echo $artist->name, '<br>';
// }:)



switch (strtolower($_GET['q'])) {
    case trim(strtolower('hiphop')):
    case trim(strtolower('hip hop')):
        $results = $api->getPlaylistTracks('spotify:playlist:37i9dQZF1DWUQru3jd69v5');
        break;
    case trim(strtolower('rock')):
        $results = $api->getPlaylistTracks('spotify:playlist:37i9dQZF1DX1spT6G94GFC');
        break;
    case trim(strtolower('punk')):
        $results = $api->getPlaylistTracks('spotify:playlist:37i9dQZF1DXd6tJtr4qeot');
        break;
    case trim(strtolower('eletronic')):
        $results = $api->getPlaylistTracks('spotify:playlist:37i9dQZF1DXaXB8fQg7xif');
        break;
    case trim(strtolower('Top 50 - Italia')):
    case trim(strtolower('Top 50 Italia')):
    case trim(strtolower('Top Italia')):
        $results = $api->getPlaylistTracks('spotify:playlist:37i9dQZEVXbIQnj7RRhdSX');
        break;
    case trim(strtolower('Top 50 - globale')):
    case trim(strtolower('Top 50 Globale')):
    case trim(strtolower('Top globale')):
    case trim(strtolower('Top 50')):
        $results = $api->getPlaylistTracks('spotify:playlist:37i9dQZEVXbMDoHDwVN2tF');
        break;
    case trim(strtolower('hot hits - Italia')):
    case trim(strtolower('hot hits Italia')):
    case trim(strtolower('hot Italia')):
    case trim(strtolower('hot hits')):
        $results = $api->getPlaylistTracks('spotify:playlist:37i9dQZF1DX6wfQutivYYr');
        break;
    case trim(strtolower('Mezzanotte Chill Rap')):
    case trim(strtolower('Mezzanotte Chill')):
    case trim(strtolower('Mezzanotte Rap')):
    case trim(strtolower('Chill Rap')):
        $results = $api->getPlaylistTracks('spotify:playlist:37i9dQZF1DX37pZLd58ED5');
        break;
    case trim(strtolower('Filippo 2020')):
        $results = $api->getPlaylistTracks('spotify:playlist:1yyrCFKijjvmLbwCZepdD0');
        break;
    case trim(strtolower('Marco 2020')):
        $results = $api->getPlaylistTracks('spotify:playlist:75zFw22Cb1HskLMdp4BsXO');
        break;
    case trim(strtolower('Andro 2020')):
    case trim(strtolower('Alessandro 2020')):
    case trim(strtolower('Ale 2020')):
        $results = $api->getPlaylistTracks('spotify:playlist:4SbY6sJV0pNHKwPOZ2V3wt');
        break;
    case trim(strtolower('Andro 3 Grazie')):
        $results = $api->getPlaylistTracks('spotify:playlist:3nHAy48ehubMfiAuZI9fe5');
        break;
    default:
        $results = $api->search($_GET['q'], 'track');
        break;
}

echo json_encode($results);
