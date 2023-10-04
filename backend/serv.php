<?php
session_start();
require "Config.php";
$config = new Config;
$config->load("../local.config");
$correctPassword = $config->get("general.pass");

if (isset($_GET["logout"])) {
	// unset($_SESSION['svcdbauth']);
	// unset($_COOKIE['login_svcdbauth']);
	// session_write_close();
	session_destroy();
	exit();
}

if (isset($_POST["login"])) {
    if (isset($_POST["pw"])) {
        $pw = md5($_POST["pw"]);
		if ($pw == $correctPassword) {
			$token = bin2hex(random_bytes(32));
			setcookie("login_dashbauth", $token, [
				'expires' => time() + (86400 * 30),
				'path' => '/',
				'secure' => true,
				'httponly' => false,
				'samesite' => 'None',
			]);
			$_SESSION["dashbauth"] = $token;
			echo "correctCredentials";
		}
    }
    exit();
}
?>
