from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import numpy as np
import os

# Use sentence-transformers for small/fast embeddings
from sentence_transformers import SentenceTransformer

MODEL_NAME = os.environ.get("EMBED_MODEL", "all-MiniLM-L6-v2")

app = FastAPI(title="Embedding Service")

class EmbedRequest(BaseModel):
    text: str

class EmbedResponse(BaseModel):
    embedding: List[float]
    model: str

# Load model once on startup
@app.on_event("startup")
def load_model():
    global model
    model = SentenceTransformer(MODEL_NAME)
    # warm up (optional) - run a tiny embed to load weights into memory
    _ = model.encode("warmup", convert_to_numpy=True)

@app.post("/embed", response_model=EmbedResponse)
def embed(req: EmbedRequest):
    try:
        emb = model.encode(req.text, convert_to_numpy=True)
        # convert numpy floats to plain python floats
        return EmbedResponse(embedding=emb.tolist(), model=MODEL_NAME)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"ok": True, "model": MODEL_NAME}
