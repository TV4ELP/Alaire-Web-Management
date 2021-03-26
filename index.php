<?php 
 require_once('listHelper.php');



function Sorry(){
   echo file_get_contents("sorry.html");
}

function DisplayPictures($listHelper){
   $html = file_get_contents("main.html");
   $jsonHTML = str_replace("!%%%JSON%%%!", json_encode($listHelper->_payload), $html);
   echo $jsonHTML;
}

//Get The Request URL from the HTACCESS FILE
$url = $_SERVER['REQUEST_URI'];
//Remove the first slash to make it easier to work with
$cleanUrl = ltrim($url, '/');
//explode the string into it's values
$pathArray = explode('/', $cleanUrl);
//If we have both, we have a valid Link
if(array_key_exists(0, $pathArray) && array_key_exists(1, $pathArray)){
   $uuid = $pathArray[0];
   $loginKey = $pathArray[1];
   $listHelper = new listHelper($uuid, $loginKey);
   $loginCool = $listHelper->isLoginCorrect();
   if(!$loginCool){
      Sorry();
   }else{
      DisplayPictures($listHelper);
   }
}else{
   Sorry();
}

//print_r($pathArray);

?>

