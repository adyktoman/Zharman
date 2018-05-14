<?php
  function main($api) {
    if (!$api->isLoggedIn() || $api->hasPermissions('crud', 'profile' ) ||
      !$api->getProfile()) {
      $api->error('Unauthorized. Please login.', 401);
    }

    $api->send($api->getProfile());
  }
