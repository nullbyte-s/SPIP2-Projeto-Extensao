<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['general']['pass']) && isset($data['general']['initialsetup'])) {
        $val = $data['general']['pass'];

        $edit = array('general' => array());
        $edit["general"]["pass"] = md5($val);
        $edit["general"]["initialsetup"] = $data['general']['initialsetup'];

        $parentDirectory = dirname(__DIR__);

        $fileContent = "<?php\nreturn " . var_export($edit, true) . ';';
		$fileContent .= "\n";
        file_put_contents($parentDirectory . '/local.config', $fileContent);
        file_put_contents($parentDirectory . '/local.config', '?>', FILE_APPEND);

        echo "Configuração restaurada com sucesso!";
    } else {
        echo "Erro - dados de configuração ausentes.";
    }
} else {
    echo "Erro - método não permitido.";
}
?>
