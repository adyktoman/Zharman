<?php
  global $messages, $uri;

  $inputJSON = file_get_contents('php://input');

  $charID = isset($uri[2])? intval($uri[2]): false;
  $db = json_decode( file_get_contents( $storage.'/chars.json' ) );

  if ($charID === false) {
    http_response_code(404);
    array_push($messages, "Char ID not found: [$charID]");
  } else {
    $found = false;

    $updatedChar = json_decode( $inputJSON );

    if ($updatedChar === null) {
      http_response_code(409);
      array_push($messages, 'Invalid data!');
    } else {
      foreach ($db->chars as $index => $char) {
          if ($char->id === $charID) {
            $found = true;
            $db->chars[$index] = $updatedChar;
          }
      }

      if ($found === false) {
        http_response_code(404);
        array_push($messages, "Char ID not found: [$charID]");
      } else {
        file_put_contents($storage.'/chars.json', json_encode($db, JSON_PRETTY_PRINT));
        echo json_encode($db->chars);
      }
    }
  }
