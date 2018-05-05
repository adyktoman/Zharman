<?php
  global $messages, $uri;

  $charID = isset($uri[2])? $uri[2]: false;
  $db = json_decode( file_get_contents( $storage.'/chars.json' ) );

  if ($charID === false) {
    echo json_encode($db->chars);
  } else {
    $found = false;

    foreach ($db->chars as $index => $char) {
      if($char->id == $charID) {
        $found = $char;
      }
    }

    if($found === false) {
      http_response_code(404);
      array_push($messages, "Char ID not found: [$charID]");
    } else {
      echo json_encode($found);
    }
  }
