from re import S

from scipy.fftpack import tilbert
from .back_log_handler import add_backlog, add_student_performance
from student.preprocesssing import get_subj_list, get_transformed_data
from .models import BacklogSubject, Batch, Performance, Semester, Subjects,Student,Regulation, Branch
import pandas as pd
import numpy as np

def extract_name(subj_name):
    names = subj_name.split("-")
    if len(names) > 1:
        code = names[0].strip()
        name = names[1].strip()
        return [code,name]
    else:
        return names
    
def add_student(sem,roll):
    batch = Batch.objects.get(id=sem.batch.id)
    print(roll)
    for i in range(len(roll)):
        if Student.objects.filter(roll=roll[i]).exists():
            student = Student.objects.get(roll=roll[i])
            print(student)
            print("inside iff")
            if sem not in student.sem.all() and student.branch == sem.branch and student.regulation == sem.regulation:
                student.sem.add(sem)
                student.save() 
            else:
                print("inside")
                return False
        else:
            print("inside else")
            student = Student(roll=roll[i], regulation= sem.regulation, branch=sem.branch,batch=batch)
            student.save()
            student.sem.add(sem)
            student.save()
    return True



def add_subject(data,subj_name,code,sem,roll):
    credit = list(map(float,data["Credit"]))
    batch = Batch.objects.get(id=sem.batch.id)
    # print(type(credit[1]))
    # print(credit[1])
    # print(type(credit))
    cgpa = list(map(float,data["CGPA"]))
    for i in range(len(data)):
        attendance_data = data["Attendance"]
        result_data = data["Result"]
        credit_data = credit[i]
        grade_data = data["Grade"]
        cgpa_data = cgpa[i]
        student_roll = Student.objects.get(roll=roll[i])
        # sem should be removed to maintain unique constraint
        if Subjects.objects.filter(code=code,roll=student_roll,sem=sem,batch=batch).exists():
            pass
        else:
            subj = Subjects(roll=student_roll,name=subj_name,code=code,branch=sem.branch, regulation=sem.regulation,
                            sem=sem,credit=credit_data,result=result_data[i],attendance=attendance_data[i],
                            batch=batch,grade=grade_data[i],cgpa=cgpa_data)
            subj.save()
            
            subj = Subjects.objects.get(id=subj.id)
            if subj.result == "F":
                subj.fail = True
                subj.save()
                add_backlog(subj,student_roll)
            
        # print(f"{roll[i]} for {subj_name} having Attendance of {attendance_data[i]} and result is {result_data[i]} \n credit is {credit_data[i]} grade is {grade_data[i]} cgpa is {cgpa_data[i]}")
    
        


def add_performance_sem(data,roll,sem):
    data["Registered"] = list(map(int,data["Registered"]))
    data["Pass"] = list(map(int,data["Pass"]))
    data["TCR"] = list(map(float,data["TCR"]))
    data["TCP"] = list(map(float,data["TCP"]))
    data["SCGPA"] = list(map(float,data["SCGPA"]))
    
    batch = Batch.objects.get(id=sem.batch.id)
    
    for i in range(len(data)):
        registered_data = data["Registered"]
        no_of_pass_data = data["Pass"]
        # TCR_data = data["TCR"]
        # TCP_data = data["TCP"]
        # scgpa = data["SCGPA"]
        per_data = add_student_performance(roll[i],sem)
        TCR  = per_data[0]
        TCP  = per_data[1]
        SCGPA  = per_data[2]
        student_roll = Student.objects.get(roll=roll[i])
        no_of_backlog = registered_data[i] - no_of_pass_data[i]
        
        if no_of_backlog < 1:
            pass_or_fail = True
            had_backlog = False
        else:
            pass_or_fail = False
            had_backlog = True
            
        perform = Performance(roll=student_roll, regulation=sem.regulation,sem=sem,
                              registered=registered_data[i], no_of_pass=no_of_pass_data[i], 
                              no_of_backlog=no_of_backlog, pass_or_fail=pass_or_fail,
                              TCR=TCR, TCP=TCP, SCGPA=SCGPA, batch=batch,had_backlog=had_backlog)
        perform.save()  
        get_perform = Performance.objects.get(id=perform.id)
        subjs = Subjects.objects.all().filter(sem=sem,roll=student_roll)
        for j in subjs:
            sub = Subjects.objects.get(id=j.id)
            get_perform.subject.add(sub)
            get_perform.save()
        


