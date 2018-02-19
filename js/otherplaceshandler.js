window.setInterval(checkTimeAndLesson,1000)
window.setInterval(checkInterestPlaces,60000)


function listOtherPlaces(){
    $('.list-group-item-interest').remove()
    $('.collapse-item').remove()


    
    database.ref('otherplaces/').on('child_added',function(interestSnapshot){

        var type=interestSnapshot.child('type').val()
        var name=interestSnapshot.child('name').val()
        var key=interestSnapshot.key
        var imageUrl=getUrlImage(type)
        var listGroupContainer=$('#interest_list')

        var domToAdd
        if($(window).width()>=1200){
            domToAdd='<li class="list-group-item list-group-item-interest flex-column align-items-start "><div class="d-flex w-100 justify-content-between"><div class="row justify-content-start" style="max-width: 900px;"><div class="col-auto" ><p class="mb-1 display-4 place_name" >'+name+'</p></div></div><span class="badge badge-pill badge-info" style="height: 17px;" id="badgeinterest_'+key+'"></span></div><div class=" row justify-content-start" style=" max-width: 1100px; margin-top: 20px;" ><div class="col-auto col-center  "><img  class="icon d-block mx-auto" src="'+imageUrl+'" ></div><div class="col-4 col-center"><p class=" text-left d-block mx-auto my-auto classroom_info" id="activity_'+key+'" >Tempo di studiare per gli esami!</p></div><div class="col-auto col-center  " ><img  class="icon d-block mx-auto" src="css/assets/clock.svg" ></div>    <div class="col-3 col-center  "><p class=" text-left d-block mx-auto my-auto classroom_info" id="timeinterest_'+key+'">Pervasive Computing-Today,11:00</p></div><div class="col-auto col-center"><img class="icon" src="css/assets/panel.svg" ></div><div class="col-auto col-center" ><button type="button" class="btn btn-success btn-sm  " id="getdirections_'+key+'"  href="#directioncollapse'+key+'" role="button" aria-expanded="false" aria-controls="directioncollapse'+key+'" data-toggle="collapse">Get directions!</button></div></div></div></li><div class="collapse collapse-item" id="directioncollapse'+key+'"></div>'

        }
        else if($(window).width()>=960 && $(window).width()<1200){
            //            alert('dsjkfl')
            domToAdd='<li class="list-group-item-interest list-group-item flex-column align-items-start "><div class="d-flex justify-content-between"><div class="row justify-content-start" style="width: 500px;"><div class="col-auto" ><p class="mb-1 display-4 place_name" >'+name+'</p></div></div><span class="badge badge-pill badge-info" style="height: 17px;" id="badgeinterest_'+key+'"></span></div><div class=" row justify-content-start" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto col-center"><img  class="icon d-block mx-auto" src="'+imageUrl+'" ></div><div class="col-auto col-center"><p class=" text-left  d-block mx-auto my-auto classroom_info" id="activity_'+key+'" >Tempo di studiare per gli esami!</p></div></div><div class=" row justify-content-start" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto " " ><img  class="icon d-block mx-auto" src="css/assets/clock.svg" ></div><div class="col-auto col-center"><p class=" text-left d-block mx-auto my-auto classroom_info" id="timeinterest_'+key+'" ></p></div></div><div class="row justify-content-start" style="max-width:100%; margin-top: 20px;" ><div class="col-auto col-center " ><img class="icon" src="css/assets/panel.svg" ></div><div class="col-auto col-center" ><button type="button" class="btn btn-success btn-sm  " id="getdirections_'+key+'"  href="#directioncollapse'+key+'" role="button" aria-expanded="false" aria-controls="directioncollapse'+key+'" data-toggle="collapse">Get directions!</button></div></div></li><div class="collapse collapse-item" id="directioncollapse'+key+'"></div>'
        }
        else{
            domToAdd='<li class="list-group-item-interest list-group-item flex-column align-items-start "><div class="d-flex justify-content-between"><div class="row justify-content-start" style="width: 500px;"><div class="col" ><p class="mb-1 display-4 place_name" >'+name+'</p></div></div><span class="badge badge-pill badge-info" style="height: 17px;" id="badgeinterest_'+key+'"></span></div><div class=" row justify-content-start" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto col-center"><img  class="icon d-block mx-auto" src="'+imageUrl+'" ></div><div class="col "><p class=" text-left  d-block mx-auto my-auto classroom_info" id="activity_'+key+'" >Tempo di studiare per gli esami!</p></div></div><div class=" row justify-content-start" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto " " ><img  class="icon d-block mx-auto" src="css/assets/clock.svg" ></div><div class="col "><p class=" text-left d-block mx-auto my-auto classroom_info" id="timeinterest_'+key+'" >Pervasive Computing, Tuesday at 9:00</p></div></div><div class="row justify-content-start" style="max-width:100%; margin-top: 20px;" ><div class="col-auto col-center " ><img class="icon" src="css/assets/panel.svg" ></div><div class="col-auto col-center" ><button type="button" class="btn btn-success btn-sm  " id="getdirections_'+key+'"  href="#directioncollapse'+key+'" role="button" aria-expanded="false" aria-controls="directioncollapse'+key+'" data-toggle="collapse">Get directions!</button></div></div></li><div class="collapse collapse-item" id="directioncollapse'+key+'"></div>'
        }

        $('.loader-interest').remove()
       
      
        listGroupContainer.append(domToAdd)


        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
        getClassroomDirections(key)
        var activity=interestSnapshot.child('activity').val()
        var textToShow=activity==null?'Nothing to show here':activity
        $('#activity_'+key).text(textToShow)

        var action=interestSnapshot.child('action')
        if(action.numChildren()>1){
            var dailyActions=[]

            getClosestDayOfAction(key,dailyActions)

        }
        else if( action.val()==null && key=='Macchinetta'){

            $('#timeinterest_'+key).text('Come here to chill out with coffe and friends')
            $('#badgeinterest_'+key).text('always open')


        }

    })
}
function checkInterestPlaces(){
    console.log('interest places '+new Date().getSeconds())
    database.ref('otherplaces/').on('child_added',function(interestSnapshot){

        var type=interestSnapshot.child('type').val()
        var name=interestSnapshot.child('name').val()
        var key=interestSnapshot.key


        var action=interestSnapshot.child('action')
        if(action.numChildren()>1){
            var dailyActions=[]

            getClosestDayOfAction(key,dailyActions)

        }

    })

}
function getClosestDayOfAction(key,dailyActions){
    database.ref('otherplaces/'+key+'/action/').on('value',daySchedule=>{
        // var key=daySchedule.key
        // console.log(key+' before '+dailyActions.length)
        daySchedule.forEach(snapshot=>{
            //   console.log(key+' '+snapshot.key)
            var timeStart=snapshot.child('timeStart').val()
            var timeEnd=snapshot.child('timeEnd').val()
            var dayValue=snapshot.child('value').val()
            var lessonName=snapshot.child('subject').val()==null?-1:snapshot.child('subject').val()
            var dailyAction={
                'dayValue':dayValue,
                'key':key,
                'timeStart':timeStart,
                'timeEnd':timeEnd,
                'name':lessonName
            }
            dailyActions.push(dailyAction)
            //   console.log(key+' after '+dailyActions.length)
            if(dailyActions.length>0){
                setInterestPlacesTime(dailyActions)
            }
            //            console.log('place '+key+' dailyAction '+dailyAction.timeStart+' '+dailyAction.timeEnd)    
        })

    })

}

