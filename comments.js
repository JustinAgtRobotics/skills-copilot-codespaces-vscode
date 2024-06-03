// Create web server
const express = require('express');
const app = express();
app.use(express.json());
// Create a static web server
app.use(express.static('public'));

// Create a new comment
const comments = [];
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.json(comment);
});

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Start the web server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

// Path: public/index.html
<!DOCTYPE html>
<html>
<head>
    <title>Comments</title>
</head>
<body>
    <h1>Comments</h1>
    <form id="form">
        <input type="text" id="name" placeholder="Name" required><br>
        <textarea id="content" placeholder="Content" required></textarea><br>
        <button type="submit">Add Comment</button>
    </form>
    <ul id="comments"></ul>
    <script>
        const form = document.getElementById('form');
        const name = document.getElementById('name');
        const content = document.getElementById('content');
        const comments = document.getElementById('comments');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const response = await fetch('/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.value,
                    content: content.value
                })
            });
            const comment = await response.json();
            const li = document.createElement('li');
            li.textContent = `${comment.name}: ${comment.content}`;
            comments.appendChild(li);
            name.value = '';
            content.value = '';
        });

        async function loadComments() {
            const response = await fetch('/comments');
            const comments = await response.json();
            for (const comment of comments) {
                const li = document.createElement('li');
                li.textContent = `${comment.name}: ${comment.content}`;
                comments.appendChild(li);
            }
        }

        loadComments();
    </script>
</body>
</html>

// Run the server
// Open the browser and navigate to http://localhost:3000
// Add a comment and check the network tab in the browser's developer tools to see the