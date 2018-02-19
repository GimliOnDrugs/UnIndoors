


function setNewLayout(){
    var width=$(window).width()
    var container= $('#detailcontainer')
    container.contents(':not(h1)').remove();
    var row=' <div class=" row justify-content-center" style="margin-top: 30px;" >'
    if(width<990){

        console.log(width)
        var classToAppend='<div class=" row justify-content-center" style=" margin-top: 50px;" id="class_and_time"><div class="col-4 col-dir icon_wrapper justify-content-center align-self-center" style="margin-left: 50px; margin-top:30px"><img  class="icon" src="css/assets/classroom.svg" ></div><div class="col col-dir align-self-center " style="margin-top: 30px;" ><div class="loader d-block mx-auto my-auto"  ></div><p class="detail display-4 text-left text-capitalize " id="classroom_name" style="color: white;"></p></div>'
        var clock=' <div class="col-4 col-dir  justify-content-center align-self-center icon_wrapper"  style="margin-left:50px; margin-top:30px"><img  class="icon" src="css/assets/clock.svg" ></div><div class="col col-dir  align-self-center "  style=" margin-top: 30px;"><div class="loader d-block mx-auto my-auto"  ></div><p class="detail  display-4 text-left text-capitalize" id="time_and_day" style="color: white;"></p></div>'
        var teacher='<div class="col-4 col-dir justify-content-center align-self-center icon_wrapper "style="margin-left:50px; margin-top:30px"><img  class="icon"  src="css/assets/teacher.svg"></div><div class="col col-dir  align-self-center " style="margin-top: 30px;"><div class="loader d-block mx-auto my-auto"  ></div><p class="detail display-4 text-left text-capitalize" id="teacher_name" style="color: white;"></p></div>'
        var handy='<div class="col-4 col-dir  justify-content-center align-self-center icon_wrapper"style="margin-left:50px; margin-top:30px"><img  class="icon" src="css/assets/handicapped.svg" id="handy" ></div><div class="col col-dir  align-self-center " style="margin-top: 30px;"><div class="loader d-block mx-auto my-auto"  ></div><p class="detail display-4 text-left text-capitalize" id="is_friendly" style="color: white;"></p></div><div class="container" id="help_request" style="max-width: 600px; margin-top:30px;"></div>'
        var map='<div class="col-4 col-dir  justify-content-center align-self-center icon_wrapper" style="margin-left:50px; margin-top:0px"><img  class="icon" src="css/assets/map.svg" ></div><div class="col col-dir  align-self-center " style="margin-top: 30px;"><div class="loader d-block mx-auto my-auto"  ></div><p class=" detail display-4 text-left text-capitalize" id="position" style="color: white;"></p></div>'
        var directions='<div class="col-4 col-dir justify-content-center align-self-center icon_wrapper" style="margin-left:50px; margin-top:30px"><img class="icon" src="css/assets/panel.svg" ></div><div class="col col-dir align-self-center " style="margin-top: 30px;"><button type="button" class="btn btn-success btn-lg " id="getdirections" onclick="" data-toggle="collapse" data-target="#directions_container" aria-expanded="false" aria-controls="directions_container">Get directions!</button></div></div>'
        container.append(classToAppend)
        container.append(row)
        var rowAppended=$('#detailcontainer').find('.row').last()
        rowAppended.append(clock)
        container.append(row)
        rowAppended=$('#detailcontainer').find('.row').last()
        rowAppended.append(teacher)
        container.append(row)
        rowAppended=$('#detailcontainer').find('.row').last()
        rowAppended.append(handy)
        container.append(row)
        rowAppended=$('#detailcontainer').find('.row').last()
        rowAppended.append(map)
        container.append(row)
        rowAppended=$('#detailcontainer').find('.row').last()
        rowAppended.append(directions)






    }else{
        console.log('greater  '+width)
        var container= $('#detailcontainer')

        var elements='<div class=" row justify-content-center" style="margin-top: 50px;" id="class_and_time"><div class="col-2 col-dir icon_wrapper justify-content-center align-self-center" style="margin-left: 50px; margin-top:30px"><img  class="icon" src="css/assets/classroom.svg" ></div>    <div class="col col-dir  align-self-center " style="margin-top: 30px;" ><div class="loader d-block mx-auto my-auto"  ></div><p class="detail display-4 text-left text-capitalize " id="classroom_name" style="color: white;"></p></div><div class="col-2 col-dir justify-content-center align-self-center icon_wrapper"  style="margin-left: 50px; margin-top:30px"><img  class="icon" src="css/assets/clock.svg" ></div><div class="col col-dir  align-self-center "  style="margin-top: 30px;"><div class="loader d-block mx-auto my-auto"  ></div><p class="detail  display-4 text-left text-capitalize" id="time_and_day" style="color: white;"></p></div></div><div class="row justify-content-center" ><div class="col-2 col-dir justify-content-center align-self-center icon_wrapper "style="margin-left: 50px; margin-top:30px"><img  class="icon"  src="css/assets/teacher.svg"></div><div class="col col-dir  align-self-center " style="margin-top: 30px;"><div class="loader d-block mx-auto my-auto"  ></div><p class="detail display-4 text-left text-capitalize" id="teacher_name" style="color: white;"></p></div><div class="col-2 justify-content-center align-self-center icon_wrapper col-dir "style="margin-left: 50px; margin-top:30px"><img  class="icon" src="css/assets/handicapped.svg" id="handy" ></div><div class="col col-dir  align-self-center " style="margin-top: 30px;"><div class="loader d-block mx-auto my-auto"  ></div><p class="detail display-4 text-left text-capitalize" id="is_friendly" style="color: white;"></p></div></div><div class="container" id="help_request" style="max-width: 600px; margin-top:30px" ></div><div class="row justify-content-center"><div class="col-2 col-dir justify-content-center align-self-center icon_wrapper" style="margin-left: 50px; margin-top:30px"><img  class="icon" src="css/assets/map.svg" ></div><div class="col col-dir  align-self-center " style="margin-top: 30px;"><div class="loader d-block mx-auto my-auto"  ></div> <p class=" detail display-4 text-left text-capitalize" id="position" style="color: white;"></p></div><div class="col-2 col-dir  justify-content-center align-self-center icon_wrapper" style="margin-left: 50px; margin-top:30px"><img class="icon" src="css/assets/panel.svg" ></div><div class="col col-dir  align-self-center " style="margin-top: 30px;"><button type="button" class="btn btn-success btn-lg " id="getdirections" onclick="" data-toggle="collapse" data-target="#directions_container" aria-expanded="false" aria-controls="directions_container">Get directions!</button></div></div>'

        container.append(elements)
    }
}