function setInterestPlacesTime(dailyActivities){
    // console.log('i have been called')

    // console.log(minuteStart)
    var temp=dailyActivities[0]

    var date=new Date()
    var currentDay=date.getDay()
    var currentHour=date.getHours()
    var currentMinute=date.getMinutes()

    for(var i=0;i<dailyActivities.length;i++){
        var dailyActionToCompare=dailyActivities[i]

        var dayDiff1=temp.dayValue-currentDay
        var dayDiff2=dailyActionToCompare.dayValue-currentDay

        if(dayDiff1!=0 && dayDiff2==0){ // se temp non è oggi ma l'altra si, allora temp cambia
            temp=dailyActionToCompare
        }
        if(dayDiff2>0 && dayDiff1<0){ // se action to compare non è oggi e la differenza tra oggi e il giorno                                        in cui c'è è minore di quella di temp, cambio
            temp=dailyActionToCompare
        }
        if(dayDiff2<dayDiff1){
            temp=dailyActionToCompare
        }
        //if(temp.key=='Biblioteca')



    }
    var date=new Date()
    var currentHour=date.getHours()
    var currentMinute=date.getMinutes()   
    var timeToSplitStart=temp.timeStart.split(':',2)
    var timeToSplitEnd=temp.timeEnd.split(':',2)
    var hourEnd=timeToSplitEnd[0]
    var minuteEnd=timeToSplitEnd[1]
    //console.log(timeToSplit)
    var hourStart=timeToSplitStart[0]
    //console.log(hourStart)
    var minuteStart=timeToSplitStart[1]
    var timeDiffCurrentStart=hourStart-currentHour
    var timeDiffCurrentEnd=hourEnd-currentHour
    var timeDiffCurrentMinuteStart=minuteStart-currentMinute
    var timeDiffCurrentMinuteEnd=minuteEnd-currentMinute
    var day=temp.dayValue==currentDay?'Today':renderDay(temp.dayValue)


    if(temp.dayValue==currentDay && timeDiffCurrentStart<=0 && timeDiffCurrentEnd>=0 && timeDiffCurrentMinuteEnd>=0){
        switch(temp.key){
            case 'Biblioteca':
                $('#timeinterest_'+temp.key).text('Now open, '+temp.timeStart+'-'+temp.timeEnd);
                $('#badgeinterest_'+temp.key).text(getTimeInterest(temp))
                break;
            case 'OfficeRicci':
                console.log(temp.name)
                $('#timeinterest_'+temp.key).text('Prof. Ricci available for '+temp.name+' at ' +temp.timeStart+'-'+temp.timeEnd);
                $('#badgeinterest_'+temp.key).text(getTimeInterest(temp))

                break;
            case 'OfficeMirri':
                $('#timeinterest_'+temp.key).text('Prof.ssa Mirri available for '+temp.name+' at ' +temp.timeStart+'-'+temp.timeEnd);
                $('#badgeinterest_'+temp.key).text(getTimeInterest(temp))

                break;
            case 'OfficeDidattica':
                $('#timeinterest_'+temp.key).text('Help Desk available at ' +temp.timeStart+'-'+temp.timeEnd);
                $('#badgeinterest_'+temp.key).text(getTimeInterest(temp))

                break;
        }



    }
    else{
        switch(temp.key){
            case 'Biblioteca':
                $('#timeinterest_'+temp.key).text('Next time open: '+day+' at '+temp.timeStart)
                $('#badgeinterest_'+temp.key).text(getTimeInterest(temp))

                break;
            case 'OfficeRicci':
                $('#timeinterest_'+temp.key).text('Next time Prof.Ricci available on: '+day+' at '+temp.timeStart)
                $('#badgeinterest_'+temp.key).text(getTimeInterest(temp))

                break;
            case 'OfficeMirri':
                $('#timeinterest_'+temp.key).text('Next time Prof.Mirri available on: '+day+' at '+temp.timeStart)
                $('#badgeinterest_'+temp.key).text(getTimeInterest(temp))

                break;
            case 'OfficeDidattica':
                $('#timeinterest_'+temp.key).text('Next Time Help Desk available on: '+day+' at ' +temp.timeStart+'-'+temp.timeEnd);
                $('#badgeinterest_'+temp.key).text(getTimeInterest(temp))

                break;
        }


    }

    //$('#timeinterest_'+temp.key)

}

