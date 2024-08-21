import faiss
from transformers import AutoTokenizer, AutoModel
from langchain.chains import create_retrieval_chain

index = faiss.IndexFlatL2(768) 
tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
model = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')

def process_document(text):
    chunks = text.split('\n\n')
    embeddings = []
    for chunk in chunks:
        inputs = tokenizer(chunk, return_tensors='pt')
        embeddings.append(model(**inputs).pooler_output.detach().numpy())
    return chunks, embeddings

def add_document_to_index(text):
    chunks, embeddings = process_document(text)
    for embedding in embeddings:
        index.add(embedding)
    return chunks

def answer_query(query):
    query_embedding = model(**tokenizer(query, return_tensors='pt')).pooler_output.detach().numpy()
    D, I = index.search(query_embedding, k=5) 
    relevant_chunks = [chunks[i] for i in I[0]]

    answer = create_retrieval_chain(input_documents=relevant_chunks, question=query)
    return answer

uploaded_text = "Ashmit is good programmer. He likes music and cars a lot."
chunks = add_document_to_index(uploaded_text)
user_query = "What does the document say about Ashmit?"
response = answer_query(user_query)
print(response)
