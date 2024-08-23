from langchain.chains import RetrievalQA
from langchain_community.retrievers import TFIDFRetriever
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import LLMChain
from PyPDF2 import PdfReader

load_dotenv()
key = os.getenv('key')
parser = StrOutputParser()

Model = "llama-3.1-70b-versatile"
model = ChatGroq(api_key=key, model=Model, temperature=0)

llm = model | parser

prompt_template = PromptTemplate(
    template="Based on the following context:\n{context}\n\nAnswer the question: {question}",
    input_variables=["context", "question"]
)

# separate LLMchain as retrievalQA cant handle prompt directly
# llm_chain = LLMChain(llm=llm, prompt=prompt_template)

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
    texts = [document_text]
    faiss_index = FAISS.from_texts(texts, embedding_model)

    global qa_chain
    
    qa_chain = RetrievalQA.from_chain_type(
        llm = llm,
        chain_type = "stuff",
        retriever = faiss_index.as_retriever(),
        return_source_documents = False,
        chain_type_kwargs = {"prompt": prompt_template}
    )

def ask_question(query):
    answer = qa_chain.invoke(query)
    return answer['result']

embed_text("sample_doc.pdf")

user_question = "What does ashmit like?"
response = ask_question(user_question)
print(response)