def check_repeated_subj(data,bra,reg,batch):
    sems = Semester.objects.filter(branch=bra,regulation=reg,batch=batch)
    # for i in sems:
    #     if i.subject == subjs:
    #         return False
    #     s = i.subject.split(",")
    #     for j in s:
    #         if j in title:
    #             return False
    return True
    
def check_repeated_sem(title,sem):
    sems = Semester.objects.filter(branch=sem.branch,regulation=sem.regulation,batch=sem.batch)
    if len(sems) > 1:
        subjs = ",".join(title[:-1])
        print(title,"-"*10)
        for i in sems:
            if i.subject == subjs and i.id != sem.id:
                return False
            s = i.subject.split(",")
            print("-------------------------- new-----------------")
            print(s)
            if len(s) > 1 and i.id != sem.id:
                for j in s:
                    print(j)
                    if j in title:
                        print("fkadsdsnlsklllllllllllllllllllllllllll")
                        return False
            
    return True
    
    
def split_data(data,sem_id):
    sem = Semester.objects.get(id=sem_id)
    data = pd.read_excel(data)
    title = get_subj_list(data,6)
    
    sem.subject = ",".join(title[:-1])
    sem.save()
    if not check_repeated_sem(title,sem):
        return False
    di = get_transformed_data(data)
    # sem.subject = ",".join(title[:-1])
    # sem.save()
    
    
    
    
    # compulsory add this line to add new students in the database
    
    if not add_student(sem,di[1]):
        print("please check your file. it may contain inconsistent data")
        return False
    # d1 = di[0][title[-1]]
    for i in di[0].keys():
        code_and_subj = extract_name(i)
        if len(code_and_subj) > 1:
            subj_name = code_and_subj[1]
            code = code_and_subj[0]
            data = di[0][i]
            add_subject(data,subj_name,code,sem,di[1])
            
        else:
            add_performance_sem(di[0][i],di[1],sem)
            
    return True



def add_or_update_student_details(data,branch,reg,batch):
    names = list(data["name"])
    rolls = list(data["roll"])
    secs = list(data["sec"])
    if Student.objects.filter(regulation=reg, branch=branch, batch=batch).exists():
        for i in range(len(data)):
            if Student.objects.filter(regulation=reg, branch=branch, batch=batch,roll=rolls[i]).exists():
                # print(rolls[i])
                if Student.objects.filter(regulation=reg, branch=branch, batch=batch,roll=rolls[i],section=10).exists():
                    student = Student.objects.get(regulation=reg, branch=branch, batch=batch,roll=rolls[i],section=10)
                    student.section = secs[i]
                    if not pd.isna(names[i]):
                        student.name = names[i]
                    student.save()
                else:
                    pass
            else:
                name = names[i]
                roll = rolls[i]
                sec = secs[i]
                student = Student(roll=roll,name=name,section=sec,regulation=reg, branch=branch, batch=batch)
                student.save()
    else:
        for i in range(len(data)):
            name = names[i]
            roll = rolls[i]
            sec = secs[i]
            if not  Student.objects.filter(roll=roll).exists():
                student = Student(roll=roll,section=sec,regulation=reg, branch=branch, batch=batch)
                student.save()
                if not pd.isna(names[i]):
                    student.name = names[i]
                student.save()


# add student with section and name details
def split_data_student(data, branch, reg, batch):
    data = pd.read_excel(data)
    # print(data)
    data = data.iloc[:,1:]
    print(data)
    add_or_update_student_details(data,branch,reg,batch)
    



            
    
    
    