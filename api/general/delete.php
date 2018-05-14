<?php
  function main($api) {
    if (!$api->isLoggedIn() || !$api->hasPermissions('d', $api->route)) {
      $api->error('Unauthorized. Please login.', 401);
      return;
    }

    $entityID = $api->getParam(2);

    if (!$entityID) {
      return $api->error("Entity ID not found: [$entityID]", 404);
    }

    $data = [];
    $db = $api->getDB();
    $found = FALSE;

    foreach ($db->data as $index => $current) {
      if ($current->id == $entityID) {
        $found = $current;
      } else {
        array_push($data, $current);
      }
    }

    if (!$found) {
      return $api->error("Entity ID not found: [$entityID]", 404);
    }

    $db->data = $data;
    $api->update($db);
    $api->send($found);
  }