function getTimeInterest(dailyAction){


    var date=new Date()
    var currentHour=date.getHours()
    var currentMinute=date.getMinutes()   
    var timeToSplitStart=dailyAction.timeStart.split(':',2)
    var timeToSplitEnd=dailyAction.timeEnd.split(':',2)
    var hourEnd=timeToSplitEnd[0]
    var minuteEnd=timeToSplitEnd[1]
    //console.log(timeToSplit)
    var hourStart=timeToSplitStart[0]
    //console.log(hourStart)
    var minuteStart=timeToSplitStart[1]
    var timeDiffCurrentStart=hourStart-currentHour
    var timeDiffCurrentEnd=hourEnd-currentHour
    var timeDiffCurrentMinuteStart=minuteStart-currentMinute
    var timeDiffCurrentMinuteEnd=minuteEnd-currentMinute


    var absHourStart=Math.abs(timeDiffCurrentStart)
    var isLessonOver=hourEnd-currentHour<0 && minuteEnd<currentMinute
    if(dailyAction.dayValue-date.getDay()==1){
        //var time=lessonDayValue-date.getDay()+' days hence'
        return 'Tomorrow'
    }
    else if(dailyAction.dayValue-date.getDay()>0){
        var time=dailyAction.dayValue-date.getDay()+' days hence'
        return time
    }
    else if(dailyAction.dayValue-date.getDay()<0){
        var time=7-(date.getDay()-dailyAction.dayValue)+' days hence'
        return time
    }
    else if(dailyAction.dayValue-date.getDay()==0 && hourEnd<=currentHour && minuteEnd<=currentMinute){

        var time=7-(date.getDay()-dailyAction.dayValue)+' days hence'
        return time


    }
    else{
        switch(absHourStart){
            case 0:
                if(timeDiffCurrentMinuteStart>=0){ //minuto di inizio meno corrente

                    return timeDiffCurrentMinuteStart+' minutes hence'
                }
                else{

                    return Math.abs(timeDiffCurrentMinuteStart)+' minutes  ago'
                }
            case 1:
                console.log(dailyAction.key+' '+dailyAction.timeStart)

                if(timeDiffCurrentMinuteStart>=0 && timeDiffCurrentStart>0){

                    return timeDiffCurrentStart+':' +setMinuteStraight(timeDiffCurrentMinuteStart)+' hence'
                }
                if(timeDiffCurrentMinuteStart>=0 && timeDiffCurrentStart<0){
                    var minuteNumb=new Number(minuteStart)

                    return setMinuteStraight(60-minuteNumb+currentMinute)+' minutes ago'
                }
                if(timeDiffCurrentMinuteStart<0 && timeDiffCurrentStart<0){
                    return Math.abs(timeDiffCurrentStart)+':'+setMinuteStraight(Math.abs(timeDiffCurrentMinuteStart))+' hours  ago'
                }
                if(timeDiffCurrentMinuteStart<0 && timeDiffCurrentStart>0){
                    var minuteNumb=new Number(minuteStart)
                    return setMinuteStraight(Math.abs(60-minuteNumb+currentMinute))+' minutes  hence'
                }
            default:
                if(timeDiffCurrentMinuteStart>=0 && timeDiffCurrentStart>0 && !isLessonOver){

                    return timeDiffCurrentStart+':' +setMinuteStraight(timeDiffCurrentMinuteStart)+' hence'
                }
                if(timeDiffCurrentMinuteStart>=0 && timeDiffCurrentStart<0 && !isLessonOver){
                    return Math.abs(timeDiffCurrentStart)-1+':'+setMinuteStraight(60-minuteStart+currentMinute)+' hours ago'
                }
                if(timeDiffCurrentMinuteStart<0 && timeDiffCurrentStart<0 && !isLessonOver){
                    return Math.abs(timeDiffCurrentStart)+':'+setMinuteStraight(Math.abs(timeDiffCurrentMinuteStart))+' hours ago'
                }
                if(timeDiffCurrentMinuteStart<0 && timeDiffCurrentStart>0 && !isLessonOver){
                    return Math.abs(timeDiffCurrentStart)-1+':'+setMinuteStraight(60-currentMinute+minuteStart)+' hours hence'
                }
        }

    }
}
function setMinuteStraight(minute){
    return minute<10?'0'+minute:minute
}
function listClassrooms(){
    $('.list-group-item-classrooms').remove()
    database.ref('CesenaCampus/').on('child_added',childsnapshot=>{

        var key=childsnapshot.key

        if(key!='Corsi' && key!='name') {
            var listGroupClassrooms=$('#classrooms_list')
            var classroomName=childsnapshot.child('name').val()
            if(classroomName=="Laboratorio Informatico 2" && $(window).width()<768){
                classroomName='Lab. Inf. 2'
            }
            if(classroomName=="Laboratorio Informatico 3" && $(window).width()<768){
                classroomName='Lab. Inf. 3'
            } 

            var domToAdd
            if($(window).width()>768){
                domToAdd='<li class="list-group-item list-group-item-classrooms flex-column align-items-start " id="li_'+key+'"><div class="d-flex w-100 justify-content-between"><div class="row justify-content-start" style="max-width: 900px;"><div class="col-auto" ><p class="mb-1 display-4 place_name" >'+classroomName+'</p></div><div class="col-auto" style="padding-left: 0px;"> <img  class=" d-block mx-auto" src="css/assets/information.svg" data-toggle="tooltip" data-placement="right" title="Click for more info" style="width: 15px; height: 15px;" id="info_'+key+'"></div></div><span class="badge badge-pill badge-info" style="height: 17px;" id="badge_'+key+'"></span></div><div class=" row justify-content-start" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto col-center "><img  class="icon d-block mx-auto" src="css/assets/lesson.svg" ></div><div class="col-4 col-center" style="max-width:280px"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="lesson_'+key+'" ></p></div><div class="col-auto col-center   " style="margin-left:30px"><img  class="icon d-block mx-auto" src="css/assets/clock.svg" ></div>    <div class="col-auto col-center "><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="time_'+key+'"></p></div></div></li>'

            }
            else{
                domToAdd='<li class="list-group-item list-group-item-classrooms flex-column align-items-start " id="li_'+key+'"><div class="d-flex justify-content-between"><div class="row justify-content-start" style="width: 500px;"><div class="col-auto" ><p class="mb-1 display-4 place_name" >'+classroomName+'</p></div><div class="col-auto"   style="padding-left: 0px;"><img  class=" d-block mx-auto" src="css/assets/information.svg"  style="width: 15px; height: 15px;" id="info_'+key+'"></div></div><span class="badge badge-pill badge-info" id="badge_'+key+'" style="height: 17px;"></span></div><div class=" row justify-content-center" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto col-dir  no-gutters" style="max-width: 70px;" ><img  class="icon d-block mx-auto" src="css/assets/lesson.svg" ></div>    <div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="lesson_'+key+'" ></p></div></div><div class=" row justify-content-center" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto col-dir  no-gutters" style="max-width: 70px;" ><img  class="icon d-block mx-auto" src="css/assets/clock.svg" ></div>    <div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="time_'+key+'" ></p></div></div></li>'

            }

            listGroupClassrooms.append(domToAdd)
            $('.loader-classes').remove()


            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })


            var lessonsPerClassroom=[]
            setCurrentOrNextLesson(lessonsPerClassroom,key,classroomName)
        }
    })




}

