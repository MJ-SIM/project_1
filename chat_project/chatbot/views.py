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


class SendMessageView(APIView):
    def post(self, request):
        user_input = request.data.get('input_text')

        if user_input is None:
            return Response({'error': 'Invalid data. "input_text" is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # 여기에서 챗봇과 통신하고 응답을 받아온다면
        # response = your_chatbot_function(user_input)

        # 임시로 응답을 설정
        response = "This is a response from Chatbot."

        return Response({'generated_text': response}, status=status.HTTP_200_OK)


class ChatbotView(APIView):
    def get(self, request, *args, **kwargs):
        conversations = request.session.get('conversations', [])
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        user_message = request.data.get('message')  # 요청 데이터에서 "message" 키를 사용하여 사용자의 메시지를 가져옵니다.
        response = None

        if user_message:
            # 이전 대화 기록 가져오기
            session_conversations = request.session.get('conversations', [])
            previous_conversations = "\n".join([f"User: {c['user_message']}\nAI: {c['response']}" for c in session_conversations])
            prompt_with_previous = f"{previous_conversations}\nUser: {user_message}\nAI:"

            # 챗지피티 API를 사용하여 답변 얻기
            model_engine = "text-davinci-003"
            response = oa.Completion.create(
                engine=model_engine,
                prompt=prompt_with_previous,
                max_tokens=1024,
                n=1,
                stop=None,
                temperature=0.5,
            ).choices[0].text.strip()

            conversation = {'user_message': user_message, 'response': response}

            # 대화 기록에 새로운 응답 추가
            session_conversations.append(conversation)
            request.session['conversations'] = session_conversations

            # ConversationSerializer를 사용하여 새로운 대화 기록 직렬화
            serializer = ConversationSerializer(data=session_conversations, many=True)
            if serializer.is_valid():
                serializer.save()

        # 챗지피티의 답변을 응답으로 보냅니다.
        return Response({'message': response}, status=status.HTTP_200_OK)