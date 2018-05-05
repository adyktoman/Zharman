<?php
  global $messages, $uri;

  $entityID = isset($uri[2])? $uri[2]: false;
  $db = json_decode( file_get_contents( "$storage/$uri[1].json" ) );

  if ($entityID === false) {
    echo json_encode($db->data);
  } else {
    $found = false;

    foreach ($db->data as $index => $entity) {
      if($entity->id == $entityID) {
        $found = $entity;
      }
    }

    if($found === false) {
      http_response_code(404);
      array_push($messages, "Entity ID not found: [$entityID]");
    } else {
      echo json_encode($found);
    }
  }
