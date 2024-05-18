<?php

$name = $_POST['name'];
$amount = $_POST['amount'];

try{
    $db = new PDO('sqlite:db/government.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    $stmt = $db->prepare('INSERT INTO applications(user_id, name, requested_amount) VALUES(:userId, :name, :amount)');
    $stmt->bindValue(':userId', 1); // TODO: Get user_id from URL Param
    $stmt->bindValue(':name', $name);
    $stmt->bindValue(':amount', $amount);
    $stmt->execute();
    echo '{"name":"'.$name.'", "amount":"'.$amount.'"}';
}catch(PDOException $ex){
    echo $ex->getMessage();
    exit;
}