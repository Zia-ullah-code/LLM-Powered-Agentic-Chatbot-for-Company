FROM python:3.11-slim

# avoid prompts
ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /app

# system deps for sentence-transformers & torch (minimal)
RUN apt-get update && apt-get install -y build-essential git curl && rm -rf /var/lib/apt/lists/*

# copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy app
COPY app.py .

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
