FROM python:3.12-slim
ENV APP_HOME=/app
ENV GROQ_API_KEY=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

WORKDIR $APP_HOME
COPY pyproject.toml .
RUN pip install poetry && poetry install --no-dev
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
COPY . .
EXPOSE 8000
CMD ["poetry", "run", "uvicorn", "app.main:app"]
