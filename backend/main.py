from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.models import SummaryRequest, SummaryResponse
from backend.summarizer import summarize_content

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/summarize", response_model=SummaryResponse)
async def summarize(req: SummaryRequest):
    try:
        result = await summarize_content(req.query, req.type)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
