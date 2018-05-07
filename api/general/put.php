<?php
  global $messages, $uri;

  $inputJSON = file_get_contents('php://input');

  $entityID = isset($uri[2])? intval($uri[2]): false;
  $db = json_decode( file_get_contents( "$storage/$uri[1].json" ) );

  if ($entityID === false) {
    http_response_code(404);
    array_push($messages, "Entity ID not found: [$entityID]");
  } else {
    $found = false;

    $updatedEntity = json_decode( $inputJSON );

    if ($updatedEntity === null) {
      http_response_code(409);
      array_push($messages, 'Invalid data!');
    } else {
      foreach ($db->data as $index => $current) {
          if ($current->id === $entityID) {
            $found = true;
            $db->data[$index] = $updatedEntity;
            $db->data[$index]->id = $entityID;
            $db->data[$index]->created_at = $current->created_at;
            $db->data[$index]->created_by = $current->created_by;
            $db->data[$index]->modified_at = date('c');
            $db->data[$index]->modified_by = 999;
          }
      }

      if ($found === false) {
        http_response_code(404);
        array_push($messages, "Entity ID not found: [$entityID]");
      } else {
        file_put_contents("$storage/$uri[1].json", json_encode($db, JSON_PRETTY_PRINT));
        echo json_encode($db->data);
      }
    }
  }
