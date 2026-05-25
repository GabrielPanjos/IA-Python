from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

SYSTEM_PROMPT = """Você é uma IA especializada em auxiliar estudantes de programação.
Seu objetivo é ensinar de forma clara, prática e didática, ajudando o usuário a realmente entender os conceitos ao invés de apenas copiar respostas prontas.

- Explique conceitos de forma simples e progressiva.
- Seja amigável e objetiva.
- Incentive raciocínio lógico.
- Explique códigos linha por linha quando necessário.
- Ensine boas práticas.
- Ajude a debugar erros.
- Mostre exemplos simples e práticos.
- Evite respostas excessivamente complexas.
- Incentive aprendizado ativo.

Sempre:
1. Explique o conceito;
2. Mostre exemplo;
3. Sugira melhoria;
4. Proponha um desafio simples."""


def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY não encontrada no .env")
    return Groq(api_key=api_key)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "Backend rodando!"})


@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Corpo da requisição inválido"}), 400

        messages = data.get("messages", [])
        model = data.get("model", os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile"))

        if not messages:
            return jsonify({"error": "Nenhuma mensagem fornecida"}), 400

        client = get_groq_client()

        full_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages

        completion = client.chat.completions.create(
            model=model,
            messages=full_messages,
            temperature=0.7,
            max_tokens=2048,
        )

        response_message = completion.choices[0].message.content

        return jsonify({
            "message": response_message,
            "model": model,
            "usage": {
                "prompt_tokens": completion.usage.prompt_tokens,
                "completion_tokens": completion.usage.completion_tokens,
                "total_tokens": completion.usage.total_tokens,
            }
        })

    except ValueError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        error_msg = str(e)
        if "api_key" in error_msg.lower() or "authentication" in error_msg.lower():
            return jsonify({"error": "API Key inválida ou não autorizada"}), 401
        if "model" in error_msg.lower():
            return jsonify({"error": f"Modelo não encontrado: {error_msg}"}), 400
        return jsonify({"error": f"Erro ao processar mensagem: {error_msg}"}), 500


@app.route("/api/models", methods=["GET"])
def get_models():
    models = [
        {"id": "llama-3.3-70b-versatile", "name": "Llama 3.3 70B Versatile"},
        {"id": "llama-3.1-8b-instant", "name": "Llama 3.1 8B Instant"},
        {"id": "llama3-70b-8192", "name": "Llama 3 70B"},
        {"id": "llama3-8b-8192", "name": "Llama 3 8B"},
        {"id": "mixtral-8x7b-32768", "name": "Mixtral 8x7B"},
        {"id": "gemma2-9b-it", "name": "Gemma 2 9B"},
    ]
    return jsonify({"models": models})


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("DEBUG", "true").lower() == "true"
    print(f"🚀 Backend rodando em http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=debug)
