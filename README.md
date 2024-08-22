# Knowledge Retrieval Engine

This application allows users to upload a document (currently PDF only) to act as a custom knowledge base. You can then ask questions related to the uploaded pdf and a LLM would answer them.

## Tools and Technologies Used

- Llama 3.1 70B versatile for answering user's queries
- HuggingFace's MiniLM-L6-v2 for embedding the text extracted from user's document
- FAISS (Facebook AI Similarity Search) as a vector database
- Groq API Inference to run Llama 3 remotely
- LangChain framework
- Streamlit to build the web app

## To-do list

- Caching embeddings to improve response time, if possible
- Better user interface
- Splitting to chunks for large docs
- Database integration