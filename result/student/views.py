from traceback import print_tb
from urllib import response
from django.http import request
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from student.preprocesssing import get_all_batch_for_reg,get_all_reg_for_branch
from student.preprocesssing import  get_section_list
from student.add_to_DB import split_data
from .add_to_DB import split_data_student
from student.back_log_handler import split_data_backlog
from .analysis.sem_analysis import get_subject_analysis_data,all_subj
from .analysis.sect_analysis import section_analysis
from student.preprocesssing import get_subj_list, get_subject_analysis, get_transformed_data
from .models import BacklogData, Batch, Branch, Performance, Regulation, Semester, Student, Subjects
import os
import pandas as pd
from rest_framework import status,viewsets
from rest_framework.decorators import api_view
from .serializers import SemesterSerializer,CsrfExemptSessionAuthentication
from rest_framework.parsers import MultiPartParser ,FormParser
from pyexcel_xlsx import get_data
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
# Create your views here.




######################## ---------------REST API ------------------


# class SemesterViewSet(viewsets.ModelViewSet):
#     queryset = Semester.objects.all()
#     serializer_class = SemesterSerializer
    
#     def post(self, request, *args, **kwargs):
#         name = request.data["name"]
#         reg = request.data["reg"]
#         branch = request.data["branch"]
#         batch = request.data["batch"]
#         file = request.FILES.get('file')
#         data = get_data(file)
#         print(data)
#         sem = Semester.objects.create(name=name,regulation=reg,branch=branch, file=file, batch=batch)
#         split_data(data,sem.id)
#         return HttpResponse({"message": "Book Created"}, status=status.HTTP_200_OK)




class SemView(APIView):
    permission_classes = (AllowAny)
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        name = request.data["name"]
        reg = request.data["reg"]
        branch = request.data["branch"]
        batch = request.data["batch"]
        reg = Regulation.objects.get(id=reg)
        branch= Branch.objects.get(id=branch)
        batch = Batch.objects.get(id=batch)
        sem = Semester.objects.create(name=name,regulation=reg,branch=branch, batch=batch)
        data = request.FILES.get('file')
        sem.file = data
        sem.save()
        split_data(data, sem.id)
        
        return Response({"hi":"hlo"}, status=status.HTTP_200_OK)
        # if file_serializer.is_valid():
        #     file_serializer.save()
        #     return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)








def index(request):
    # print("hi")
    # if request.method == 'POST':
    #     if "excel" in request.FILES:
    #         user = request.FILES["excel"]
    #         ex = Semester(file=user)
    #         ex.save()
    #         data = pd.read_excel(user)
    #         title = get_subj_list(data,6)
    #         di = get_transformed_data(data)
    #         d1 = di[0][title[-1]]
    #         print(d1[d1["Roll"] == "20135A0514"])
    #         print(title[-1])
    sem = Semester.objects.all()
    # # subj = Subjects.objects.filter(name="DISCRETE MATHEMATICAL STRUCTURES")
    # get_subject_analysis(sem,"DISCRETE MATHEMATICAL STRUCTURES")
    
    context  = {
        'sem':sem,
    }
    return render(request,"base.html",context) 

def upload(request):
    sem = Semester.objects.all()
    reg = Regulation.objects.all()
    branch = Branch.objects.all()
    batch = Batch.objects.all()
    context = {
        'sem':sem,
        'branch':branch,
        "reg":reg,
        'batch':batch,
    }
    
    return render(request,"upload_excel.html",context)



def backlogupload(request):
    sem = Semester.objects.all()
    reg = Regulation.objects.all()
    branch = Branch.objects.all()
    batch = Batch.objects.all()
    context = {
        'sem':sem,
        'branch':branch,
        "reg":reg,
        'batch':batch
    }
    
    return render(request,"back_log.html",context)


