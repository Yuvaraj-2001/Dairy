// var firebaseConfig = {
//     apiKey: "AIzaSyBfzVWTUubovptlLNu7tbEkP8Rnt21sceA",
//     authDomain: "angular-5b97d.firebaseapp.com",
//     databaseURL: "https://angular-5b97d-default-rtdb.firebaseio.com",
//     projectId: "angular-5b97d",
//     storageBucket: "angular-5b97d.appspot.com",
//     messagingSenderId: "72718290592",
//     appId: "1:72718290592:web:cd50fdb5cbd9ad7b1243c5",
//     measurementId: "G-3JHEZ9PC5Y"
//   };
 var firebaseConfig = {
    apiKey: "AIzaSyAcUK7yljvEhcJUd3BCPWPkZzwL2-BY49A",
    authDomain: "dairy-311f0.firebaseapp.com",
    projectId: "dairy-311f0",
    storageBucket: "dairy-311f0.appspot.com",
    messagingSenderId: "320697444506",
    appId: "1:320697444506:web:afcb2e55c3bfeb5d839723",
    measurementId: "G-91PY4PG50H"
  };
  // Initialize Firebase
  //   https://console.firebase.google.com/u/1/project/dairy-aa602/settings/general/web:YTNkZDFjYTItYzIzMi00ZTJlLWIxMjQtNGQ5NDRmNWE1YTcw
  firebase.initializeApp(firebaseConfig);
  function duntoday(){
    var hed = document.getElementById("sub").value;
    var des = document.getElementById("des").value;
    const d = new Date();
    let date   = ""+ d.getDate() + "";
    let mon = ""+ (d.getMonth() + 1) + "";

    let year = ""+ d.getFullYear() + "";
    if(date.length == 1){
        date = "0" + date;
    }           
    if(mon.length == 1){
        mon = "0" + mon;
    }
    var arr = [];
    const today =  date + "-" + ( mon ) + "-" + year;
    const sending = {
        head: hed,
        des: des,
        date: today
    } 
    debugger
    firebase.firestore().collection(today).onSnapshot(function(snapshot){
        snapshot.forEach(function(value){
            data = {
                id: value.id,
                head: value.data().head,
                des: value.data().des,
            }
            arr.push(data)
        })
        debugger
        console.log(arr);
        console.log(arr.length)
        if(arr.length == 0){
            var audio = new Audio('avenger.mp3');
            audio.play();
            let db = firebase.firestore().collection(today+"/");    
            db.add(sending).then(()=>{
                alert(" data added")
                loading()
               return true;
            });
        } 
        if(arr.length !== 0){
            alert("not done")
        }
          
    })
    
  }

  function loading(){
    const d = new Date();
    let date   = ""+ d.getDate() + "";
    debugger
    let mon = ""+ ( d.getMonth() + 1)  + "";
    let year = ""+ d.getFullYear() + "";
    var arr = [];
    if(date.length == 1){
        date = "0" + date;
    }
    if(mon.length == 1){
        mon = "0" + mon;
    }
    debugger
    const today =  date + "-" + (mon ) + "-" + year;
    debugger
    firebase.firestore().collection(today).onSnapshot(function(snapshot){
        snapshot.forEach(function(value){
            data = {
                id: value.id,
                head: value.data().head,
                des: value.data().des,
                dat: value.data().date
            }
            arr.push(data)
        })
        debugger
        console.log(arr);
        console.log(arr.length)
        if(arr.length == 0){
            
        } 
        if(arr.length !== 0){
            document.getElementById("heading").innerHTML = "Today is "+ arr[0].dat + " and you already wrote it, go to to history to re edit";
            document.getElementById("sub").value = arr[0].head;
            document.getElementById("sub").disabled = true;
            document.getElementById("des").value = arr[0].des;
            document.getElementById("des").disabled = true;
            document.getElementById("submit").style.display = "none";
            document.getElementById("his").style.display = "block";
        }
    })
        
  }
  
  function funHistory(){ 
    debugger
    var v =  document.getElementById("date").value;
    var parts = v.split('-');
    
    var arr = [];
   
    if(parts[2].charAt(0) == 0){
       
    }
    console.log(parts[2]);
    var datedata = parts[2] + "-" + parts[1] + "-" + parts[0];
    document.getElementById("resSub").value = datedata;
    firebase.firestore().collection(datedata).onSnapshot(function(snapshot){
        snapshot.forEach(function(value){
          var  data = {
                id: value.id,
                head: value.data().head,
                des: value.data().des,
                dat: value.data().date
            }
            arr.push(data);
        })
        debugger
        console.log(arr);
        console.log(arr.length)
        if(arr.length == 0){
            document.getElementById("hide").style.display = "block"; 
            document.getElementById("show").style.display = "none";  
            document.getElementById("noDate").innerHTML = "Record of " + datedata + "was not found, You add it!";
        } 
        if(arr.length !== 0){
            document.getElementById("resDate").innerHTML = "Dairy of "+ arr[0].dat + " is here";
            document.getElementById("resSub").value = arr[0].head;
            document.getElementById("resDes").value = arr[0].des;
            document.getElementById("readP").value = " We said na, slected date's dairy displays here"; 
            document.getElementById("hide").style.display = "none";
            document.getElementById("show").style.display = "block";
        }
    })
    
  }

  function sideEntries(){
    var arr = [];
    firebase.firestore().collection('entries').onSnapshot(function(snapshot){
        snapshot.forEach(function(value){
          var  data = {
                id: value.id,
                day: value.data().date,
            }
            arr.push(data);
        })
        debugger
        console.log(arr);
        console.log(arr.length)
        if(arr.length == 0){
           document.getElementById("scrollable").innerHTML = "Hey we didn't find any of it, add your experience";
        } 
        debugger
        if(arr.length !== 0){
            let data = "";
            let lengthy = arr.length;
            if(lengthy < 11){
                for(let i = 0; i < arr.length; i++){
                    data += "<button class='e-button' onclick=" + 'sideEntryClick('+ "'"+arr[i].day+ "'" + ")>" + arr[i].day + "</button><br> <br>";
                }
            }else{
                for(let i = 0; i < 11; i++){
                    data += "<button class='e-button' onclick=" + 'sideEntryClick('+ "'"+arr[i].day+ "'" + ")>" + arr[i].day + "</button><br> <br>";
                }  
            }
            
            document.getElementById("scrollable").innerHTML = data;  
        }
    })
  }
  function sideEntryClick(content){
    let parts = content.split('-');
    console.log(parts);
    debugger
    const day =  parts[2] + "-" + (parts[1] ) + "-" + parts[0];
    document.getElementById("date").value = day;
    funHistory();
  }