<?php

try{
    $db = new PDO('sqlite:db/government.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $stmt = $db->prepare(
        'SELECT * FROM applications 
        ORDER BY application_status DESC, name ASC, requested_amount DESC'
    );
    $stmt->execute();
    echo json_encode($stmt->fetchAll());
}catch(PDOException $ex){
    echo $ex->getMessage();
    exit;
}