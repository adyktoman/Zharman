<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin, Content-Type, Limit, Sort, Offset, Desc, Asc, Filter');
  header('Content-Type: application/json; charset=UTF-8');

  global $messages, $uri, $storage;

  $uri = explode('/', $_SERVER['REQUEST_URI']);
  $method = strtolower($_SERVER['REQUEST_METHOD']);
  $controller = "./api/$uri[1]/$method.php";
  $messages = [];
  $storage = getcwd().'/db';

  if(file_exists($controller)) {
    include($controller);
  } else {
    http_response_code(404);
    array_push($messages, "Controller file not found: [$controller]");
  }

  if(isset($messages[0])) {
    echo json_encode(['messages' => $messages]);
  }
