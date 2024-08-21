import streamlit as st
from test2 import invoke_llm

st.set_page_config(page_title="Knowledge Retrieval")

st.header("Testing Llama 3")
user_input = st.chat_input("Enter your question:")

if user_input:
    result = invoke_llm(user_input)
    st.write(result)