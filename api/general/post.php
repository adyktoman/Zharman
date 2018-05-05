<?php
  global $storage;

  $inputJSON = file_get_contents('php://input');
  $entity = json_decode( $inputJSON );

  if (isset($entity->name) && isset($entity->name[0])) {
    $db = json_decode( file_get_contents( "$storage/$uri[1].json" ) );

    $found = false;
    foreach ($db->data as $index => $current) {
      if ($current->name === $entity->name) {
        $found = true;
      }
    }

    if ($found === false) {
      $entity->id = $db->settings->nextID;
      $db->settings->nextID = $db->settings->nextID + 1;

      array_push($db->data, $entity);

      file_put_contents("$storage/$uri[1].json", json_encode($db, JSON_PRETTY_PRINT));
      echo json_encode($entity);
    } else {
      http_response_code(409);
      array_push($messages, 'Invalid entity name: already exists!');
    }
  } else {
    http_response_code(406);
    if (!isset($entity->name) || !(isset($entity->name[0]))) array_push($messages, 'Name is required!');
  };
