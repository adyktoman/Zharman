<?php
  global $messages, $uri;

  $userID = isset($uri[2])? $uri[2]: false;
  $db = json_decode( file_get_contents( $storage.'/users.json' ) );

  foreach ($db->users as $index => $user) {
    unset($db->users[$index]->hash);
  }

  if ($userID === false) {
    echo json_encode($db->users);
  } else {
    $found = false;

    foreach ($db->users as $index => $user) {
      if($user->id == $userID) {
        $found = $user;
      }
    }

    if($found === false) {
      http_response_code(404);
      array_push($messages, "User ID not found: [$userID]");
    } else {
      echo json_encode($found);
    }
  }
