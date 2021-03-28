<?php 
 require_once('listHelper.php');



function Sorry(){
   echo file_get_contents("sorry.html");
}

function Login($listHelper){
   $html = file_get_contents("main.html");
   echo $html;
}

function ApiTree($listHelper, $path){
   switch ($path[2]) {
      case 'lists':
         return json_encode($listHelper->getAllLists());
         break;
   
      case 'list':
         return json_encode($listHelper->getListImages($path[3]));
         break;
      default:
         # code...
         break;
   }
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

   //Login
   $listHelper = new listHelper($uuid, $loginKey);
   $loginCool = $listHelper->isLoginCorrect();
   if(!$loginCool){
      Sorry();
      return;
   }
   //We don't have any Endpoint. Show the default interface
   if(!array_key_exists(2, $pathArray)){
         Login($listHelper);
         return;
   }else{
      echo ApiTree($listHelper, $pathArray);
   }

}else{
   Sorry();
}

//print_r($pathArray);

?>

