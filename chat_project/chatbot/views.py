# chatbot/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.views import View
from dotenv import load_dotenv
import openai as oa
import os
from .serializers import ConversationSerializer

load_dotenv()
oa.api_key = os.getenv('OPENAI_API_KEY')


class ChatbotView(APIView):
    def get(self, request, *args, **kwargs):
        conversations = request.session.get('conversations', [])
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        prompt = request.POST.get('prompt')
        if prompt:
            # 이전 대화 기록 가져오기
            session_conversations = request.session.get('conversations', [])
            previous_conversations = "\n".join([f"User: {c['prompt']}\nAI: {c['response']}" for c in session_conversations])
            prompt_with_previous = f"{previous_conversations}\nUser: {prompt}\nAI:"

            model_engine = "text-davinci-003"
            completions = oa.Completion.create(
                engine=model_engine,
                prompt=prompt_with_previous,
                max_tokens=1024,
                n=5,
                stop=None,
                temperature=0.5,
            )
            response = completions.choices[0].text.strip()

            conversation = {'prompt': prompt, 'response': response}

            # 대화 기록에 새로운 응답 추가
            serializer = ConversationSerializer(data=conversation)
            if serializer.is_valid():
                serializer.save()

        return Response({'message':'success'}, status=status.HTTP_200_OK )