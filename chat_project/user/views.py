from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Profile
from .forms import RegisterForm, LoginForm
from .serializers import ProfileSerializer, UserSerializer

# Create your views here.
# user 관련된 기능
# 회원가입
# 로그인
# 로그아웃

### Registration
class Registration(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('chatbot:chat')
        # 회원가입 페이지
        # 정보를 입력할 폼을 보여주어야 한다.
        form = RegisterForm()
        context = {
            'form': form,
            'title': 'User'
        }
        return render(request, 'user/user_register.html', context)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'status': 'success', 'message': '회원가입이 성공적으로 완료되었습니다.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

### Login
class Login(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('chatbot:chat')
        
        form = LoginForm()
        context = {
            'form': form,
            'title': 'User'
        }
        return render(request, 'user/user_login.html', context)
        
    def post(self, request):
        if request.user.is_authenticated:
            return redirect('chatbot:chat')
        
        form = LoginForm(request, request.POST)
        if form.is_valid():
            email = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=email, password=password) # True, False
            
            if user:
                login(request, user)
                return redirect('chatbot:chat')
            
        form.add_error(None, '아이디가 없습니다.')
        
        context = {
            'form': form
        }
        
        return render(request, 'user/user_login.html', context)


### Logout
class Logout(APIView):
    def post(self, request):
        logout(request)
        return Response({'status':'success', 'message':'로그아웃되었습니다.'}, status=status.HTTP_200_OK)


### Profile
# 조회, 쓰기
# 수정, 삭제
class ProfileWrite(APIView):
    # def get():
    #     pass # url로 이동
    def post(self, request):
        user = request.data.get('user') # request.user
        image = request.data.get('image')
        age = request.data.get('age')
        
        profile = Profile.objects.create(user=user, image=image, age=age)
        serializer = ProfileSerializer(profile)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProfileUpdate(APIView):
    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    
    def post(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileDelete(APIView):
    def post(self, request):
        # profile - user
        profile = Profile.objects.get(user=request.user)
        profile.delete()
        return Response({'msg': 'Profile deleted'}, status=status.HTTP_200_OK)