function checkTimeAndLesson(){
    console.log(new Date().getSeconds())
    database.ref('CesenaCampus/').on('child_added',childsnapshot=>{
        var classroomName=childsnapshot.child('name').val()
        var key=childsnapshot.key
        var lessonsPerClassroom=[]

        setCurrentOrNextLesson(lessonsPerClassroom,key,classroomName)
    })

}
function setCurrentOrNextLesson(lessonsPerClassroom,classroomKey,classroomName){
    database.ref('CesenaCampus/Corsi/').once('value').then(lessons=>{
        // alert(lessonSnapshot.key)

        lessons.forEach(function(lessonSnapshot){ 


            var lessonName=lessonSnapshot.child('name').val()
            var teacher=lessonSnapshot.child('teacher').val()
            //console.log(lessonName.val())
            var scheduleChild=lessonSnapshot.child('schedule')
            scheduleChild.forEach(daysSnapshot=>{
                var lessonClassroom=daysSnapshot.child('place').val()
                var timeStart=daysSnapshot.child('timeStart').val()
                var timeEnd=daysSnapshot.child('timeEnd').val()
                var dayValue=daysSnapshot.child('value').val()


                var date=new Date()
                if(lessonClassroom==classroomKey){//controllo se la lezione è nella classe indicata dalla chiave
                    var place={
                        'lessonName':lessonName,
                        'timeStart':timeStart,
                        'timeEnd':timeEnd,
                        'dayValue':dayValue,
                        'day':daysSnapshot.key,
                        'place':lessonClassroom,
                        'teacher':teacher,
                        'name':lessonName


                    }
                    lessonsPerClassroom.push(place)
                }


            })

            if(lessonsPerClassroom.length>0)
                getLesson(lessonsPerClassroom,classroomKey)

        })




    })
}