@csrf_exempt
def backlogdata(request):
    if request.method == "POST":
        reg = request.POST.get("reg")
        branch = request.POST.get("branch")
        batch = request.POST.get("batch")
        sem = request.POST.get("sem")
        bra = Branch.objects.get(id=branch)
        reg = Regulation.objects.get(id=reg)
        batch = Batch.objects.get(id=batch)
        sem = Semester.objects.get(id=sem)
        backdata = BacklogData(sem=sem,regulation=reg,branch=bra,batch=batch)
        backdata.save()
        if "file" in request.FILES:
            data = request.FILES['file']
            backdata.file = data
            backdata.save()
        backdata.save()
        split_data_backlog(data,sem.id)
        print("BACKLOG DATA UPLOADED SUCCESSFUL")
        return JsonResponse({"Uploaded":"Success"}, status=status.HTTP_201_CREATED) 
    return JsonResponse({"Uploaded":"Failed"}, status=status.HTTP_400_BAD_REQUEST) 

# 4 
# sem data upload handler
#  Sem Analysis API Function
#  REACT Fetch API function
#  Section wise Analysis API FUNCTION


# UPLOAD EXCEL FILE API HANDLER
@csrf_exempt
def data(request):
    if request.method == "POST":
        reg = request.POST.get("reg")
        branch = request.POST.get("branch")
        name = request.POST.get("name")
        batch = request.POST.get('batch')
        bra = Branch.objects.get(id=branch)
        reg = Regulation.objects.get(id=reg)
        batch = Batch.objects.get(id=batch)
        if Semester.objects.filter(branch=bra,batch=batch,regulation=reg,name=name).exists():
            pass
        else:
            sem = Semester(name=name,branch=bra,regulation=reg,batch=batch)
            sem.save()
            if "file" in request.FILES:
                data = request.FILES['file']
                sem.file = data
                sem.save()
            sem.save()
            split_data(data,sem.id)
            print("SEM DATA UPLOADED SUCCESSFUL")
            return JsonResponse({"Uploaded":"Success"}, status=status.HTTP_201_CREATED) 
        return JsonResponse({"Uploaded":"Failed"}, status=status.HTTP_400_BAD_REQUEST) 
    
    return Response({"Uploaded":"Failed"}, status=status.HTTP_400_BAD_REQUEST)  





def get_sem_analysis(request,sem_id):
    if Semester.objects.filter(id=sem_id).exists():
        sem = Semester.objects.get(id=sem_id)
        return JsonResponse(get_subject_analysis_data(sem))
    
    
    
    
# def get_sect_analysis(request, sem_id):
#     if Semester.objects.filter(id=sem_id).exists():
#         sem = Semester.objects.get(id=sem_id)
#         reg = Regulation.objects.get(id=sem.regulation.id)
#         batch = Batch.objects.get(id=sem.batch.id)
#         branch = Branch.objects.get(id=sem.branch.id)
#         if Student.objects.filter(regulation=reg, batch=batch,branch=branch).exists():
#             students = Student.objects.all().filter(regulation=reg, batch=batch,branch=branch)
#             sect_list = get_section_list(students)
#             subj = sem.subject.split(',')
#             data = {}
#             for i in list(sect_list.keys()):  
#                 analyse = section_analysis(i,reg,batch,branch,sem,students)
#                 data[f"Section_{i}"] = analyse
#             data["subj"] = subj
#             main = {}   
#             main["data"] = data
#             return JsonResponse(main)
    
#     return HttpResponse("hi")
        
        
# SECTION WISE SEM ANALYSIS API HANDLER

def get_sect_analysis(request, sem_id):
    if Semester.objects.filter(id=sem_id).exists():
        sem = Semester.objects.get(id=sem_id)
        reg = Regulation.objects.get(id=sem.regulation.id)
        batch = Batch.objects.get(id=sem.batch.id)
        branch = Branch.objects.get(id=sem.branch.id)
        if Student.objects.filter(regulation=reg, batch=batch,branch=branch).exists():
            students = Student.objects.all().filter(regulation=reg, batch=batch,branch=branch)
            sect_list = get_section_list(students)
            subj = sem.subject.split(',')
            data = []
            for i in subj:  
                analyse = section_analysis(i,reg,batch,branch,sem,students,sect_list)
                data.append(analyse)
            main = {}   
            main["sect"] = list(sect_list.keys())
            main["data"] = data
            main2 = {}
            main2["data"] = main
            return JsonResponse(main2,safe=False)
    
    return HttpResponse("hi")
        
        


