from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.responses import FileResponse, JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os

app = FastAPI()

# Set up directories
UPLOAD_DIR = "uploaded_documents"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount the frontend directory for serving static files
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

# Model for receiving query
class QueryRequest(BaseModel):
    query: str

@app.get("/")
async def get_homepage():
    """Serve the main HTML page."""
    return FileResponse("frontend/index.html")

@app.post("/upload")
async def upload_document(document: UploadFile = File(...)):
    """Handle document upload."""
    document_path = os.path.join(UPLOAD_DIR, document.filename)
    with open(document_path, "wb") as f:
        f.write(await document.read())
    return {"message": "Document uploaded successfully", "filename": document.filename}

@app.post("/query")
async def query_document(request: QueryRequest):
    """Handle queries."""
    user_query = request.query
    # Call the LLM function here
    response_text = your_llm_function(user_query)
    return JSONResponse(content={"response": response_text})

def your_llm_function(query):
    # Replace with the actual LLM logic
    return "This is a placeholder response to the query: " + query
