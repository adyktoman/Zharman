<?php
  function main($api) {
    if (!$api->isLoggedIn() || !$api->hasPermissions('r', $api->route)) {
      $api->error('Unauthorized. Please login.', 401);
      return;
    }

    $entityID = $api->getParam(2);

    if (!$entityID) {
      return $api->send( $api->getDB()->data );
    }

    $found = FALSE;

    foreach ($api->getDB()->data as $index => $entity) {
      if ($entity->id == $entityID) {
        $found = $entity;
      }
    }

    if (!$found) {
      return $api->error("Entity ID not found: [$entityID]", 404);
    }

    $api->send( $found );
  }
