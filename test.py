from langchain_huggingface import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain_community.llms import OpenAI
from langchain.chains import RetrievalQA

embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

documents = [
    "Ashmit is a good programmer.",
    "Ashmit likes music and tech.",
    "Ashmit likes supercars a lot."
]

faiss_index = FAISS.from_texts(documents, embedding_model)

llm = OpenAI(model_name="gpt-3.5-turbo")

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",  # "stuff" is a simple retrieval type, you could use "map_reduce" for more complex queries
    retriever=faiss_index.as_retriever()
)

query = "What does Ashmit like?"
answer = qa_chain.run(query)
print(answer)
