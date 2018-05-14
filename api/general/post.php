<?php
  function main($api) {
    if (!$api->isLoggedIn() || !$api->hasPermissions('w', $api->route)) {
      $api->error('Unauthorized. Please login.', 401);
      return;
    }

    $entity = $api->getPayload();

    if (!isset($entity->name) || !(isset($entity->name[0]))) {
      $api->error('Name is required', 406);
      return;
    }

    $db = $api->getDB();
    $found = FALSE;

    foreach ($db->data as $index => $current) {
      if ($current->name === $entity->name) {
        $found = TRUE;
      }
    }

    if ($found) {
      return $api->error('Invalid entity name: already exists!', 409);
    }

    $api->save($db, $entity);
    $api->send($entity);
  }
