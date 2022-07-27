# from students.models import Semester
# from result.student.models import Semester
from student.models import Student, Batch, Performance, Semester
from .sort_data import quickSort


# returns list of all the (Stundets) roll numbers present in the batch and branch
def get_all_roll_of_batch(sem,batch_id, branch_id):
    students = Student.objects.filter(batch=batch_id, branch=branch_id)
    roll = []
    for i in students:
        if sem in i.sem.all():
            roll.append(i.roll)
    return roll


#returns the list of students whos data is present in all the semester for the particular batch and branch
def get_roll_in_all_subject(rolls, no_of_sems):
    roll = []
    for i in rolls:
        if rolls.count(i) == no_of_sems:
            roll.append(i)
    return sorted(set(roll))


# this function calculates the CGPA of all the semester in the Batch of that particular student
def get_cgpa_roll(roll):
    roll = Student.objects.get(roll=roll)
    total = 0
    sems_cgpa = []
    for i in roll.sem.all():
        performance = Performance.objects.get(sem=i.id,roll=roll)
        total += performance.SCGPA
        if performance.had_backlog:
            sems_cgpa.append({"sem":performance.sem.name,"semSCGPA":performance.SCGPA,"backLog":True,"noOfBack":performance.no_of_backlog})
        else:
            sems_cgpa.append({"sem":performance.sem.name,"semSCGPA":performance.SCGPA,"backLog":False,"noOfBack":0})
    cgpa = float(str(total/len(roll.sem.all()))[:4])
    # cgpa = total/len(roll.sem.all())
    # {"roll":roll.roll,"CGPA":cgpa}
    return {"roll":roll.roll,"CGPA":cgpa,"data":sems_cgpa}



# returns CGPA of all the students whos data available in all the semester
def all_sems_analysis(sems, batch_id, branch_id):
    rolls = []
    for sem in sems:
        rolls += get_all_roll_of_batch(sem, batch_id , branch_id) # returns all the Students multiple times and store in a list
    roll = get_roll_in_all_subject(rolls, len(sems)) # filter and get list of students whos data is in all semester
    data = []
    all_students = []
    for i in roll:
        cgpa = get_cgpa_roll(i)
        data.append(cgpa)
        all_students.append(cgpa)
    quickSort(data,0,len(data)-1)
    top_data = data[::-1]
    temp  = []
    rank = 1
    for i in top_data:
        d = i
        d["rank"] = rank
        temp.append(d)
        rank+=1
    data = {"all_data":all_students,"top_data":temp}
    return data


# subj wise backlog in all section and
# sem wise backlog list
    
            




    
    
    
    
    
 