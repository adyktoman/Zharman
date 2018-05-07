<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin, Content-Type, Limit, Sort, Offset, Desc, Asc, Filter');
  header('Content-Type: application/json; charset=UTF-8');

  date_default_timezone_set("UTC");

  global $messages, $uri, $storage;

  $uri = explode('/', $_SERVER['REQUEST_URI']);
  $method = strtolower($_SERVER['REQUEST_METHOD']);
  $controller = "./api/$uri[1]/$method.php";
  $generalController= "./api/general/$method.php";

  $messages = [];
  $storage = getcwd().'/db';
  sleep(2);

  // Check if this user has a valid JWT

  // C -   1 - create own records
  // R -   2 - read single or many owned records
  // U -   4 - update single own record
  // D -   8 - delete single own record
  // T -  16 - truncate own data
  // I -  32 - import own data
  // M -  64 - modify any data
  // E - 128 - export own data

  // TODO: Implement JWT authorization, add logging history to show users activity

  if(file_exists($controller)) {
    include($controller);
  } elseif(strlen($entityDB) > 3 && file_exists($generalController)) {
    $entityDB = "$storage/$uri[1].json";

    if(!file_exists($entityDB)) {
      file_put_contents($entityDB, '{"data": [], "settings": {"nextID": 1}}');
    }

    include($generalController);
  } else {
    http_response_code(404);
    array_push($messages, "Controller file not found: [$controller]");
  }

  if(isset($messages[0])) {
    echo json_encode(['messages' => $messages]);
  }
