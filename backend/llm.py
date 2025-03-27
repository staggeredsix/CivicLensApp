import openai
from backend.config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

async def generate_summary(prompt: str) -> dict:
    messages = [
        {"role": "system", "content": "You are a neutral civic analyst. Summarize clearly and factually."},
        {"role": "user", "content": prompt}
    ]
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=messages,
        temperature=0.4
    )
    output = response.choices[0].message.content.strip()
    return {
        "summary": output,
        "trace": {
            "steps": [f"Used OpenAI GPT-4 Turbo to generate summary from prompt."],
            "tokens_used": response.usage.total_tokens
        }
    }
