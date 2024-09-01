import google.generativeai as genai
import os
from dotenv import load_dotenv
import PIL.Image
from PyPDF2 import PdfReader

load_dotenv()
GEMINI_KEY = os.getenv('gemini_key')

genai.configure(api_key = GEMINI_KEY)

# Extracting text from pdf
reader = PdfReader("sample_doc.pdf")
file_text = ""
for page in reader.pages:
    file_text += page.extract_text()

model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content(["what does ashmit like?", file_text], stream=True)

for chunk in response: # generating a output stream so we dont have to wait for the entire result
    print(chunk.text, end="")

# print(response.text)
