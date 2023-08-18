#!/bin/bash
python -m manage makemigrations
python -m manage migrate
gunicorn core.wsgi:application --bind 0.0.0.0:8001