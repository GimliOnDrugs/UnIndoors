'use strict';

var config = {
    apiKey: "AIzaSyAiVwf9orhjqFyH6i4HBSmmaZuLwrJyZnQ",
    authDomain: "uniboindoors.firebaseapp.com",
    databaseURL: "https://uniboindoors.firebaseio.com",
    projectId: "uniboindoors",
    storageBucket: "uniboindoors.appspot.com",
    messagingSenderId: "484831871025"
};
firebase.initializeApp(config);

var database = firebase.database();
var table=document.getElementById('myTable');

function myFunction(filter) {


    database.ref('helprequests/').on('value', function (snapshot) {

        var tbody=$('#table_body')
        tbody.empty();
        //qui ho tutto
        var count=0
        var status = snapshot.val();
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
                tbody.append('<tr><th scope="row">'+id+'</th><td>'+from+'</td><td>'+status+'</td><td>'+msg+'</td><td>'+place+'</td><td><button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#myModal_'+count+'" id="'+count+'">Accept</button><button type="button" class="btn btn-outline-danger" id="'+count+'R'+'">Refuse</button></td></tr>')
                var container=$('#table_container')                
                container.append('<div class="modal fade" id="myModal_'+count+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLongTitle">Reply to student:</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><form><div class="form-group"><label for="message-text" class="col-form-label">Message:</label><textarea class="form-control" id="message-text"></textarea></div></form></div><div class="modal-footer"><button type="button" class="btn btn-primary" id="'+count+'REP'+'" >Send Message</button></div></div></div></div>')
            }
            $('#'+count).click(function(){
                setRequests(id,childSnapshotIndex,$(this).attr('id'),index)
                //$('#myModal_'+$(this).attr('id')).modal('show');

            })
            $('#'+count+'REP').click(function(){
            
            var string=$(this).attr('id').toString(); //0REP
            var string2=string.slice(0,-3) //0
            var modal_to_close='#myModal_'+string2+'' //#myModal0
                
            var msg = document.getElementById('message-text').value
            setReplyMsg(id,msg,index)
            
            $(modal_to_close).modal('hide')

            })
            $('#myModal').on('shown.bs.modal', function () {
                $('#myInput').trigger('focus')
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

    //    <!-- Button trigger modal -->
    //<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    //  Launch demo modal
    //</button>
    //
    //<!-- Modal -->
    //<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //  <div class="modal-dialog" role="document">
    //    <div class="modal-content">
    //      <div class="modal-header">
    //        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
    //        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //          <span aria-hidden="true">&times;</span>
    //        </button>
    //      </div>
    //      <div class="modal-body">
    //        ...
    //      </div>
    //      <div class="modal-footer">
    //        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //        <button type="button" class="btn btn-primary">Save changes</button>
    //      </div>
    //    </div>
    //  </div>
    //</div>

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
    database.ref('users/'+idReq+'/helprequests/'+index+'/operator_message/').set(msg)
}

function updateRequestForStudent(idReq,stateToSet,index){
    database.ref('users/'+idReq+'/helprequests/'+index+'/state/').set(stateToSet)
}



