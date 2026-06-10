from http.server import BaseHTTPRequestHandler
import json
import os
from groq import Groq

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


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body)

            messages = data.get('messages', [])
            model = data.get('model', os.environ.get('GROQ_MODEL', 'llama-3.3-70b-versatile'))

            if not messages:
                self._send_json({'error': 'Nenhuma mensagem fornecida'}, 400)
                return

            api_key = os.environ.get('GROQ_API_KEY')
            if not api_key:
                self._send_json({'error': 'GROQ_API_KEY não configurada'}, 500)
                return

            client = Groq(api_key=api_key)

            full_messages = [{'role': 'system', 'content': SYSTEM_PROMPT}] + messages

            completion = client.chat.completions.create(
                model=model,
                messages=full_messages,
                temperature=0.7,
                max_tokens=2048,
            )

            response_message = completion.choices[0].message.content

            self._send_json({
                'message': response_message,
                'model': model,
                'usage': {
                    'prompt_tokens': completion.usage.prompt_tokens,
                    'completion_tokens': completion.usage.completion_tokens,
                    'total_tokens': completion.usage.total_tokens,
                }
            })

        except json.JSONDecodeError:
            self._send_json({'error': 'JSON inválido'}, 400)
        except Exception as e:
            error_msg = str(e)
            if 'api_key' in error_msg.lower() or 'authentication' in error_msg.lower():
                self._send_json({'error': 'API Key inválida'}, 401)
            elif 'model' in error_msg.lower():
                self._send_json({'error': f'Modelo não encontrado: {error_msg}'}, 400)
            else:
                self._send_json({'error': f'Erro: {error_msg}'}, 500)

    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _send_json(self, data, status=200):
        self.send_response(status)
        self._send_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