@csrf_exempt
def student_detail(request):
    if request.method == "POST":
        reg = request.POST.get("reg")
        branch = request.POST.get("branch")
        batch = request.POST.get("batch")
        bra = Branch.objects.get(id=branch)
        reg = Regulation.objects.get(id=reg)
        batch = Batch.objects.get(id=batch)
        # students = Student.objects.all().filter(regulation=reg,branch=bra, batch=batch)
        # backdata = BacklogData.objects.get(id=backdata.id)
        
        if "file" in request.FILES:
            data = request.FILES['file']
            split_data_student(data, bra,reg,batch)
            
            
        
        # split_data_backlog(data,sem.id).\
    
    
    reg = Regulation.objects.all()
    batch = Batch.objects.all()
    branch = Branch.objects.all()
    
    context = {
        'regs': reg,
        'batch': batch,
        'branch': branch,
    }
    
    return render(request, "student.html",context)


def generate_list_semester(request):
    branchs = Branch.objects.all()
    
    data = []
    for i  in branchs:
        temp = {}
        temp["id"] = i.id
        temp["name"] = i.branches
        temp["reg"] = get_all_reg_for_branch(i)
        data.append(temp)
    # print(data)
     
    return JsonResponse(data,safe=False)


def subj_analysis_all(request,sem_id):
    sem = Semester.objects.get(id=sem_id)
    
    data = all_subj(sem.id)
        
    return HttpResponse(sem.subject)



# def generate_list_semester(request):
#     reg = Regulation.objects.all()
#     # batchs = Batch.objects.all()
#     # print(batchs)
#     data = []
#     for i in reg:
#         sub = {}
#         sub["id"] = i.id
#         sub["title"] = i.regulation
#         sub["year"] = i.year
#         sub["data"] = get_all_batch_for_reg(i)
#         data.append(sub)    
        
#     return JsonResponse(data,safe=False)
    
    
def get_reg_branch_batch(request):
    regs = Regulation.objects.all()
    batchs = Batch.objects.all()
    branchs = Branch.objects.all()
    
    reg_dic = []
    for i in regs:
        temp = {}
        temp["title"] = i.regulation
        temp["id"] = i.id
        temp["name"] = f"{i}"
        reg_dic.append(temp)
    batch_dic = []
    for i in batchs:
        temp = {}
        temp["name"] = i.name
        temp["reg"] = i.reg.regulation
        temp["id"] = i.id
        batch_dic.append(temp)
        
    branch_dict = []
    for i in branchs:
        temp = {}
        temp["name"] = i.branches
        temp["id"] = i.id
        branch_dict.append(temp)
    data = {}
    data["updata"] = {"reg":reg_dic, "branch": branch_dict,"batch": batch_dic}
          
    return JsonResponse(data)



def get_back_predata(request):
    regs = Regulation.objects.all()
    batchs = Batch.objects.all()
    branchs = Branch.objects.all()
    sems =  Semester.objects.all()
    
    reg_dic = []
    for i in regs:
        temp = {}
        temp["title"] = i.regulation
        temp["id"] = i.id
        temp["name"] = f"{i}"
        reg_dic.append(temp)
    batch_dic = []
    for i in batchs:
        temp = {}
        temp["name"] = i.name
        temp["reg"] = i.reg.regulation
        temp["id"] = i.id
        batch_dic.append(temp)
        
    branch_dict = []
    for i in branchs:
        temp = {}
        temp["name"] = i.branches
        temp["id"] = i.id
        branch_dict.append(temp)
    sem_dic = []
    for i in sems:
        temp = {}
        temp["name"] = i.name
        temp["id"] = i.id
        temp["reg"] = i.regulation.regulation
        temp["batch"] = i.batch.name
        temp["branch"] = i.branch.branches
        sem_dic.append(temp)
    data = {}
    data["updata"] = {"reg":reg_dic, "branch": branch_dict,"batch": batch_dic,"sem":sem_dic}
    print(data)
    return JsonResponse(data)



# @api_view(['POST'])
# def test(request):
#     if request.method == "POST":
#         print(request.data)
#         return JsonResponse(request.data)