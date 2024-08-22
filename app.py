import streamlit as st
from test2 import embed_text, ask_question

st.set_page_config(page_title="Knowledge Retrieval")

st.header(":blue[Knowledge Retrieval Engine]")
st.markdown("##### Welcome! Upload a PDF to make it act as a knowledge base and ask any questions from it!")

user_file = st.file_uploader("Upload your document (PDF only)", type="pdf")

if user_file:
    embed_text(user_file)
    user_input = st.chat_input("Enter your question:")
    
    if user_input:
        result = ask_question(user_input)
        st.write(result)