function getClassroomDirections(){
    var directionDiv=$('#directions_container')


    if(directionDiv.children().length==0){

        var database = firebase.database();
        var todayClass=JSON.parse(localStorage.getItem('todayClass'))
        var classroomName=todayClass.place
        database.ref('CesenaCampus/'+classroomName+'/directions/').on('value',function (snapshot){
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
            $('.loader').remove()
            resize(width)

        })



    }
}

function getPlaceDetails(todayclass){
    console.log('i was called '+todayclass.place)
    var width=$(window).width()
    database.ref('CesenaCampus/'+todayclass.place+'/').on('value',function (snapshot){
        var name=snapshot.child('name').val().toString()

        if(width<=350 && name=='Laboratorio Informatico 2'){
            name='Lab. Inf. 2'

        }
        if(width<=350 && name=='Laboratorio Informatico 3'){
            name='Lab. Inf. 3'

        }
        $('#classroom_name').text(name)
        $('#position').text(snapshot.child('floor').val().toString())
        var isFriendly=(snapshot.child('isFriendly').val().toString()=='true')
        if(isFriendly)       {
            $('#is_friendly').text('Facilities present')
            $('#handy').unbind('click')
        } 
        else{
            $('#is_friendly').text('Ask for help')
            $('#handy').on('click', function(){
                var helpcontainer=$('#help_request')
                if(helpcontainer.children().length==0){
                    var element='  <form class="needs-validation" novalidate style="margin top:30px;"><div class="form-row" ><div class="col-6"><input type="text" class="form-control form-control-lg" placeholder="Nome Cognome"id="first_name"><div class="invalid-feedback  " >Please insert a valid name and surname</div></div><div class="col"><input type="text" class="form-control form-control-lg" placeholder="14:23" id="time"><div class="invalid-feedback  " >Please insert a valid time</div></div></div><div class="form-row" style="margin-top: 20px;"><div class="col"><textarea class="form-control form-control-lg" id="message" rows="3" placeholder="Write your message" id="message"></textarea></div></div> <div><button type="button" class="btn btn-primary btn-block d-block mx-auto btn-lg" onclick="onClickSubmit()" style="max-width: 200px; margin-top: 20Px;">Submit</button></div></form>'

                    helpcontainer.append(element)
                    resize(width)
                }
            })
            $('#handy').attr('data-toggle','collapse')
            $('#handy').attr('data-target','#help_request')
            $('#handy').attr('aria-expanded','false')
            $('#handy').attr('aria-controls','#help_request')
            $('#handy').css("cursor","pointer")
        }
        $('#teacher_name').text(todayclass.teacher)
        var date = new Date();
        var today = date.getDay();

        if(todayclass.day==today){
            $('#time_and_day').text('Today, '+todayclass.timeStart+":00-"+todayclass.timeEnd+":00")

        }
        else{
            if(width<=350){
                var truncatedDay=todayclass.day.toString().slice(0,3)
                $('#time_and_day').text(truncatedDay+", "+todayclass.timeStart+":00-"+todayclass.timeEnd+":00")
            }
            else{
                $('#time_and_day').text(todayclass.day.toString()+", "+todayclass.timeStart+":00-"+todayclass.timeEnd+":00")

            }
        }
               $('.loader').remove()
        getClassroomDirections()

    })
}

