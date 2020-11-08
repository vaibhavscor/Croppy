from django.shortcuts import render
from .forms import ImageForm
from django.http import JsonResponse


def main_view(request):
    form = ImageForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        form.save()
        return JsonResponse({'message': 'works'})
    context = {'form': form}
    return render(request,'main.html',context)




