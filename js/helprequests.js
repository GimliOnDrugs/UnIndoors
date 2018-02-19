'use strict';



var database = firebase.database();
var table=document.getElementById('myTable');

function myFunction(filter) {

    database.ref('helprequests/').on('value', function (snapshot) {

        var tbody=$('#table_body')
        tbody.empty();
        //qui ho tutto
        var count=0
        var status = snapshot.val();
        var container=$('#table_container') 
        // var tbody = document.querySelector("#myTable tbody");

        snapshot.forEach(function (childSnapshot) {
            var id = childSnapshot.child('id').val().toString();
            var msg = childSnapshot.child('message').val().toString();
            var from = childSnapshot.child('name').val().toString();
            var status = childSnapshot.child('state').val().toString();
            var place = childSnapshot.child('place').val().toString();
            var index = childSnapshot.child('index').val().toString();
            var childSnapshotIndex=childSnapshot.key

            //Using this alert to check if values are retrieved correctly
            //alert(from);
            
            if(filter=='yes'){
                if(status!='accepted'){
                    tbody.append('<tr><th scope="row">'+id+'</th><td>'+from+'</td><td>'+status+'</td><td>'+msg+'</td><td>'+place+'</td><td><button type="button" class="btn btn-outline-success" id="'+count+'">Accept</button><button type="button" class="btn btn-outline-danger" id="'+count+'R'+'">Refuse</button></td></tr>')
                }
            }else{

                     tbody.append('<tr><th scope="row">'+id+'</th><td>'+from+'</td><td>'+status+'</td><td>'+msg+'</td><td>'+place+'</td><td><button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#myModal" id="'+count+'">Accept</button><button type="button" class="btn btn-outline-danger" id="'+count+'R'+'">Refuse</button></td></tr>')

            }
                               
            
            $('#'+count).click(function(){
            
            setRequests(id,childSnapshotIndex,$(this).attr('id'),index)

            })

            
            
            $('#'+count+'R').click(function(){
                setRequestDenied(id,childSnapshotIndex,$(this).attr('id'),index)
            })

            database.ref('helprequests/'+childSnapshotIndex+'/state/').on('value',  snapshot => {

                var requestStatus = snapshot.val().toString()
                if(requestStatus == 'accepted'){
                    var idButton = count;

                    $('#'+idButton).attr("disabled","");
                    $('#'+idButton+'R').attr("disabled","");
                }
            })    

            count++

        })

    })

}



function setRequests(id,childSnapshotIndex,butcount,index){
    //alert(childSnapshotIndex)
    var idButton = butcount
    database.ref('helprequests/'+childSnapshotIndex+'/state/').set('accepted').then(function(){
        $('#'+idButton).attr("disabled","");
        $('#'+idButton+'R').attr("disabled","");
    });
    
    updateRequestForStudent(id,'accepted',index)
}

function setRequestDenied(id,childSnapshotIndex,count,index){
    //alert(childSnapshotIndex)
    var idButton = count
    var idButton2 = idButton.slice(0,-1)
    database.ref('helprequests/'+childSnapshotIndex+'/state/').set('refused');
    $('#'+idButton).attr("disabled","");
    $('#'+idButton2).attr("disabled","");
    updateRequestForStudent(id,'refused',index)
}

function setReplyMsg(idReq,msg,index){
    
    //alert('msg: '+msg+'  idReq: '+idReq+'  index: '+index)
    database.ref('users/'+idReq+'/helprequests/'+index+'/operator_message/').set(msg).then(sucess=>{
        
        $('#REP').unbind('click')
        
    })
}

function updateRequestForStudent(idReq,stateToSet,index){

    database.ref('users/'+idReq+'/helprequests/'+index+'/state/').set(stateToSet).then(success=>{
            $('#REP').click(function(){

            var msg = document.getElementById('MERDA').value
           // alert(stampa)
            setReplyMsg(idReq,msg,index)

            
            $('#myModal').modal('hide')

            })
    })

}

