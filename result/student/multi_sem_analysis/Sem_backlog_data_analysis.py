


from turtle import back
from numpy import roll
from student.models import Batch,Branch, Performance,Semester, Student



def get_select_sem_backlog_analysis(sem):
    sem = Semester.objects.get(id=sem.id)
    students = Student.objects.filter(sem=sem.id)
    backlog_count = 0
    for i in students:
        if Performance.objects.filter(roll=i.id).exists():
            perf = Performance.objects.get(roll=i.id,sem=sem.id)
            if perf.had_backlog == True:
                backlog_count += 1
    return {"semName":sem.name,"backlogCount":backlog_count}




def get_sem_wise_backlog_analysis(sems, batch, branch):
    data = []

    for sem in sems:
        data.append(get_select_sem_backlog_analysis(sem))
    print(data)
    return data






