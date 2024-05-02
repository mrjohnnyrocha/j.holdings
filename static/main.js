// main.js
document.getElementById('user-input').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

const botResponses = {
    hello: "Hello! How can I help you today?",
    bye: "Goodbye! Have a great day!",
    help: "You can ask me any question about our services or products."
};

async function getResponse(input) {
    input = input.toLowerCase().trim();
    if (botResponses[input]) {
        return botResponses[input];
    } else {
        const response = await fetch('http://localhost:8000/api/groq-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: input
        });
        if (!response.ok) {
            throw new Error('Failed to fetch the response from the server');
        }
        const data = await response.text();
        return data; 
    }
}


async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return; // Do nothing if input is empty

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class='message user'>You: ${userInput}</div>`;

    try {
        const responseHtml = await getResponse(userInput);

        chatBox.innerHTML += responseHtml; // Append HTML directly to chat box
    } catch (error) {
        chatBox.innerHTML += `<div class='message bot'>Error: ${error.message}</div>`;
    }

    document.getElementById('user-input').value = ""; // Clear the input field
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message

    if (userInput.toLowerCase().trim() === "bye") {
        document.getElementById('user-input').disabled = true; // Disable input after bye
    }
}

function welcomeMessage() {
    const chatBox = document.getElementById('chat-box');
    const welcomeText = "Hello! I'm here to help you. Please type your question.";
    chatBox.innerHTML += `<div class='message bot'>Bot: ${welcomeText}</div>`;
}

window.onload = welcomeMessage;