function getLesson(lessonsPerClassroom,id){
    var date=new Date()
    var currentHour=date.getHours()
    var currentDay=date.getDay()
    var temp=lessonsPerClassroom[0]


    for(var i=0;i<lessonsPerClassroom.length;i++){


        var dayDifference=lessonsPerClassroom[i].dayValue-temp.dayValue

        var timeDiffStart1= Math.abs(lessonsPerClassroom[i].timeStart-currentHour)
        var timeDiffStart2= Math.abs(temp.timeStart-currentHour)
        var lessonToCompare=lessonsPerClassroom[i]
        var dayDiff1=lessonToCompare.dayValue-currentDay
        var dayDiff2=temp.dayValue-currentDay

        //caso in cui temp è oggi, ma è già finità la lezione
        if(temp.dayValue==currentDay && temp.timeEnd<currentHour){
            temp=lessonToCompare
        }
        //caso in cui sono entrambe lo stesso giorno ma una l'altra inizia prima di temp con la condizione che time end > current hour
        if(dayDifference==0 && timeDiffStart2>timeDiffStart1 && lessonToCompare.timeEnd>currentHour ){
            temp=lessonToCompare
        }
        //caso in cui sono dello stesso giorno ma non quello corrente devo confrontare solo chi ha starttime più piccolo
        else if(dayDifference==0 && temp.dayValue!=currentDay && lessonToCompare.timeStart-temp.timeStart<0){
            temp=lessonToCompare
        }
        // caso in cui lesson to compare è oggi e temp no
        else if(lessonToCompare.dayValue==currentDay && temp.dayValue!=currentDay && lessonToCompare.timeEnd>currentHour){
            temp=lessonToCompare
        }
        //caso in cui nessuna delle due è oggi, devo prendere quella più vicino

        //se una differenza è < 0 e l'altra no prendo quella positiva
        else if(temp.dayValue-currentDay<0 && lessonToCompare.dayValue-currentDay>0){
            temp=lessonToCompare
        }
        // in tutti gli altri casi devo sempre prendere quella più piccola
        else if(dayDiff1<dayDiff2 && dayDiff1>0){
            temp=lessonToCompare
        }




    }

    var isLessonGoingAndToday=currentHour>= temp.timeStart && temp.timeEnd>currentHour && temp.dayValue==currentDay
    var dayString=temp.dayValue==currentDay?'Today':renderDay(temp.dayValue)
    var time=temp.timeStart.toString()+':00'
    $('#time_'+id).text(dayString+', '+time)
    var text=isLessonGoingAndToday?'Current lesson: '+temp.lessonName:'Next Lesson: '+temp.lessonName
    $('#lesson_'+id).text(text)
    $('#badge_'+id).text(getTime(temp.timeStart,temp.timeEnd,id,temp.dayValue))
    localStorage.setItem('todayClass_'+id,JSON.stringify(temp))

    $('#li_'+id).click(function(){
        var value=JSON.parse(localStorage.getItem('todayClass_'+id))
        localStorage.setItem('todayClass',JSON.stringify(value))
        location.replace('ClassDetailed.html')
    })

    $('#info_'+id).click(function(){
        var value=JSON.parse(localStorage.getItem('todayClass_'+id))
        localStorage.setItem('todayClass',JSON.stringify(value))
        location.replace('ClassDetailed.html')
    })
}
function getTime(timeStart,timeEnd,id,lessonDayValue){

    var date=new Date()
    var currentHour=date.getHours()
    var currentMinute=date.getMinutes()
    var timeDifference=currentHour-timeStart.toString().split(":",1)
    var minuteToPrint1=currentMinute<10?'0'+currentMinute:currentMinute
    var minuteToPrint2=60-currentMinute<10?'0'+(60-currentMinute):60-currentMinute
    var timeToPrint= timeDifference>0?(currentHour-timeStart)+':'+minuteToPrint1+' hours ago':(Math.abs(timeDifference)-1).toString()+':'+minuteToPrint2.toString()+' hours hence'


    // alert(timeDifference)
    var abs=Math.abs(timeDifference)
    if(lessonDayValue-date.getDay()==1){
        //var time=lessonDayValue-date.getDay()+' days hence'
        return 'Tomorrow'
    }
    else if(lessonDayValue-date.getDay()>0){
        var time=lessonDayValue-date.getDay()+' days hence'
        return time
    }
    else if(lessonDayValue-date.getDay()<0){
        var time=7-(date.getDay()-lessonDayValue)+' days hence'
        return time
    }
    else if(lessonDayValue-date.getDay()==0 && timeEnd<=currentHour){

        var time=7-(date.getDay()-lessonDayValue)+' days hence'
        return time


    }
    else{
        switch(Math.abs(timeDifference)){
            case 0:
                //$('#badge_'+id).text(currentMinute+' minutes ago')
                return currentMinute+' minutes ago'



                break;
            case 1:
                if(timeDifference<0 && currentMinute>0){
                    return 60-currentMinute+' minutes hence'

                }
                if(timeDifference>0){
                    return timeToPrint
                    
                }
                break;
            default:
                //$('#badge_'+id).text(timeToPrint)

                return timeToPrint

                break;

        }

    }


}


