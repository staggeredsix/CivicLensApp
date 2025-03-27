import feedparser
from datetime import datetime, timedelta

def get_recent_articles(months=6, limit=5):
    feeds = [
        "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml",
        "https://www.politico.com/rss/politics08.xml"
    ]
    cutoff = datetime.utcnow() - timedelta(days=30 * months)
    articles = []
    
    for feed in feeds:
        parsed = feedparser.parse(feed)
        for entry in parsed.entries:
            if hasattr(entry, 'published_parsed'):
                pub_date = datetime(*entry.published_parsed[:6])
                if pub_date > cutoff:
                    articles.append({
                        "title": entry.title,
                        "link": entry.link,
                        "summary": entry.summary,
                        "published": pub_date.isoformat()
                    })
            if len(articles) >= limit:
                break
    return articles
