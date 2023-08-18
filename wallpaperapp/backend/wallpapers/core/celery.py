import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

#app = Celery("wallpapers", broker="amqp://guest:guest@rabbitmq:5672", backend="redis://redis:6379")
app = Celery("wallpapers")

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()
