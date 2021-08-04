// var firebaseConfig = {
//     apiKey: "AIzaSyDcKLi8aWS5zLCdfRtEUyAagx59pPhqu08",
//     authDomain: "crudapp-f84f5.firebaseapp.com",
//     databaseURL: "https://crudapp-f84f5-default-rtdb.firebaseio.com",
//     projectId: "crudapp-f84f5",
//     storageBucket: "crudapp-f84f5.appspot.com",
//     messagingSenderId: "619649889963",
//     appId: "1:619649889963:web:6640fc5b4d5ddbf250e9ee",
//     measurementId: "G-NR37CLKL29"
//   };
  var firebaseConfig = {
    apiKey: "AIzaSyCDyZ1AjqeZbQfa0ePGiBcMo4POpSKTyc4",
    authDomain: "dairy-aa602.firebaseapp.com",
    databaseURL: "https://dairy-aa602-default-rtdb.firebaseio.com",
    projectId: "dairy-aa602",
    storageBucket: "dairy-aa602.appspot.com",
    messagingSenderId: "144338449131",
    appId: "1:144338449131:web:6bf807eb8abc8f331744ae",
    measurementId: "G-GZWT9KZK4V"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
    
function createTask(){

    var sub = document.getElementById('sub').value;
    var description = document.getElementById('des').value;
    var task = {
        task: sub,
        description: description
    }
    const d = new Date();
    const date =  d.getDate() + '-' + d.getMonth() + "-" + d.getFullYear();
    console.log(date);
    debugger
    let db = firebase.firestore().collection(date);
    db.add(task).then(()=>{
     console.log('good job!', "task addded", "success")
    })
    document.getElementById("cardSection").innerHTML="";
    readTask();
}
readTask();
function readTask(){
    debugger
    const d = new Date();
    const date =  d.getDate() + '-' + d.getMonth() + "-" + d.getFullYear();
    firebase.firestore().collection(date).onSnapshot(function(snapshot){
        document.getElementById("cardSection").innerHTML="";
        debugger
        snapshot.forEach(function(taskValue){
            document.getElementById("cardSection").innerHTML +=`
          <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${taskValue.data().task}</h5>
                <p class="card-test">${taskValue.data().description}</p>
                <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(
                    '${taskValue.id}','${taskValue.data().task}', '${taskValue.data().description}'
                )">Edit Task</button>
                <button type="submit" class="btn btn-danger" onclick="deleteTask('${taskValue.id}')">
                delete</button>
            </div>
           </div>`
        });
          
      });
}