# Use the official Python image from the Docker Hub
FROM python:3.12-slim

ENV GROQ_API_KEY=${GROQ_API_KEY}
ENV LOCAL_LLM=${LOCAL_LLM}

# Install Poetry
RUN pip install --no-cache-dir poetry
RUN poetry config virtualenvs.create false

# Copy the pyproject.toml and poetry.lock files to the working directory
COPY pyproject.toml ./

# Install the dependencies
RUN poetry install --only main
RUN poetry lock

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application port
EXPOSE 8000

# Command to run the application
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
