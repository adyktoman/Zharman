<?php
  global $messages, $uri;

  $sessionID = isset($uri[2])? $uri[2]: false;
  $db = json_decode( file_get_contents( $storage.'/sessions.json' ) );

  foreach ($db->sessions as $index => $session) {
    unset($db->sessions[$index]->hash);
  }

  if ($sessionID === false) {
    echo json_encode($db->sessions);
  } else {
    $found = false;

    foreach ($db->sessions as $index => $session) {
      if($session->id == $sessionID) {
        $found = $session;
      }
    }

    if($found === false) {
      http_response_code(404);
      array_push($messages, "Session ID not found: [$sessionID]");
    } else {
      echo json_encode($found);
    }
  }
