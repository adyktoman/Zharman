<?php
  global $messages, $uri;

  $entityID = isset($uri[2])? intval($uri[2]): false;
  $db = json_decode( file_get_contents( "$storage/$uri[1].json" ) );

  if ($entityID === false) {
    http_response_code(404);
    array_push($messages, "Entity ID not found: [$entityID]");
  } else {
    $found = false;
    $data = [];

    foreach ($db->data as $index => $current) {
        if($current->id === $entityID) {
          $found = true;
        } else {
          array_push($data, $current);
        }
    }

    if ($found === false) {
      http_response_code(404);
      array_push($messages, "Entity ID not found: [$entityID]");
    } else {
      $db->data = $data;
      file_put_contents("$storage/$uri[1].json", json_encode($db, JSON_PRETTY_PRINT));
      echo json_encode($db->data);
    }
  }
