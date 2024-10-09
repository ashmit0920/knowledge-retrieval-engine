import google.generativeai as genai
import os
from dotenv import load_dotenv
import PIL.Image
from PyPDF2 import PdfReader

load_dotenv()
GEMINI_KEY = os.getenv('gemini_key')

genai.configure(api_key = GEMINI_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# Extracting text from pdf
def extract_text(file):
    reader = PdfReader(file)
    file_text = ""
    for page in reader.pages:
        file_text += page.extract_text()
    
    return file_text

def answer_query(user_input, file_text):
    response = model.generate_content([f"Answer the following query based on the provided text, remember to STRICTLY NOT ANSWER any query that is unrelated to the provided text. The query is - {user_input}", file_text])
    return response.text

# for chunk in response: # generating a output stream so we dont have to wait for the entire result
    # print(chunk.text, end="")