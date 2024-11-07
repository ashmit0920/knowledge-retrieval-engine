from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.responses import FileResponse, JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
from gemini import generate_response, genai_upload

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
    try:
        document_path = os.path.join(UPLOAD_DIR, document.filename)
        with open(document_path, "wb") as f:
            f.write(await document.read())
        
        global file
        file = genai_upload(document_path)

        return {"message": "Document uploaded successfully", "filename": document.filename}
    
    except Exception as e:
        return JSONResponse(content={"message": f"Error: {str(e)}"}, status_code=500)

@app.post("/query")
async def query_document(request: QueryRequest):
    """Handle queries."""
    user_query = request.query
    # Calling the LLM function
    response_text = generate_response(user_query, file)
    return JSONResponse(content={"response": response_text})