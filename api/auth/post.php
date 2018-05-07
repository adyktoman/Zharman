<?php
  global $storage;

  $inputJSON = file_get_contents('php://input');
  $auth = json_decode( $inputJSON );

  if (isset($auth->email) && isset($auth->email[4]) &&
    isset($auth->password) && isset($auth->password[5])) {

    $db = json_decode( file_get_contents( $storage.'/users.json' ) );

    $found = false;
    $hash = base64_encode($auth->password);

    foreach ($db->sessions as $index => $user) {
      if ( $user->email == $auth->email && $user->hash == $hash ) {
        $found = $user;
      }
    }

    if ($found === false) {
      http_response_code(401);
      array_push($messages, 'Access denied.');
    } else {
      $permissions = false;
      $roles = json_decode( file_get_contents( $storage.'/roles.json' ) );

      foreach ($roles->roles as $index => $role) {
        if ($role->id === $user->level ) {
          $permissions = $role;
        }
      }

      if ($permissions === false) {
        http_response_code(403);
        array_push($messages, 'Forbidden access, incorrect permissions.');
      } else {
        http_response_code(200);

        // CREATE JWT TOKEN!!!
        echo json_encode($permissions);
      }
    }
  } else {
    http_response_code(406);
    if (!isset($auth->email) || !(isset($auth->email[0]))) array_push($messages, 'Email is required!');
    if (!isset($auth->password) || !(isset($auth->password[0]))) array_push($messages, 'Password is required!');
  };
