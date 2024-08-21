import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
key = os.getenv('key')
parser = StrOutputParser()

Model = "llama-3.1-70b-versatile"
model = ChatGroq(api_key=key, model=Model, temperature=0)

llm = model | parser

def invoke_llm(user_input):
    result = llm.invoke(user_input)
    return result