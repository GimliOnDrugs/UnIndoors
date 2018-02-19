


importScripts("https://www.gstatic.com/firebasejs/4.9.0/firebase.js")
var config = {
    apiKey: "AIzaSyAiVwf9orhjqFyH6i4HBSmmaZuLwrJyZnQ",
    authDomain: "uniboindoors.firebaseapp.com",
    databaseURL: "https://uniboindoors.firebaseio.com",
    projectId: "uniboindoors",
    storageBucket: "uniboindoors.appspot.com",
    messagingSenderId: "484831871025"
};
firebase.initializeApp(config);
var database=firebase.database()


self.onmessage=function(msg){
    firebase.auth().signInWithEmailAndPassword('giacomo@operatore.com','metallaro93').then(success=>{
        updateCurrentLesson()
        console.log('updater called at '+new Date().getSeconds())

    })
}

function updateCurrentLesson(){

    database.ref('CesenaCampus/').on('child_added',childsnapshot=>{
        var key=childsnapshot.key



        var lessonsPerClassroom=[]
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
                    if(lessonClassroom==key){//controllo se la lezione è nella classe indicata dalla chiave
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

                if(lessonsPerClassroom.length>0){
                    getLesson(lessonsPerClassroom,key)

                }

            })




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

    var islessonCurrent=temp.dayValue!=currentDay || temp.timeEnd<currentHour?'Next':'Current'
    database.ref('CesenaCampus/'+temp.place+'/').child('lesson').set({
        'lessonName':temp.lessonName,
        'state':islessonCurrent,
        'teacher':temp.teacher,
        'timeStart':temp.timeStart,
        'timeEnd':temp.timeEnd,
        'dayValue':temp.dayValue
    }).then(success=>{
        var debug={
            'lessonName':temp.lessonName,
            'state':islessonCurrent,
            'teacher':temp.teacher,
            'timeStart':temp.timeStart,
            'timeEnd':temp.timeEnd,
            'dayValue':temp.dayValue
        }
        console.log(debug)
    })


}