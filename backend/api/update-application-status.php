<?php

$applicationId = $_GET['application_id'];
$newStatus = $_GET['new_status'];

try{
    $db = new PDO('sqlite:../db/government.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    $stmt = $db->prepare(
        'UPDATE applications
        SET application_status=:newStatus
        WHERE application_id=:applicationId
        AND application_status == "Waiting Decision"'
        );
    $stmt->bindValue(':applicationId', $applicationId);
    $stmt->bindValue(':newStatus', $newStatus);
    $stmt->execute();

    echo '{"application_id":"'.$applicationId.'", "new_status":"'.$newStatus.'"}';
}catch(PDOException $ex){
    echo $ex->getMessage();
    exit;
}