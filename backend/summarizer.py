from backend.llm import generate_summary
from backend.sources import get_recent_articles

async def summarize_content(query: str, content_type: str = None):
    articles = get_recent_articles()
    source_texts = [a["summary"] for a in articles]
    sources = [a["link"] for a in articles]

    joined = "\n\n".join(source_texts[:3]) + "\n\nQuery: " + query
    result = await generate_summary(joined)

    return {
        "summary": result["summary"],
        "raw_facts": joined,
        "sources": sources,
        "trace": result["trace"]
    }
