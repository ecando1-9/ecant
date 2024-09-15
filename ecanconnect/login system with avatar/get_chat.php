<?php
include 'config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header('location:login.php');
    exit();
}

$user_id = $_SESSION['user_id'];
$chat_user_id = $_GET['user_id'];

// Fetch messages between the users
$query = "SELECT * FROM chat_messages WHERE (user1_id = '$user_id' AND user2_id = '$chat_user_id') OR (user1_id = '$chat_user_id' AND user2_id = '$user_id') ORDER BY timestamp ASC";
$result = mysqli_query($conn, $query);

$messages = [];
while ($row = mysqli_fetch_assoc($result)) {
    $messages[] = $row;
}

echo json_encode($messages);
?>
