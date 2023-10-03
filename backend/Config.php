<?php

class Config{

  protected $data;
  public $userconf;
  public $defconf;


  protected $file;

  public function load($file){
    if(!(file_exists($file))){
      $myfile = fopen($file, "w") or die("<br><br>Não foi possível abrir o arquivo!<br><br>");
      fwrite($myfile, "<?php\nreturn array();\n?>");
      fclose($myfile);
      chmod($file, 0664);
    }
    $this->file=$file;
    $userconf=require $file;
    $this->data = array_replace_recursive($userconf);
    $this->userconf = $userconf;
  }

  public function get($key, $source=false){

    $segments = explode(".", $key);

    $data = ($source!==false) ? $this->{$source} : $this->data;

    foreach ($segments as $segment){
      if (isset($data[$segment])){
        $data = $data[$segment];
      }else{
        $data = "";
        break;
      }
    }
    return $data;
  }

  public function modified($key){
    return $this->get($key, "userconf");
  }
  public function defaults($key){
    return $this->get($key, "defconf");
  }

  public function save($dat){
    if (is_writable($this->file)) {
      $res=file_put_contents($this->file, "<?php\nreturn ".var_export($dat, true).";\n?>");
      if($res===false){
        return "write_error";
      }else{
        return true;
      }
    }else{
      return "perm_error";
    }
  }

}

?>
