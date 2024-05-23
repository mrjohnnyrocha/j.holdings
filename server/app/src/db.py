from gpt4all import Embed4All
import os
from pydantic import BaseModel
from PyPDF2 import PdfReader
import fastapi
import chromadb
from chromadb.config import Settings

client = chromadb.PersistentClient(path="chromadb-client/")
collection = client.get_or_create_collection("joaorocha")

app = fastapi.FastAPI()

class Document(BaseModel):
    id: str
    text: str

@app.get("/")
def upload():
    def load_pdfs(pdf_dir):
        documents = []
        for file_name in os.listdir(pdf_dir):
            if file_name.endswith('.pdf'):
                with open(os.path.join(pdf_dir, file_name), 'rb') as f:
                    pdf = PdfReader(f)
                    text = ""
                    for page_num in range(len(pdf.pages)):
                        text += pdf.pages[page_num].extract_text()
                    doc = Document(id=file_name, text=text)
                    documents.append(doc)
        return documents

    documents = load_pdfs("/Users/joaorocha/Documents/j/j.holdings/client/static/public/")
   
    # Embed and index documents
    embedder = Embed4All()

    for doc in documents:
        embeddings = embedder.embed(doc.text)
        collection.add(ids=doc.id, embeddings=embeddings)

    safety_check = collection.query(
        query_texts=["Who is Joao?"],
        n_results=2
    )

    print(safety_check)

    return collection

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
