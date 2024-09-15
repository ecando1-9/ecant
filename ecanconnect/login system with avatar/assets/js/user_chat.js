const currentUserId = <?php echo json_encode($user_id); ?>;
const chatUserId = <?php echo json_encode($chat_user_id); ?>;
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const messagesContainer = document.getElementById('messages');

// Function to send a message
function sendMessage() {
    const message = messageInput.value.trim();

    if (message.length > 0) {
        fetch('send_message.php', {
            method: 'POST',
            body: JSON.stringify({ message, user_id: chatUserId }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Immediately show the message (timestamp will be handled by loadChat)
                messagesContainer.innerHTML += `<div class="message sent">${message}<small class="timestamp">Just now</small></div>`;
                messageInput.value = ''; // Clear the input field
                messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
            } else {
                console.error('Error sending message:', data.message);
            }
        });
    }
}

// Load chat messages
function loadChat() {
    fetch(`get_chat.php?user_id=${chatUserId}`)
        .then(response => response.json())
        .then(messages => {
            let chatHtml = '';
            messages.forEach(message => {
                const messageClass = message.sender_id === currentUserId ? 'sent' : 'received';
                const timestamp = new Date(message.timestamp).toLocaleString(); // Format timestamp
                chatHtml += `<div class="message ${messageClass}">${message.message}<small class="timestamp">${timestamp}</small></div>`;
            });
            messagesContainer.innerHTML = chatHtml;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
}

// Initial chat load
loadChat();

// Poll for new messages every 5 seconds
setInterval(loadChat, 5000);

// Event listener for 'Enter' key press
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior of Enter key
        sendMessage(); // Trigger the send message function
    }
});

// Event listener for 'Send' button click
sendMessageButton.addEventListener('click', function() {
    sendMessage(); // Trigger the send message function when button is clicked
});

// Prevent message from being sent when clicking anywhere else on the screen
document.addEventListener('click', function(event) {
    if (!messageInput.contains(event.target) && !sendMessageButton.contains(event.target)) {
        messageInput.blur(); // Remove focus from the input when clicking outside
    }
});
