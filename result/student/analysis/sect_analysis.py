from django.db.models.fields import CharField
from django.http.response import HttpResponse
from student.add_to_DB import extract_name
from .sem_analysis import cgpa_analysis_fun, title_and_code
from student.models import *
import pandas as pd
import numpy as np




# def subj_analysis_one_more_sec(sem,batch,reg,branch,code,name, sect):
#     stud = Student.objects.all().filter(batch=batch,regulation=reg,branch=branch,section=sect)
#     rolls = [roll.roll for roll in stud ]
#     subs = Subjects.objects.all().filter(sem=sem,batch=batch,regulation=reg,branch=branch,code=code,name=name)
#     fail_count = 0
#     num_of_student = 0
#     pass_count = 0
#     for i in range(len(subs)):
#         sub = subs[i]
#         if sub.roll.roll in rolls:
#             if sub.fail == True:
#                 fail_count += 1
#             else:
#                 pass_count +=1
            
#             num_of_student +=1
#     return {"fail":fail_count,"total_student":num_of_student,"passed_student":pass_count}
    


def subj_analysis_one_more_sec(sem,batch,reg,branch,subs, sect):
    stud = Student.objects.all().filter(batch=batch,regulation=reg,branch=branch,section=sect)
    rolls = [roll.roll for roll in stud ]
    fail_count = 0
    num_of_student = 0
    pass_count = 0
    for i in range(len(subs)):
        sub = subs[i]
        if sub.roll.roll in rolls:
            if sub.fail == True:
                fail_count += 1
            else:
                pass_count +=1
            
            num_of_student +=1
    pass_percentage = float(str((pass_count/num_of_student) * 100)[:4])
    return {"fail":fail_count,"total_student":num_of_student,"passed_student":pass_count,"Pass_percentage":pass_percentage}
    

    
def get_sem_performance_analysis(sem):
    if Performance.objects.filter(sem=sem, regulation=sem.regulation,batch=sem.batch).exists():
        pers = Performance.objects.all().filter(sem=sem, regulation=sem.regulation,batch=sem.batch)
        fail_count = 0
        pass_count = 0
        register_count = 0
        cgpa = []
        no_of_back = []
        
        for per in pers:
            if per.pass_or_fail == False:
                fail_count +=1
                no_of_back.append(per.no_of_backlog)
            else:
                pass_count +=1
            register_count +=1
            cgpa.append(per.SCGPA)
            
        back_data = {}
                
        for i in range(len(no_of_back)):
            if no_of_back[i] in back_data:
                back_data[no_of_back[i]] += 1
            else:
                back_data[no_of_back[i]] = 1
        data = {}
        data["CGPA"] = cgpa_analysis_fun(cgpa)
        data["Fail_count"] = fail_count
        data["Pass_count"] = pass_count
        data["Total_Registered"] = register_count
        data["Back_data"] = back_data
    
        return data

    return 0
            
            
        
        
        
        
        
# def get_subject_analysis_data_sec(sem,sect):
#     if Semester.objects.filter(id=sem.id).exists():
#         sem = Semester.objects.get(id=sem.id)
#         batch = sem.batch
#         reg = sem.regulation
#         branch = sem.branch
        
#         subjs = Subjects.objects.all().filter(sem=sem,batch=batch,regulation=reg,branch=branch)
#         subj_list = sem.subject.split(',')
#         title_code = title_and_code(subj_list)
#         code = title_code[0]
#         title = title_code[1]
#         data = {}
#         sem_data = {}
#         for i in range(len(code)):
#             d = subj_analysis_one_more_sec(sem,batch,reg,branch,code[i],title[i],sect)
#             data[code[i]] = {title[i]:d}
#         sem_data["Subjects"] = data
#         # per = get_sem_performance_analysis(sem)
#         # sem_data["Semester PerFormance"] = per
#     return sem_data

        
def get_subject_analysis_data_sec(sem,sect,subj):
    if Semester.objects.filter(id=sem.id).exists():
        sem = Semester.objects.get(id=sem.id)
        batch = sem.batch
        reg = sem.regulation
        branch = sem.branch
        title_code = extract_name(subj)
        code = title_code[0]
        name = title_code[1]
        
        subjs = Subjects.objects.all().filter(sem=sem,batch=batch,regulation=reg,branch=branch,name=name,code=code)
        data = []
        tt = {}
        tt["subj"] = name
        tt["code"] = code
        tt["cc"] = subj
        
        for i in sect.keys():
            temp = {}
            d = subj_analysis_one_more_sec(sem,batch,reg,branch,subjs,i)
            temp["sect"] = i
            temp["analysis"] = d
            data.append(temp)
        tt["data"] = data
        return tt
    return []


# def section_analysis(sect,reg,batch,branch,sem,students):
#     return get_subject_analysis_data_sec(sem,sect)


def section_analysis(subj,reg,batch,branch,sem,students,sect):
    return get_subject_analysis_data_sec(sem,sect,subj)






def get_sect_data(sect,reg,batch,branch,sem):
    fail_count = 0
    student = Student.objects.filter(section=sect,regulation=reg,batch=batch, branch=branch)
    
            


def get_complete_sect_wise_subj_analysis(sect_list,reg,batch,branch,sem):
    data = {}
    for i in sect_list:
        get_sect_data(i,reg,batch,branch,sem)















