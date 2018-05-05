<?php
  global $messages, $uri;

  $userID = isset($uri[2])? intval($uri[2]): false;
  $db = json_decode( file_get_contents( $storage.'/users.json' ) );

  if ($userID === false) {
    http_response_code(404);
    array_push($messages, "User ID not found: [$userID]");
  } else {
    $found = false;
    $users = [];

    foreach ($db->users as $index => $user) {
        if($user->id === $userID) {
          $found = true;
        } else {
          array_push($users, $user);
        }
    }

    if ($found === false) {
      http_response_code(404);
      array_push($messages, "User ID not found: [$userID]");
    } else {
      $db->users = $users;
      file_put_contents($storage.'/users.json', json_encode($db, JSON_PRETTY_PRINT));
      echo json_encode($db->users);
    }
  }
