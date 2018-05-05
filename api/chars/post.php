<?php
  global $storage;

  $inputJSON = file_get_contents('php://input');
  $char = json_decode( $inputJSON );

  if (isset($char->name) && isset($char->name[0]) &&
    isset($char->race) && isset($char->stats)) {

    $db = json_decode( file_get_contents( $storage.'/chars.json' ) );

    $found = false;
    foreach ($db->chars as $index => $existentChar) {
      if ($existentChar->name == $char->name) {
        $found = true;
      }
    }

    if ($found === false) {
      $char->id = $db->settings->nextID;
      $db->settings->nextID = $db->settings->nextID + 1;

      array_push($db->chars, $char);

      file_put_contents($storage.'/chars.json', json_encode($db, JSON_PRETTY_PRINT));
      echo json_encode($char);
    } else {
      http_response_code(409);
      array_push($messages, 'Invalid char name: already exists!');
    }
  } else {
    http_response_code(406);
    if (!isset($char->name) || !(isset($char->name[0]))) array_push($messages, 'Name is required!');
    if (!isset($char->race)) array_push($messages, 'Race is required!');
    if (!isset($char->stats)) array_push($messages, 'Stats are required!');
  };
