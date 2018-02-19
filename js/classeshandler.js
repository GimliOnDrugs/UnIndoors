

var database = firebase.database();
//var carouselInnerActiveElementRow=document.getElementById('row_active');
var carouselInnerElementToday=document.getElementById('today_classes_inner');
var carouselOuterElementToday=document.getElementById('carousel_today_classes');
var carouselInnerElementWeek=document.getElementById('week_classes_inner');
var carouselOuterElementWeek=document.getElementById('carousel_week_classes')
var carouselNotActiveItemNumber=0;
var rowIDNumber=0;
var todayClassesCarouselSlide=document.getElementById('carouselExampleControls');
var classChosen;
var lessons=[]
var detailedClass
var key=10000
var pageWidth=$(window).width()





function setUpTodayClasses(size) {
    console.log('CALLED')
    var date = new Date();
    var today = date.getDay();

    database.ref('CesenaCampus/Corsi/').on('value',function (snapshot) {


        snapshot.forEach(function (childSnapshot) {
            var lessonName=childSnapshot.child('name').val().toString();


            childSnapshot.child('schedule').ref.once('value').then(function (scheduleSnapshot) {
                var dayoflessons=[]
                scheduleSnapshot.forEach(function (daySnapshot) {
                    //  console.log('array size ',dayoflessons.length)

                    var dayNumber = daySnapshot.child('value').val();
                    //    console.log(daySnapshot.child('timeStart').val().toString())
                    var todayClass = {
                        lessonkey:childSnapshot.key,
                        name: lessonName,
                        timeStart: daySnapshot.child('timeStart').val().toString(),
                        timeEnd: daySnapshot.child('timeEnd').val().toString(),
                        place: daySnapshot.child('place').val().toString(),
                        imageUrl:renderLessonImage(lessonName),
                        teacher:childSnapshot.child('teacher').val().toString(),
                        numberOfDay:dayNumber,
                        day:daySnapshot.key,
                        type:childSnapshot.child('type').val().toString()

                    }
                    dayoflessons.push(todayClass)
                    lessons.push(todayClass)




                    if (dayNumber == today) {

                        if(size>=768 && size<1000){
                            fillCarouselRow(todayClass,'#today_classes_inner','#carousel_today_classes',2);
                        }
                        if(size<768){
                            fillCarouselRow(todayClass,'#today_classes_inner','#carousel_today_classes',1);
                        }
                        if(size>=1000){
                            fillCarouselRow(todayClass,'#today_classes_inner','#carousel_today_classes',3);
                        }



                    }
                    if(dayoflessons.length==scheduleSnapshot.numChildren()){

                        var closest=getClosestLesson(dayoflessons,today)
                        for(var i=0;i<closest.length;i++){
                            if(size>=768 && size<1000){
                                fillCarouselRow(closest[i],'#next_classes_inner','#carousel_next_classes',2);
                            }
                            if(size<768){
                                fillCarouselRow(closest[i],'#next_classes_inner','#carousel_next_classes',1);
                            }
                            if(size>=1000){
                                fillCarouselRow(closest[i],'#next_classes_inner','#carousel_next_classes',3);
                            }
                        }
                    }






                    if(size>768 && size<1000){
                        fillCarouselRow(todayClass,'#week_classes_inner','#carousel_week_classes',2);
                    }
                    if(size<=768){
                        fillCarouselRow(todayClass,'#week_classes_inner','#carousel_week_classes',1);
                    }
                    if(size>=1000){
                        fillCarouselRow(todayClass,'#week_classes_inner','#carousel_week_classes',3);
                    }


                });


            });

        });
        $('.loader-classes').remove()
        var footer= $('.footer')
        if(footer.children().length==0){
            footer.append('<div class="container-fluid" ><div class="row align-items-center" ><div class="col"></div><div class="col-auto "><div class="container " ><img class="d-block my-auto" height="80" width="200" src=logo.png><h6 style="color:white; font-weight:100;">2018 - All rights reserved &copy;</h6></div></div><div class="col"></div></div></div>')
        }


    });


}

