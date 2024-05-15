#./server/app/Dockerfile
FROM python:3.9-slim

RUN apt-get update && apt-get install -y --no-install-recommends build-essential

WORKDIR /app

COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python3", "src/main.py"]
