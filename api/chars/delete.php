<?php
  global $messages, $uri;

  $charID = isset($uri[2])? intval($uri[2]): false;
  $db = json_decode( file_get_contents( $storage.'/chars.json' ) );

  if ($charID === false) {
    http_response_code(404);
    array_push($messages, "Char ID not found: [$charID]");
  } else {
    $found = false;
    $chars = [];

    foreach ($db->chars as $index => $char) {
        if($char->id === $charID) {
          $found = true;
        } else {
          array_push($chars, $char);
        }
    }

    if ($found === false) {
      http_response_code(404);
      array_push($messages, "Char ID not found: [$charID]");
    } else {
      $db->chars = $chars;
      file_put_contents($storage.'/chars.json', json_encode($db, JSON_PRETTY_PRINT));
      echo json_encode($db->chars);
    }
  }
