import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from PyPDF2 import PdfReader

load_dotenv()
key = os.getenv('key')
parser = StrOutputParser()

Model = "llama-3.1-70b-versatile"
model = ChatGroq(api_key=key, model=Model, temperature=0)

llm = model | parser

# def invoke_llm(user_input):
#     result = llm.invoke(user_input)
#     return result

def extract_text(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    
    return text

def embed_text(user_file):
    document_text = extract_text(user_file)

    # Embedding the extracted text and storing it in FAISS
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    texts = [document_text]  # If the document is large, consider splitting it into chunks
    faiss_index = FAISS.from_texts(texts, embedding_model)

    # Creating RetrievalQA Chain
    global qa_chain
    
    qa_chain = RetrievalQA.from_chain_type(
        llm = llm,
        chain_type = "stuff",  # Simple retrieval and generation strategy
        retriever = faiss_index.as_retriever()
    )

# Querying the knowledge base
def ask_question(query):
    answer = qa_chain.invoke(query)
    return answer['result']

# user_question = "What is Ashmit good at?"
# response = ask_question(user_question)
# print(response)