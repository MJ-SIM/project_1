
# 제목: DRF를 이용한 챗봇 기능 구현 
* DRF(Django REST framework) 서버 구성
* postman을 이용한 챗봇 통신 확인


## 목표
* DRF 기능 구현, 사용에 익숙해지고, FE, BE를 분리시켜 각각 통신이 가능하게 연결


## 목차
### 1. 폴더트리, 개발환경 및 개발기간
### 2. 진행상황
### 3. UI
### 4. 한계점
### 5. 느낀점


## 1. 폴더트리, 개발환경 및 개발기간
### 1-1 폴더트리
```
┣ 📂chat_project
 ┃ ┣ 📂chatbot
 ┃ ┃ ┣ 📂migrations
 ┃ ┃ ┃ ┣ 📜0001_initial.py
 ┃ ┃ ┃ ┗ 📜__init__.py
 ┃ ┃ ┣ 📂templates
 ┃ ┃ ┃ ┣ 📜base.html
 ┃ ┃ ┃ ┗ 📜chat.html
 ┃ ┃ ┣ 📂__pycache__
 ┃ ┃ ┣ 📜admin.py
 ┃ ┃ ┣ 📜apps.py
 ┃ ┃ ┣ 📜models.py
 ┃ ┃ ┣ 📜serializers.py
 ┃ ┃ ┣ 📜tests.py
 ┃ ┃ ┣ 📜urls.py
 ┃ ┃ ┣ 📜views.py
 ┃ ┃ ┗ 📜__init__.py
 ┃ ┣ 📂chat_project
 ┃ ┃ ┣ 📜asgi.py
 ┃ ┃ ┣ 📜settings.py
 ┃ ┃ ┣ 📜urls.py
 ┃ ┃ ┣ 📜views.py
 ┃ ┃ ┣ 📜wsgi.py
 ┃ ┃ ┗ 📜__init__.py
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📂migrations
 ┃ ┃ ┃ ┣ 📂__pycache__
 ┃ ┃ ┃ ┣ 📜0001_initial.py
 ┃ ┃ ┃ ┗ 📜__init__.py
 ┃ ┃ ┣ 📂templates
 ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┣ 📜user_login.html
 ┃ ┃ ┃ ┃ ┗ 📜user_register.html
 ┃ ┃ ┣ 📜admin.py
 ┃ ┃ ┣ 📜apps.py
 ┃ ┃ ┣ 📜forms.py
 ┃ ┃ ┣ 📜models.py
 ┃ ┃ ┣ 📜serializers.py
 ┃ ┃ ┣ 📜tests.py
 ┃ ┃ ┣ 📜urls.py
 ┃ ┃ ┣ 📜views.py
 ┃ ┃ ┗ 📜__init__.py
 ┃ ┣ 📜.env
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜db.sqlite3
 ┃ ┗ 📜manage.py
 ┣ 📂css
 ┃ ┗ 📜style.css
 ┣ 📂gif
 ┃ ┗ 📜LoadingImg.gif
 ┣ 📂img
 ┃ ┣ 📜1.jpg
 ┃ ┣ 📜Atlas.jpg
 ┃ ┣ 📜Between Night and Day.jpg
 ┃ ┣ 📜close-icon.svg
 ┃ ┗ 📜Venice.jpg
 ┣ 📂js
 ┃ ┣ 📜api.js
 ┃ ┣ 📜func.js
 ┃ ┣ 📜load.js
 ┃ ┣ 📜main.js
 ┃ ┣ 📜nav.js
 ┃ ┗ 📜popup.js
 ┣ 📂venv
```
### 1-2 개발환경
```
Django==4.2.3
djangorestframework==3.14.0
openai==0.27.8
Pillow==10.0.0
python-dotenv==1.0.0
```
### 1-3 개발기간
* 7/27 ~ 8/2

### 진행상황
![Alt text](/readme_img/11111111image.png)
* DRF 서버 브라우징


![Alt text](/readme_img/i222mage.png)
![Alt text](/readme_img/im33333age.png)
* method 요청, 응답 테스트


![Alt text](/readme_img/5image.png)
![Alt text](/readme_img/7.png)
* 챗지피티 응답 확인


### UI
![Alt text](/readme_img/i666mage.png)
* chatbot


![Alt text](/readme_img/image.png)
* 프론트엔트


* * *
## 4. 한계점
처음 프로젝트를 이해하는 방향이 잘못되어서 시간을 많이 허비했고, django rest framework를 배우는 기간이 매우 짧았기 때문에 이해하지 못한 상황에서 사용법도 몰라 코드 작성하는데 어려움을 겪었다.

지금까지 프로젝트는 시각적으로 볼 수 있어서 제대로 코드가 작성되고 있고, 어느 부분에 문제가 생겼는지 파악하기 쉬웠으나 프론트엔드, 백엔드를 분리시켜 통신하는 부분에서 강사님의 도움 없이는 방법을 알기 어려웠다.

## 5. 느낀점
이번 프로젝트는 나의 한계를 너무 잘 느끼게 해줬다.

전공지식도 없고 기본 베이스가 부족해서 통신이 어떤 방식으로 이루어지고 어떤 방향으로 나아가야할지 몰라서 포기하고 싶은 마음이 들었지만, 강사님의 도움으로 프론트, 백 각각의 서버 구성과 브라우징 기능을 사용하지 않고 응답, 요청을 확인하고 에러를 잡는 것은 확실히 자신감이 생긴 것 같다.