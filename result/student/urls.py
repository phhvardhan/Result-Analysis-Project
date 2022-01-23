from django.urls import path

from . import views
urlpatterns = [
    # path('semester',views.SemView.as_view()),
    path('index',views.index, name="index"),
    # path('upload',views.upload,name="upload"),
    path('data',views.data,name="upload_data"),
    # path('backlog',views.backlogupload,name="backlog"),
    path('backpost',views.backlogdata,name="backlog_data"),
    path('subj/<int:sem_id>',views.get_sem_analysis,name="sem_data"),
    path('all-subj/<int:sem_id>',views.subj_analysis_all,name="all-subj-analysis"),
    path('student',views.student_detail,name="student"),
    path('student/<int:sem_id>',views.get_sect_analysis,name="student_data"),
    path('test',views.generate_list_semester, name="test"),
    path('updata',views.get_reg_branch_batch,name="updata"),
    path('backupdata',views.get_back_predata, name="backdata"),
]