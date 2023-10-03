<?php
session_start();

$auth = isset($_COOKIE["login_dashbauth"]) || isset($_SESSION["dashbauth"]);

$output = array('auth' => $auth ? 'true' : 'false');
echo json_encode($output);
exit();
?>