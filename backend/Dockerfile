# Dockerfile
FROM public.ecr.aws/lambda/python:3.11

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt --target python/

COPY main.py .
