async function uploadDocument() {
    const documentInput = document.getElementById('documentInput').files[0];
    if (!documentInput) {
        alert("Please select a document to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("document", documentInput);

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        alert("Document uploaded successfully!");
    } catch (error) {
        console.error("Error uploading document:", error);
        alert("Failed to upload document.");
    }
}

async function sendQuery() {
    const userQuery = document.getElementById("userQuery").value;
    if (!userQuery) {
        alert("Please enter a query.");
        return;
    }

    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<div class="user"><strong>Query:</strong> ${userQuery}</div>`;

    try {
        const response = await fetch("/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: userQuery })
        });
        const data = await response.json();
        const htmlResponse = marked.parse(data.response) // converting markdown to html
        chatBox.innerHTML += `<div class="bot"><strong>Response:</strong><div class="response-markdown">${htmlResponse}</div></div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
    } catch (error) {
        console.error("Error sending query:", error);
        chatBox.innerHTML += `<div class="bot"><strong>Error:</strong> Failed to retrieve response.</div>`;
    }

    document.getElementById("userQuery").value = "";
}
