# DevMentor AI 🧑‍💻

Assistente de programação com IA, construído com React + Flask + Groq.

## Estrutura do Projeto

```
/
├── backend/          # API Flask (Python)
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
└── frontend/         # Interface React
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── utils/
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Configuração da API Key

1. Acesse [https://console.groq.com/keys](https://console.groq.com/keys)
2. Crie uma conta gratuita e gere uma API Key
3. No diretório `backend/`, copie o `.env.example`:

```bash
cd backend
cp .env.example .env
```

4. Edite o `.env` e cole sua chave:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx
GROQ_MODEL=llama-3.3-70b-versatile
PORT=5000
DEBUG=true
```

---

## 🐍 Backend (Python + Flask)

### Pré-requisitos
- Python 3.8+
- pip

### Instalação

```bash
cd backend
python -m venv venv

# Linux/macOS:
source venv/bin/activate

# Windows:
venv\Scripts\activate

pip install -r requirements.txt
```

### Rodar

```bash
python app.py
```

O backend estará disponível em: `http://localhost:5000`

### Endpoints

| Método | Rota          | Descrição               |
|--------|---------------|-------------------------|
| GET    | /api/health   | Status do servidor      |
| POST   | /api/chat     | Enviar mensagem         |
| GET    | /api/models   | Listar modelos          |

---

## ⚛️ Frontend (React + Vite)

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
cd frontend
npm install
```

### Rodar

```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:3000`

O Vite já está configurado para redirecionar `/api/*` para o backend em `localhost:5000`, então não precisa configurar CORS manualmente.

---

## 🚀 Rodando Tudo

Abra dois terminais:

**Terminal 1 — Backend:**
```bash
cd backend
source venv/bin/activate  # ou venv\Scripts\activate no Windows
python app.py
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🤖 Modelos Disponíveis

| Modelo                    | Características               |
|---------------------------|-------------------------------|
| llama-3.3-70b-versatile   | Mais completo (padrão)        |
| llama-3.1-8b-instant      | Mais rápido, respostas curtas |
| llama3-70b-8192           | Contexto longo                |
| mixtral-8x7b-32768        | Excelente para código         |
| gemma2-9b-it              | Leve e eficiente              |

Você pode trocar o modelo na sidebar da interface.

---

## 🛠️ Tecnologias

**Backend:**
- Python 3 + Flask
- Groq SDK
- Flask-CORS
- python-dotenv

**Frontend:**
- React 18
- Vite
- TailwindCSS
- react-markdown
- react-syntax-highlighter
- Lucide React (ícones)
- Axios
