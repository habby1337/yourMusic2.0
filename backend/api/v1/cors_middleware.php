<?php
header("Access-Control-Allow-Origin: ". getenv("cors_url"));
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
?>