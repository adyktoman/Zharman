<?php
    global $messages, $uri;

    $sessionID = isset($uri[2])? intval($uri[2]): FALSE;
    $db = json_decode( file_get_contents( $storage.'/sessions.json' ) );

    if ($sessionID === FALSE) {
        http_response_code(404);
        array_push($messages, "Session ID not found: [$sessionID]");
    } else {
        $found = FALSE;
        $sessions = [];

        foreach ($db->sessions as $index => $session) {
            if($session->id === $sessionID) {
                $found = TRUE;
            } else {
                array_push($sessions, $session);
            }
        }

        if ($found === FALSE) {
            http_response_code(404);
            array_push($messages, "Session ID not found: [$sessionID]");
        } else {
            $db->sessions = $sessions;
            file_put_contents(
                $storage.'/sessions.json',
                json_encode($db, JSON_PRETTY_PRINT));
            echo json_encode($db->sessions);
        }
    }
