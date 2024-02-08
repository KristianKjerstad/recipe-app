FROM python:3.9-slim as base
WORKDIR /app
EXPOSE 5000

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

RUN pip install --upgrade pip

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt


WORKDIR /app/src
COPY src .
USER 1000
CMD ["python", "main.py"]
