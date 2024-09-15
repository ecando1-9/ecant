<?php
include 'config.php';
session_start();

if(!isset($_SESSION['user_id'])){
    header('location:login.php');
    exit();
}

$user_id = $_SESSION['user_id'];
$query = "SELECT name, email, image FROM user_form WHERE id = '$user_id'";
$result = mysqli_query($conn, $query);
$user = mysqli_fetch_assoc($result);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="chat-container">
        <div class="profile-section">
            <div class="profile-icon">
                <a href="home.php">
                <?php
                    if($user['image'] == '') {
                        echo '<img src="images/default-avatar.png" class="profile-pic">';
                    } else {
                        echo '<img src="uploaded_img/'.$user['image'].'" class="profile-pic">';
                    }
                ?>
                </a>
            </div>
            <h4>Welcome, <?php echo htmlspecialchars($user['name']); ?></h4>
        </div>

        <div class="chat-area">
            <div class="search-bar">
                <input type="text" id="searchUser" placeholder="Search for a user">
            </div>
            <div id="searchResults"></div>
        </div>
    </div>
    <script src="assets/js/chat.js"></script>
</body>
</html>
