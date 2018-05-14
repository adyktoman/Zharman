<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin,Content-Type,Limit,Sort,Offset');
  header('Content-Type: application/json; charset=UTF-8');

  date_default_timezone_set("UTC");
  include('lib/utils.php');

  $token = $_SERVER['HTTP_AUTHORIZATION'];
  $method = $_SERVER['REQUEST_METHOD'];
  $uri = $_SERVER['REQUEST_URI'];
  $api = new API( $token, $method, $uri, getcwd() );
