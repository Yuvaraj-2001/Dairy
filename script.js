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

    apiKey: "AIzaSyCDyZ1AjqeZbQfa0ePGiBcMo4POpSKTyc4",
    authDomain: "dairy-aa602.firebaseapp.com",
    projectId: "dairy-aa602",
    storageBucket: "dairy-aa602.appspot.com",
    messagingSenderId: "144338449131",
    appId: "1:144338449131:web:6bf807eb8abc8f331744ae",
    measurementId: "G-GZWT9KZK4V"
  };
  // Initialize Firebase
//   https://console.firebase.google.com/u/1/project/dairy-aa602/settings/general/web:YTNkZDFjYTItYzIzMi00ZTJlLWIxMjQtNGQ5NDRmNWE1YTcw
  firebase.initializeApp(firebaseConfig);
  function duntoday(){
      debugger
    const d = new Date();
    let date   = d.getDate();
    let mon = d.getMonth();
    let year = d.getFullYear();
    var arr = [];
    const today = "" + date + "-" + mon + "-" + year +"";
    firebase.firestore().collection(today).onSnapshot(function(snapshot){
        snapshot.forEach(function(value){
            data = {
                id: value.id,
                head: value.data().head,
                des: value.data().des,
            }
            arr.push(data)
        })
        console.log(arr);
        console.log(arr.length)
        debugger
        if(arr.length < 0){
            return false; 
        }else{
            return true;
        }
        
    })
    
  }

  function send(){
    if(!duntoday()){
        alert("you have already wroye ypur day please check")
        return
    }else{
    var hed = document.getElementById("hed").value;
    var des = document.getElementById("des").value;
    const d = new Date();
    let date   = d.getDate();
    let mon = d.getMonth();
    let year = d.getFullYear();
    const today = date + "-" + mon + "-" + year;
    const sending = {
        head: hed,
        des: des,
        date: today
    }
    let db = firebase.firestore().collection(today+"/");    
    db.add(sending).then(()=>{
      alert("done");
  });
  }
  }