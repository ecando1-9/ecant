document.getElementById('searchUser').addEventListener('input', function() {
    const query = this.value.trim();

    if (query.length > 0) {
        fetch(`search.php?query=${query}`)
            .then(response => response.json())
            .then(data => {
                let usersHtml = '';
                data.forEach(user => {
                    usersHtml += `<div class="user" data-user-id="${user.id}">${user.name}</div>`;
                });
                document.getElementById('searchResults').innerHTML = usersHtml;

                document.querySelectorAll('.user').forEach(userDiv => {
                    userDiv.addEventListener('click', function() {
                        const userId = this.getAttribute('data-user-id');
                        window.location.href = `user_chat.php?user_id=${userId}`;
                    });
                });
            });
    } else {
        document.getElementById('searchResults').innerHTML = '';
    }
});
