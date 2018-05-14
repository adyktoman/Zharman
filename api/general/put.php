<?php
  function main($api) {
    if (!$api->isLoggedIn() || !$api->hasPermissions('u', $api->route)) {
      $api->error('Unauthorized. Please login.', 401);
      return;
    }

    $entityID = $api->getParam(2);
    $updatedEntity = $api->getPayload();

    if (!$entityID) {
      return $api->error("Entity ID not found: [$entityID]", 404);
    }

    if(!$updatedEntity) {
      return $api->error("Invalid data: [$entityID]", 409);
    }

    $db = $api->getDB();
    $found = FALSE;

    foreach ($db->data as $index => $current) {
      if ($current->id == $entityID) {
        $db->data[$index] = $updatedEntity;
        $db->data[$index]->id = $entityID;
        $db->data[$index]->created_at = $current->created_at;
        $db->data[$index]->created_by = $current->created_by;
        $db->data[$index]->modified_at = date('c');
        $db->data[$index]->modified_by = 999;

        $found = $db->data[$index];
      }
    }

    if (!$found) {
      return $api->error("Entity ID not found: [$entityID]", 404);
    }

    $api->update($db);
    $api->send($found);
  }
