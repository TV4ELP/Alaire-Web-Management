<?php

//Class toß better interface with the JSOn LISTS and do various kinds of things
class listHelper {
   private $_loginKey = null;
   private $_uuid = null;
   public $_payload = null;


   public function __construct($uuid, $loginKey){
      $this->_uuid = $uuid;
      $this->_loginKey = $loginKey;
   }

   public function isLoginCorrect(){
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, "localhost/" . $this->_uuid . "/" . $this->_loginKey); 
      curl_setopt($ch, CURLOPT_PORT, 9999);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER , TRUE); //So it doesn't spit it out directly
      $output = curl_exec($ch);
      curl_close($ch);   
      $json = json_decode($output);
      if(property_exists($json, "login")){
         $login = $json->login;
         if($login){
            $this->_payload = $json->payload;
         }
         return (bool)$login;
      }

      return false;
   }
}