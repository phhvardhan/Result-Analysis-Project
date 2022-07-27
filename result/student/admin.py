from django.contrib import admin
from .models import Attempt, BacklogData, BacklogSubject, Batch, Branch, Performance, Regulation, Semester, Student, Subjects
# Register your models here.




class VideoAdminModel(admin.ModelAdmin):
    search_fields=('roll',)
admin.site.register([Semester,Branch,Regulation,Subjects,Performance, BacklogSubject ,Attempt, Batch,BacklogData])
admin.site.register(Student,VideoAdminModel)