function onClickSubmit(){
    console.log(firebase.auth().currentUser.uid)
    var name=$('#first_name').val()
    var time=$('#time').val()
    var message=$('#message').val()
    var helpRequest = {};
    var id=firebase.auth().currentUser.uid.toString()
    var firebaseTimeStamp=new Date().getMilliseconds()
    var width=$(window).width()
    var regex=/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    var nameRegex=/[a-zA-Z]+/

    if(width<=350 && name=='Laboratorio Informatico 2'){
        name='Lab. Inf. 2'

    }
    if(width<=350 && name=='Laboratorio Informatico 3'){
        name='Lab. Inf. 3'

    }
 database.ref('users/'+id+'/').once('value').then(snap=>{
     if(snap.hasChild('numberofhelprequests')){
         var currentValue=snap.child('numberofhelprequests').val()
        database.ref('users/'+id+'/numberofhelprequests').set(currentValue+1)
     }
     else{
         database.ref('users/'+id+'/numberofhelprequests').set(0)
     }
 })
    

    database.ref('users/'+id+'/helprequests/').once('value').then(function(snapshot){
        if(!snapshot.hasChildren()){
            var date=new Date()
            var minutes=date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()
            var hours=date.getHours()
            var month=date.getMonth()==0?'01':date.getMonth()
            var help={
                10000:{
                    'name':name,
                    'time':time,
                    'message':message,
                    'state': 'pending',
                    'operator_message':'No message yet',
                    'place':$('#classroom_name').text(),
                    'request_time': hours+":"+minutes,
                    'day':date.getDay(),
                    'dayofmonth':date.getDate(),
                    'year':date.getFullYear(),
                    'month':month,
                    'timestamp':firebaseTimeStamp

                }
            }
            var help2={
                'id':id,
                'name':name,
                'time':time,
                'message':message,
                'state': 'pending',
                'place':$('#classroom_name').text(),
                'request_time': hours+":"+minutes,
                'day':date.getDay(),
                'dayofmonth':date.getDate(),
                'year':date.getFullYear(),
                'month':month,
                'index':10000,
                'timestamp':firebaseTimeStamp
            }
            console.log(help)
            database.ref('users/'+id+'/helprequests/').set(help).then(function(){
                $('#help_request').collapse('toggle')
            }) 
            database.ref('helprequests/').push(help2)
        }
        else{
            database.ref('users/'+id+'/helprequests/').orderByKey().limitToFirst(1).once('child_added').then(function(snapshot){

                var lastIndex=snapshot.key
                console.log('last index '+lastIndex)
                var newIndex=Number(lastIndex)-1
                var date=new Date()
                var minutes=date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()
                var hours=date.getHours()
                var month=date.getMonth()==0?'01':date.getMonth()
                var help=
                    {    
                        'name':name,
                        'time':time,
                        'message':message,
                        'state': 'pending',
                        'operator_message':'No message yet',
                        'place':$('#classroom_name').text(),
                        'request_time':hours+":"+minutes,
                        'day':date.getDay(),
                        'dayofmonth':date.getDate(),
                        'year':date.getFullYear(),
                        'month':month,
                        'timestamp':firebaseTimeStamp

                    }
                var help2={
                    'id':id,
                    'name':name,
                    'time':time,
                    'message':message,
                    'state': 'pending',
                    'place':$('#classroom_name').text(),
                    'request_time': hours+":"+minutes,
                    'day':date.getDay(),
                    'dayofmonth':date.getDate(),
                    'year':date.getFullYear(),
                    'month':month,
                    index:newIndex,
                    'timestamp':firebaseTimeStamp
                }

                console.log(help)
                var nameDom= $('#first_name')
                var timeDom=$('#time')
                nameDom.removeClass('is-valid')
                nameDom.removeClass('is-invalid')
                timeDom.removeClass('is-valid')
                timeDom.removeClass('is-invalid')
                if(time.match(regex) && name.match(nameRegex)){
                    database.ref('users/'+id+'/helprequests/').child(newIndex).set(help).then(function(){

                        $('#help_request').collapse('toggle')
                    })
                    database.ref('helprequests/').push(help2)

                }
                else if(!time.match(regex) && name.match(nameRegex)){
                    //    alert('wrong time')

                    $('#first_name').addClass('is-valid')
                    $('#time').addClass('is-invalid')
                }
                else if(time.match(regex) && !name.match(nameRegex)){
                    // alert('wrong name')
                    $('#first_name').addClass('is-invalid')
                    $('#time').addClass('is-valid')
                }
                else if(!time.match(regex) && !name.match(nameRegex)){
                    //  alert('both wrong')
                    $('#first_name').addClass('is-invalid')
                    $('#time').addClass('is-invalid')
                }

            })

        }



    })
}