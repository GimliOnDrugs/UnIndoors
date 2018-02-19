function listenToHelpRequestChanges(){
    var userId;
    var pageWidth=$(window).width()
    $('.jumbotron').remove()
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            database.ref('users/'+user.uid+'/helprequests/').once('value').then(function(snapshot){
                if(snapshot.val()=='empty'){
                    var jumbotronNoMessage='<div class="jumbotron" id="nomessage" style="background-color:#57626E"><h1 class="display-4 text-center text-capitalize" style="color:white;">no help request yet!</h1><img src="css/assets/error-404.svg" class="rounded mx-auto d-block" style="margin-top:30px;width:150px; height:"150px"></div>'
                    $('#help_request_container').append(jumbotronNoMessage)
                    $('.loader').remove()
                    if( $('.footer').children().length==0)

                        $('.footer').append('<div class="container-fluid" ><div class="row align-items-center" ><div class="col"></div><div class="col-auto "><div class="container " ><img class="d-block my-auto" height="80" width="200" src=logo.png><h6 style="color:white; font-weight:100;">2018 - All rights reserved &copy;</h6></div></div><div class="col"></div></div></div>')

                }
            })

            database.ref('users/'+user.uid+'/helprequests/').orderByKey().on('child_added',function(childsnapshot){
                var index=childsnapshot.key
                var domElement='<div class="jumbotron" style="background-color:#57626E" id="jumb_'+index+'"><div class="container"> <div class="row justify-content-center"><div class="col-8 "><h1 class="display-4 text-left detail" style="color:white;">'+renderDay(childsnapshot.child('day').val())+', '+childsnapshot.child('dayofmonth').val()+'/'+childsnapshot.child('month').val()+'/'+childsnapshot.child('year').val()+' at '+childsnapshot.child('request_time').val()+'</h1></div><div class="col-3 "><img src="css/assets/garbage.svg" class="icon-small float-right" id="garbage_'+index+'"></div></div><div class=" row justify-content-center" style="margin-top: 35px; " ><div class="col-2 col-dir align-self-center  icon_wrapper" style="  margin-top:30px"><img  class="icon" src="css/assets/map.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" margin-left ><p class="detail display-4 text-left text-capitalize " id="whereabouts_'+index+'" style="color: white;"></p></div><div class="col-2 align-self-center col-dir icon_wrapper"  style=" margin-top:30px"><img  class="icon" src="css/assets/clock.svg" ></div><div class="col align-self-center "  style="margin-top: 30px;"><p class="detail  display-4 text-left text-capitalize" id="time_'+index+'" style="color: white;"></p></div></div><div class=" row justify-content-center" ><div class="col-2 align-self-center icon_wrapper col-dir" style="margin-top:30px"><img  class="icon" src="css/assets/pending.svg" id="request_icon_'+index+'"></div><div class="col align-self-center no-gutters" style="margin-top: 30px;" ><p class="detail display-4 text-left text-capitalize " id="request_status_'+index+'" style="color: white;"></p></div><div class="col-2 col-dir align-self-center icon_wrapper"  style="margin-top:30px"><img  class="icon" src="css/assets/message.svg" ></div><div class="col align-self-center "  style="margin-top: 30px;"><p class="detail  display-4 text-left" id="operator_message_'+index+'" style="color: white;"></p></div></div></div>'
                $('#nomessage').remove()
                $('.loader').remove()
                if( $('.footer').children().length==0)
                    $('.footer').append('<div class="container-fluid" ><div class="row align-items-center" ><div class="col"></div><div class="col-auto "><div class="container " ><img class="d-block my-auto" height="80" width="200" src=logo.png><h6 style="color:white; font-weight:100;">2018 - All rights reserved &copy;</h6></div></div><div class="col"></div></div></div>')
                $('#help_request_container').append(domElement)
                resizeHelprequests($(window).width())
                $('#garbage_'+index).hover(function(){
                    $(this).attr('src','css/assets/garbage_hover.svg')
                },function(){
                    $(this).attr('src','css/assets/garbage.svg')

                })
                $('#garbage_'+index).click(function(){
                    database.ref('users/'+user.uid+'/helprequests/').once('value').then(function(snapshot){
                        //remove from general helprequests
                        var numChildren=snapshot.numChildren()
                        var timestamp=snapshot.child(index).child('timestamp').val()
                        database.ref('helprequests/').once('value').then(function(snapshot){
                            snapshot.forEach(function(childsnapshot){
                                if(timestamp==childsnapshot.child('timestamp').val() && snapshot.numChildren()==1){
                                    var key=childsnapshot.key
                                    database.ref('helprequests/').set('empty')
                                }
                                else if(timestamp==childsnapshot.child('timestamp').val()){
                                    var key=childsnapshot.key
                                    database.ref('helprequests/'+key+'/').remove()
                                }
                            })
                        })
                        //remove from personal help requests

                        if(snapshot.numChildren()==1){

                            database.ref('users/'+user.uid+'/helprequests/').set('empty').then(function(){
                                $('#jumb_'+index).remove()
                                console.log( $('#help_request_container').children().length)
                                if($('#help_request_container').children().length==1){
                                    var jumbotronNoMessage='<div class="jumbotron" id="nomessage" style="background-color:#57626E"><h1 class="display-4 text-center text-capitalize" style="color:white;">no help request yet!</h1><img src="css/assets/error-404.svg" class="rounded mx-auto d-block" style="margin-top:30px;width:150px; height:"150px"></div>'
                                    $('.loader').remove()
                                    $('#help_request_container').append(jumbotronNoMessage)
                                }

                            })





                        }
                        else{
                            database.ref('users/'+user.uid+'/helprequests/'+index+'/').remove().then(function(){
                                $('#jumb_'+index).remove()
                                if($('#help_request_container').children().length==1){
                                    var jumbotronNoMessage='<div class="jumbotron" id="nomessage" style="background-color:#57626E"><h1 class="display-4 text-center text-capitalize" style="color:white;">no help request yet!</h1><img src="css/assets/error-404.svg" class="rounded mx-auto d-block" style="margin-top:30px;width:150px; height:"150px"></div>'
                                    $('.loader').remove()

                                    $('#help_request_container').append(jumbotronNoMessage)
                                }
                            })
                        }

                    })



                })

                console.log('index to listen to '+index)
                database.ref('users/'+user.uid+'/helprequests/'+index+'/operator_message/').on('value',function(snapshot){
                    var operatorMessage=snapshot.val()
                    console.log('operator message '+operatorMessage)
                    $('#operator_message_'+index).last().text(operatorMessage)
                })
                database.ref('users/'+user.uid+'/helprequests/'+index+'/state/').on('value',function(snapshot){
                    var requestStatus=snapshot.val()
                    console.log('status request '+requestStatus)
                    switch(requestStatus){
                        case 'accepted':
                            $('#request_icon_'+index).last().attr('src','css/assets/accepted.svg')
                            var text=pageWidth<350?'OK!':'Approved!'
                            $('#request_status_'+index).last().text(text)

                            break;
                        case 'refused':
                            $('#request_icon_'+index).last().attr('src','css/assets/notaccepted.svg')
                            var text=pageWidth<350?'Nope!':'Refused!'
                            $('#request_status_'+index).last().text(text)

                            break;
                        case 'pending':
                            $('#request_icon_'+index).last().attr('src','css/assets/pending.svg')

                            var text=pageWidth<350?'Wait!':'Pending...'
                            $('#request_status_'+index).last().text(text)

                            break;


                    }

                })       
                database.ref('users/'+user.uid+'/helprequests/'+index+'/place').once('value').then(function(snapshot){
                    var place=snapshot.val()

                    if(place=='Laboratorio Informatico 3' && pageWidth <=400){
                        place='Lab.Inf. 3'
                    }
                    if(place=='Laboratorio Informatico 2' && pageWidth <=400){
                        place='Lab.Inf. 2'
                    }
                    console.log('place for request '+place)
                    $('#whereabouts_'+index).last().text(place)
                })
                database.ref('users/'+user.uid+'/helprequests/'+index+'/time').once('value').then(function(snapshot){
                    var time=snapshot.val()
                    console.log('place for request '+time)
                    $('#time_'+index).last().text(time)
                })


            })


        } 

        else {
            // No user is signed in.
        }


    });  

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
function resizeHelprequests(width){
    //   $('h1').text(width)
    if(width>=750){
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
        if(col.hasClass('col-4')){
            col.removeClass('col-4')
            col.addClass('col-2 ')
        }
    }

    if(width<750){
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
            console.log('daje')
            col.removeClass('col-2')
            col.addClass('col-5 ')
        }
    }
}