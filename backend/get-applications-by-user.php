<?php

// Get user_id from URL parameters.
$userId = $_GET['user_id'];

try{
    $db = new PDO('sqlite:db/government.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $stmt = $db->prepare(
        'SELECT * FROM applications
        WHERE user_id=:userId
        ORDER BY requested_amount DESC'
        );
    $stmt->bindValue(':userId', $userId);
    $stmt->execute();
    echo json_encode($stmt->fetchAll());
}catch(PDOException $ex){
    echo $ex->getMessage();
    exit;
}