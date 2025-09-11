LLM Powered Agentic Chatbot for Hexaa AI
📌 Project Overview

This project is a full-stack AI-powered chatbot system designed to assist potential clients in a professional, customer-service style. It interactively gathers project requirements, predicts project size, provides estimated costs, and restricts responses strictly to company services using Retrieval-Augmented Generation (RAG).

The chatbot can detect unhappy users and escalate to a human meeting booking flow. It maintains conversation memory, supports source citations, and includes a React-based frontend widget with an admin panel for knowledge base re-indexing.

✨ Features

Conversational AI — Professional, context-aware chat.

RAG-powered answers — Only responds based on company-provided documents.

Project size prediction — Classifies into small, normal, large.

Cost estimation — Returns cost ranges depending on project size.

Sentiment detection — Escalates to human booking flow if user is unhappy.

Knowledge base re-indexing — Admin panel with one-click "Re-index".

Conversation memory — Stores last 20 messages in Redis.

Source citation — Provides document references where possible.

Multi-service architecture — Scalable deployment on Render or Vercel.

🛠️ Tech Stack

Frontend

React (chatbot widget + admin panel)

CSS-in-JS / inline styles

Backend

n8n — Workflow orchestration

ChromaDB — Vector database for knowledge base

Redis — Conversation memory

Embedder Service — Sentence-transformers for embeddings

Infrastructure

Docker — Multi-container local development


🏗️ System Architecture
[React Frontend]  <---->  [n8n Backend API]
                              |
                              |---(Redis) Conversation Memory
                              |---(Embedder) Create Text Embeddings
                              |---(Chroma) Retrieve Context Docs
                              |---(Sentiment Node) Detect Unhappiness
                              |---(Calendly) Escalation for Meetings

🔧 Service Breakdown
React Frontend

Floating chatbot widget

Markdown-formatted message display

Feedback buttons (👍 👎)

Admin panel with "Re-index" button

n8n Workflows

/predict — Detects intent, classifies request

/answer — Retrieves docs → LLM → formatted response with sources

/estimate — Predicts project size & cost range

/feedback — Stores user feedback

/reset — Clears conversation memory

/admin — Triggers knowledge base re-indexing

Redis

Stores chat history (conversation_id → JSON array of messages)

Chroma

Stores vector embeddings for knowledge base

Used in RAG pipeline

Embedder

Converts company documents into embeddings for Chroma

⚙️ How It Works

User opens chat → React widget loads.

User sends message → React sends request to /predict (n8n webhook).

n8n processes intent:

Negative sentiment / "request_human" → Empathetic reply + Calendly link.

General question → Retrieve docs from Chroma → Call LLM → Respond with sources.

Estimate request → Ask follow-ups → Predict size (small/normal/large) → Return cost range.

Conversation is stored in Redis (max 20 messages).

React updates UI with professional formatting.

🚀 Running Locally
1. Clone Repository
git clone https://github.com/Zia-ullah-code/LLM-Powered-Agentic-Chatbot-for-Company.git
cd chatbot_project

# This .env is part is not used for now
#2. Create .env file
#N8N_BASIC_AUTH_ACTIVE=true
#N8N_BASIC_AUTH_USER=admin
#N8N_BASIC_AUTH_PASSWORD=strongpassword
#N8N_ENCRYPTION_KEY=your_32_byte_random_key

3. Start with Docker
docker-compose up --build

4. Access Services

React (Frontend) → http://localhost:3000

n8n (Backend) → http://localhost:5678

Chroma → http://localhost:8000

Redis → localhost:6379
