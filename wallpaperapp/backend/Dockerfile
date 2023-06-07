FROM python:3.11-bullseye AS base

WORKDIR /app

ENV DB=main
ENV USER=skorodenko
ENV PASSWORD=1234321
ENV HOST=db
ENV PORT=5432

ENV PYTHONUNBUFFERED 1

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
RUN chmod u+x ./entry.sh
CMD ["./entry.sh"]