function renderDay(dayNumber){

    switch(dayNumber){
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
}
function getUrlImage(type){
    switch(type){
        case 'biblioteca':
            return 'css/assets/library.svg'
        case 'recreation':
            return 'css/assets/vending-machine.svg'
        case 'office':
            return 'css/assets/office.svg'

    }
}
function getClassroomDirections(key){
    var directionDiv=$('#directioncollapse'+key)


    if(directionDiv.children().length==0){

        var database = firebase.database();
        database.ref('otherplaces/'+key+'/directions/').on('value',function (snapshot){
            var newRow='<div class="row justify-content-center " style="margin-top: 50px;" ></div>'
            var firstDirection='<div class="col-3 icon_wrapper justify-content-center align-self-center" style="margin-left: 30px; margin-top:30px" ><img class="icon" src="css/assets/entrance.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left "style="color: white;">Walk through the main gate</p></div>'
            directionDiv.append(newRow)
            var row=directionDiv.find('.row').last()
            row.append(firstDirection)
            snapshot.forEach(function(childSnapshot){
                var directionKey=childSnapshot.key

                if(directionKey.includes('left')){
                    var row=directionDiv.find('.row').last()
                    if(row.children().length==2){
                        directionDiv.append(newRow)
                        row=directionDiv.find('.row').last()
                        var cols='<div class="col-3 icon_wrapper justify-content-center align-self-center" style="margin-left: 30px; margin-top:30px"><img  class="icon" src="css/assets/left.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left "  style="color: white;">'+childSnapshot.val().toString()+'</p></div>'
                        row.append(cols)

                    }
                    else{
                        var cols='<div class="col-3 icon_wrapper justify-content-center align-self-center" style="margin-left: 30px; margin-top:30px"><img  class="icon" src="css/assets/left.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left "  style="color: white;">'+childSnapshot.val().toString()+'</p></div>'
                        row.append(cols) 
                    }
                }

                if(directionKey.includes('stairsup')){
                    var row=directionDiv.find('.row').last()
                    if(row.children().length==2){
                        directionDiv.append(newRow)
                        row=directionDiv.find('.row').last()
                        var cols='<div class="col-3 icon_wrapper justify-content-center align-self-center" style="margin-left:30px; margin-top:30px"><img  class="icon" src="css/assets/stairs-up.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left "  style="color: white;">'+childSnapshot.val().toString()+'</p></div>'
                        row.append(cols)

                    }
                    else{
                        var cols='<div class="col-3 icon_wrapper justify-content-center align-self-center" style="margin-left: 30px; margin-top:30px"><img  class="icon" src="css/assets/stairs-up.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left "   style="color: white;">'+childSnapshot.val().toString()+'</p></div>'
                        row.append(cols) 
                    }
                }
                if(directionKey.includes('final')){
                    var row=directionDiv.find('.row').last()
                    if(row.children().length==2){
                        directionDiv.append(newRow)
                        row=directionDiv.find('.row').last()
                        var cols='<div class="col-3 icon_wrapper justify-content-center align-self-center" style="margin-left: 30px; margin-top:30px"><img  class="icon" src="css/assets/destination.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left "  style="color: white;">'+childSnapshot.val().toString()+'</p></div>'
                        row.append(cols)

                    }
                    else{
                        var cols='<div class="col-3 icon_wrapper justify-content-center align-self-center" style="margin-left: 30px; margin-top:30px"><img  class="icon" src="css/assets/destination.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left "   style="color: white;">'+childSnapshot.val().toString()+'</p></div>'
                        row.append(cols) 
                    }
                }
                if(directionKey.includes('straight')){
                    var row=directionDiv.find('.row').last()
                    if(row.children().length==2){
                        directionDiv.append(newRow)
                        row=directionDiv.find('.row').last()
                        var cols='<div class="col-3 icon_wrapper justify-content-center align-self-center" style="margin-left: 30px; margin-top:30px"><img  class="icon" src="css/assets/up.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left "  style="color: white;">'+childSnapshot.val().toString()+'</p></div>'
                        row.append(cols)

                    }
                    else{
                        var cols='<div class="col-3 icon_wrapper justify-content-center align-self-center" style="margin-left: 30px; margin-top:30px"><img  class="icon" src="css/assets/up.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left "   style="color: white;">'+childSnapshot.val().toString()+'</p></div>'
                        row.append(cols) 
                    }
                }
                if(directionKey.includes('right')){
                    var row=directionDiv.find('.row').last()
                    if(row.children().length==2){
                        directionDiv.append(newRow)
                        row=directionDiv.find('.row').last()
                        var cols='<div class="col-3 icon_wrapper justify-content-center align-self-center" style="margin-left: 30px; margin-top:30px"><img  class="icon" src="css/assets/right.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left "  style="color: white;">'+childSnapshot.val().toString()+'</p></div>'
                        row.append(cols)

                    }
                    else{
                        var cols='<div class="col-3 icon_wrapper justify-content-center align-self-center" style="margin-left: 30px; margin-top:30px"><img  class="icon" src="css/assets/right.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left "   style="color: white;">'+childSnapshot.val().toString()+'</p></div>'
                        row.append(cols)    
                    }
                }
            })
            var width=$(window).width()

            resize(width)

        })



    }
}
function resize(width){

    if(width>=1000){
        var title=jQuery('.title')



        if(title.hasClass('display-3')){

            title.removeClass('display-3')
            title.addClass('display-2')
        }




    }
    if(width>=768 && width<1000){
        var title=jQuery('.title')

        if(title.hasClass('display-2')){
            title.removeClass('display-2')
            title.addClass('display-3')
        }
        else{
            title.removeClass('display-4')
            title.addClass('display-3')
        }


    }
    if(width<768){
        var title=jQuery('.title')

        if(title.hasClass('display-3')){
            title.removeClass('display-3')
            title.addClass('display-4')
        }
        if(title.hasClass('display-2')){
            title.removeClass('display-2')
            title.addClass('display-4')
        }


    }
    var button=jQuery('.btn')
    if(width<400 && button.hasClass('btn-lg')){

        button.removeClass('btn-lg')

    }
    else if(width>400 && !button.hasClass('btn-lg')){
        button.addClass('btn-lg')
    }
    var formInput=$('.form-control')
    if(width<400 && formInput.hasClass('form-control-lg')){
        formInput.removeClass('form-control-lg')
    }
    else if(width>400 && !formInput.hasClass('form-control-lg')){
        formInput.addClass('form-control-lg')
    }

}