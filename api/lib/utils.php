<?php
  global $messages, $uri, $storage;

  class API {
    private $method, $token, $controller, $root, $response;
    public $params, $route;

    public function __construct($authHeader, $method, $uri, $root) {
      $this->method = strtolower($method);
      $this->params = explode('/', $uri);
      $this->response = [];
      $this->root = $root;
      $this->route = $this->params[1];
      $this->token = $this->getToken($authHeader);

      $this->db = "{$this->root}/../db/{$this->route}.json";
      $this->controller =
        "{$this->root}/{$this->route}/{$this->method}.php";

      if (!file_exists($this->controller)) {
        $this->controller =
          "{$this->root}/general/{$this->method}.php";
      }

      include($this->controller);
      main($this);
      $this->end();
    }

    public function getToken($authHeader) {
      if ($authHeader) {
        [$type, $token] = explode(' ', $authHeader, 2);
        if (strcasecmp($type, 'Bearer') == 0) {
          return $token;
        }
      }

      return FALSE;
    }

    public function error($message, $statusCode) {
      http_response_code($statusCode);
      $this->write($message);
    }

    public function write($message) {
      array_push($this->response, $message);
    }

    public function send($data) {
      echo json_encode($data);
    }

    public function end() {
      if(isset($this->response[0])) {
        $this->send(['messages' => $this->response]);
      }
    }

    public function getProfile() {
      return TRUE;
    }

    public function isLoggedIn() {
      if( strlen($this->token ) < 10 ) {
        return FALSE;
      }

      return TRUE;
    }

    public function hasPermissions($entity, $list) {
      return $entity !== $list;
    }

    public function getParam($index, $default = FALSE) {
      return isset($this->params[$index])?
        $this->params[$index]: $default;
    }

    public function getDB() {
      if (!file_exists($this->db)) {
        file_put_contents(
          $this->db, '{"data": [], "settings": {"nextID": 1}}');
      }

      $this->rawData = file_get_contents($this->db);
      return json_decode($this->rawData);
    }

    public function save($db, $entity) {
      $entity->id = $db->settings->nextID;
      $entity->created_at = date('c');
      $entity->created_by = 999;

      $db->settings->nextID = $db->settings->nextID + 1;

      array_push($db->data, $entity);
      $this->update($db);
    }

    public function update($data) {
      file_put_contents($this->db, json_encode($data, JSON_PRETTY_PRINT));
    }

    public function getPayload() {
      return json_decode( file_get_contents('php://input') );
    }
  }
