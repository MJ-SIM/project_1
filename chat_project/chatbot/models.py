# chatbot/models.py
from django.db import models

class Conversation(models.Model):
    user_message = models.CharField(max_length=512)
    response = models.TextField()

    def __str__(self):
        return f"{self.user_message}: {self.response}"