from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View

class IndexMain(View):
    def get(self, request):
        context ={
            'title':'Index'
        }
        return render(request, 'base.html', context)