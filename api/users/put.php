<?php
  global $messages, $uri;

  $inputJSON = file_get_contents('php://input');

  $userID = isset($uri[2])? intval($uri[2]): false;
  $db = json_decode( file_get_contents( $storage.'/users.json' ) );

  if ($userID === false) {
    http_response_code(404);
    array_push($messages, "User ID not found: [$userID]");
  } else {
    $found = false;

    $updatedUser = json_decode( $inputJSON );

    if ($updatedUser === null) {
      http_response_code(409);
      array_push($messages, 'Invalid data!');
    } else {
      foreach ($db->users as $index => $user) {
          if ($user->id === $userID) {
            $found = true;
            if (isset($updatedUser->name) ) {
              $db->users[$index]->name = $updatedUser->name;
            }

            if (isset($updatedUser->email) ) {
              $db->users[$index]->email = $updatedUser->email;
            }

            if (isset($updatedUser->level) ) {
              $db->users[$index]->level = $updatedUser->level;
            }

            if (isset($updatedUser->nickname) ) {
              $db->users[$index]->nickname = $updatedUser->nickname;
            }

            if (isset($updatedUser->active) ) {
              $db->users[$index]->active = $updatedUser->active;
            }

            if (isset($updatedUser->status) ) {
              $db->users[$index]->status = $updatedUser->status;
            }

            if (isset($updatedUser->picture) ) {
              $db->users[$index]->picture = $updatedUser->picture;
            }

            if (isset($updatedUser->password) && strlen($updatedUser->password) > 1) {
              $db->users[$index]->hash = base64_encode($updatedUser->password);
            }

            $db->users[$index]->created_at = $user->created_at;
            $db->users[$index]->created_by = $user->created_by;
            $db->users[$index]->modified_at = date('c');
            $db->users[$index]->modified_by = 999;
          }
      }

      if ($found === false) {
        http_response_code(404);
        array_push($messages, "User ID not found: [$userID]");
      } else {
        file_put_contents($storage.'/users.json', json_encode($db, JSON_PRETTY_PRINT));
        echo json_encode($db->users);
      }
    }
  }