function getClosestLesson(lessons,today){

    var arrayForDisplayNextLessons=[]
    // console.log(lessons)
    var temp=lessons[0].numberOfDay-today
    arrayForDisplayNextLessons.push(lessons[0])

    for(var i=1;i<lessons.length;i++){
        var day=lessons[i]
        var diff=day.numberOfDay-today
        if(temp==0){
            arrayForDisplayNextLessons.pop()
        }
        if(diff>=0 && temp>=0 && diff < temp && day.numberOfDay!=today){

            temp=diff;
            arrayForDisplayNextLessons.pop()
            arrayForDisplayNextLessons.push(lessons[i])

        }


        if(diff<=0 && temp<=0 && diff<temp && day.numberOfDay!=today){

            temp=diff;
            arrayForDisplayNextLessons.pop()
            arrayForDisplayNextLessons.push(lessons[i])

        }

    }
    return arrayForDisplayNextLessons;

}


function shuffleArray(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}







function renderLessonImage(lessonName){
    switch(lessonName){
        case 'Data Mining':
            return 'css/assets/data_mining.svg';
        case 'Machine Learning':
            return 'css/assets/machine_learning.svg';
        case 'Sviluppo di Sistemi Software':
            return 'css/assets/development.svg';
        case 'Applicazioni Web':
            return 'css/assets/web_development.svg';
        case 'Big Data':
            return 'css/assets/big_data.svg';
        case  'Business Intelligence':
            return 'css/assets/business_intelligence.svg';
        case 'Nets Security':
            return 'css/assets/security.svg';
        case 'Pervasive Computing':
            return 'css/assets/internetofthings.svg';
        case 'Distributed Systems':
            return 'css/assets/distributed_systems.svg';
        case 'Information Systems':
            return 'css/assets/sistemi_informativi.svg';
        case 'Robotic Systems':
            return 'css/assets/robots.svg'
        case 'Smart City':
            return 'css/assets/digital-cities.svg';
        case 'Supporto alle Decisioni':
            return 'css/assets/supporto_alle_decisioni.svg';
        default: return null;



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

function fillCarouselRow(todayClass,carouselInnerElementID,carouselOuterElementID,numberOfImagesPerSlide){
    var name=todayClass.name;
    var imageUrl=todayClass.imageUrl;
    var timeStart=todayClass.timeStart;
    var timeEnd=todayClass.timeEnd;
    var place=todayClass.place;
    var row;
    var innerElement=$(carouselInnerElementID)
    var date=new Date()
    var day=todayClass.day.toUpperCase()==renderDay(date.getDay()).toUpperCase()?'Today':todayClass.day;
    var uniqid = Date.now()

    var elementOfRow='<div class="col col-grid"><div class="card" id="'+todayClass.type+uniqid+'" onclick="onCardClicked(\''+todayClass.lessonkey+'\',\''+todayClass.day+'\',\''+name+'\',\''+todayClass.teacher+'\',\''+day+'\')"><img class="card-img-top" src="'+imageUrl+'" alt="Card image cap"><div class="card-body"> <h4 class="card-title text-center">'+name+'</h4><div class="container adjust items center" style="margin-top:10px"><div class="row align-items-center align-self-center style="margin-top:15px;"><div class="col-4 justify-content-center align-self-center icon_wrapper " ><img class="rounded float-right" src="css/assets/clock.svg" style="display:block;width:30px; height: 30px;" id="clock"></div><div class="col no-gutters align-self-center justify-content-center"  ><p class="detail my-auto text-left text-capitalize" id="time_and_day" style="color: black; font-size:20px">'+day+', '+timeStart+':00</p></div></div></div></div></div></div>';
    if(innerElement.children().length==0){
        var carouselItem=$('<div class="carousel-item" id="'+carouselOuterElementID+'" ></div>').appendTo(innerElement)     
        row=$('<div class="row row-grid"></div>').appendTo(carouselItem)        
        carouselItem.addClass('active')

    }
    row=innerElement.find('.row-grid').last()

    if(row.children().length==numberOfImagesPerSlide){
        carouselItem=$('<div class="carousel-item" id="'+carouselOuterElementID+'" ></div>').appendTo(innerElement)     
        row=$('<div class="row row-grid"></div>').appendTo(carouselItem)

    }
    row.append(elementOfRow)


    var id="#"+todayClass.type+uniqid;
    //    $(id).bind('click',function(){
    //            console.log('before '+todayClass.place+' '+todayClass.name)
    //            localStorage.removeItem('todayClass')
    //            localStorage.setItem('todayClass',JSON.stringify(todayClass))
    //    
    //            location.replace('ClassDetailed.html')        
    //
    //    })


}



function onCardClicked(lessonkey,day,lessonName,teacher,dayOfWeek){

    database.ref('CesenaCampus/Corsi/'+lessonkey+'/schedule/'+day+'/').once('value').then(snap=>{

        var dayNumber = snap.child('value').val();
        //    console.log(daySnapshot.child('timeStart').val().toString())

        var todayClass = {
            name: lessonName,
            timeStart: snap.child('timeStart').val().toString(),
            timeEnd: snap.child('timeEnd').val().toString(),
            place: snap.child('place').val().toString(),
            imageUrl:renderLessonImage(lessonName),
            teacher:teacher,
            numberOfDay:dayNumber,
            day:dayOfWeek,

            //type:childSnapshot.child('type').val().toString()

        }
        console.log('before '+todayClass.place+' '+todayClass.name)
        localStorage.removeItem('todayClass')
        localStorage.setItem('todayClass',JSON.stringify(todayClass))

        location.replace('ClassDetailed.html')        

    })
}
function getCarouselItems(carouselInnerElementID){
    var rowElements=[]

    $(carouselInnerElementID).find('.carousel-item').each(function(){
        $(this).find('.row-grid').each(function(){
            $(this).find('.col-grid').each(function(){
                rowElements.push($(this))
            })

        })
    })

    return rowElements;

}


function resizeAlgorithm(numberOfItemsPerSlide,rowElements,carouselInnerElementID,carouselOuterElementID){

    $(carouselInnerElementID).empty()

    for(var i=0;i<rowElements.length;i++){

        if(i%numberOfItemsPerSlide==0){
            var carouselItem=$('<div class="carousel-item"></div>').appendTo(carouselInnerElementID)
            var itemContent=$('<div class="row row-grid"></div>').appendTo(carouselItem)


            }
        if(i==0){

            carouselItem.addClass('active')

        }




        itemContent.append(rowElements[i])


    }


}



function setClassDetailedInfo(name){
    localStorage.setItem('todayclass',JSON.stringify(name))
    // location.replace("ClassDetailed.html");

}



function resize(width){
    if(width>=1000){
        var title=jQuery('.title')
        var col=jQuery('.col-dir')



        if(title.hasClass('display-3')){

            title.removeClass('display-3')
            title.addClass('display-2')
        }
        if(col.hasClass('col-4')){
            col.removeClass('col-4')
            col.addClass('col-2 ')
        }



    }
    if(width>=768 && width<1000){
        var title=jQuery('.title')
        var col=jQuery('.col-dir')

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
        var col=jQuery('.col-dir')

        if(title.hasClass('display-3')){
            title.removeClass('display-3')
            title.addClass('display-4')
        }
        if(title.hasClass('display-2')){
            title.removeClass('display-2')
            title.addClass('display-4')
        }
        if(col.hasClass('col-2')){
            col.removeClass('col-2')
            col.addClass('col-3 ')
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











