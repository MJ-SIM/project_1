from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils import timezone

# Create your models here.
'''
Auth User model
-생성
-삭제
-수정
--> UserManager helper class 도움주는 클래스
이메일을 아이디로 사용하려면 헬퍼 클래스 수정해야함
'''

class UserManager(BaseUserManager):
    
    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('User must have an email')
        # now = timezone.now() 현재시간 -> UTC
        now = timezone.localtime()

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            last_login=now,
            date_joined=now,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    # create_user
    def create_user(self, email, password, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)
    # create_superuser
    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True, **extra_fields)

    

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True, max_length=255) #이메일을 아이디로 사용할려고 함
    name = models.CharField(max_length=50, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD='email' #유저네임을 이메일로 할거야
    EMAIL_FIELD= 'email' #이메일 필드도 이메일로 할거야
    REQUIRED_FIELDS = [] # 필수값 지정

    objects = UserManager()


class Profile(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='user/media')
    age = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    
