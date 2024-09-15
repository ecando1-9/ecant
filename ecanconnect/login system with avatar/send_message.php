<?php
include 'config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit();
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['message']) || !isset($data['user_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
    exit();
}

$message = mysqli_real_escape_string($conn, $data['message']);
$recipient_id = intval($data['user_id']);

$query = "INSERT INTO chat_messages (user1_id, user2_id, message, sender_id, timestamp) VALUES ('$user_id', '$recipient_id', '$message', '$user_id', NOW())";
$result = mysqli_query($conn, $query);

if ($result) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error']);
}
?>
