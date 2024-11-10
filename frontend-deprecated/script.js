// Get the file input and spinner elements
const documentInput = document.getElementById("documentInput");
const spinner = document.getElementById("loading-spinner");
const uploadStatus = document.getElementById("upload-status");

// Event listener to automatically upload the file after selection
documentInput.addEventListener("change", async () => {
    if (documentInput.files.length > 0) {
        const file = documentInput.files[0]; // This is the file selected by the user

        // Show spinner and status message
        spinner.style.display = "inline-block";
        uploadStatus.style.display = "block";
        uploadStatus.textContent = "Uploading...";

        try {
            // Create FormData and append the selected file
            const formData = new FormData();
            formData.append("document", file); // Append the file to FormData

            // Send the file to the backend
            const response = await fetch("/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            
            if (response.ok) {
                uploadStatus.textContent = result.message || "Upload successful!";
            } else {
                uploadStatus.textContent = result.message || "Uploading...";
            }
        } catch (error) {
            uploadStatus.textContent = "An error occurred. Please try again.";
        } finally {
            // Hide spinner and status after a short delay
            setTimeout(() => {
                spinner.style.display = "none";
                uploadStatus.style.display = "none";
            }, 4000); // Hide after a 2-second delay
        }
    }
});


// async function uploadDocument() {
//     const documentInput = document.getElementById('documentInput').files[0];
//     if (!documentInput) {
//         alert("Please select a document to upload.");
//         return;
//     }

//     const formData = new FormData();
//     formData.append("document", documentInput);

//     try {
//         const response = await fetch("/upload", {
//             method: "POST",
//             body: formData
//         });
//         const data = await response.json();
//         alert("Document uploaded successfully!");
//     } catch (error) {
//         console.error("Error uploading document:", error);
//         alert("Failed to upload document.");
//     }
// }

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
