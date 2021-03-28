<?php

//Class to better interface with the JSOn LISTS and do various kinds of things
class listHelper {
   private $_loginKey = null;
   private $_uuid = null;
   public $_payload = null;


   public function __construct($uuid, $loginKey){
      $this->_uuid = $uuid;
      $this->_loginKey = $loginKey;
   }

   public function isLoginCorrect(){
      $ch = $this->CurlInit();
      $output = curl_exec($ch);
      curl_close($ch);   
      $json = json_decode($output);
      if(property_exists($json, "login")){
         $login = $json->login;
         return (bool)$login;
      }

      return false;
   }

   public function getAllLists(){
      $ch = $this->CurlInit("lists");
      $output = curl_exec($ch);
      curl_close($ch);   
      $json = json_decode($output);
      if(property_exists($json, "payload")){
         return $json->payload;
      }

      return false;
   }


   private function CurlInit($endPoint = null, $parameter = null){
      $ch = curl_init();
      $url = "localhost/" . $this->_uuid . "/" . $this->_loginKey;
      if($endPoint){
         $url .= "/" . $endPoint;
      }

      if($parameter){
         $url .= "/" . $parameter;
      }
      
      curl_setopt($ch, CURLOPT_URL, $url); 
      curl_setopt($ch, CURLOPT_PORT, 9999);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER , TRUE); //So it doesn't spit it out directly

      return $ch;
   }

   public function getListImages($listName){
      $ch = $this->CurlInit("list", $listName);
      $output = curl_exec($ch);
      curl_close($ch);   
      $json = json_decode($output);
      if(property_exists($json, "payload")){
         return $json->payload;
      }

      return false;
   }
}