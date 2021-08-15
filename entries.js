
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    "use strict";
    // let daysInMonth = 32 - new Date(year, month, 32).getDate();
    var arr = [];
    let monthForFB = ""+ ( month + 1)  + "";
    let yearForFB = "" + year + "";
     if(monthForFB.length == 1){
        monthForFB = "0" + monthForFB;
     }
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let currentMonth = "-" + monthForFB + "-" + yearForFB;
    for(let k = 1; k <= daysInMonth; k++) {
        let individualDate = "";
        if(k < 10 ){
             individualDate = "0" + k;
        }else{
             individualDate = "" + k + ""; 
        }
        let dindate = individualDate + currentMonth
        debugger
        firebase.firestore().collection(dindate).onSnapshot(function(snapshot){
            snapshot.forEach(function(value){
             var  dd = {
                    id: value.id,
                    head: value.data().head,
                    des: value.data().des,
                    dat: value.data().date
                }
                arr.push(dd)
            })
            let firstDay = (new Date(year, month)).getDay();
            let tbl = document.getElementById("calendar-body"); // body of the calendar

    
            // clearing all previous cells
            tbl.innerHTML = "";

            // filing data about month and in the page via DOM.
            monthAndYear.innerHTML = months[month] + " " + year;
            selectYear.value = year;
            selectMonth.value = month;

            // creating all cells
            let date = 1;
            for (let i = 0; i < 6; i++) {
                // creates a table row
                let row = document.createElement("tr");
                //creating individual cells, filing them up with data.
                for (let j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay) {
                        let cell = document.createElement("td");
                    
                        let cellText = document.createTextNode("");

                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }
                    else if (date > daysInMonth) {
                        break;
                    }
                    else {
                        var dateForFB = "";
                        let cell = document.createElement("td");
                        let cellText = document.createTextNode(date);
                        cell.addEventListener("click", displayDate);
                        if(date < 10){
                            dateForFB = "0" + date;
                        }else{
                            dateForFB = date;
                        }
                        let compare = dateForFB+ "-" + monthForFB + "-" + yearForFB;
                        console.log(arr);
                        for(let i=0; i < arr.length; i++) {
                            if(compare == arr[i].dat){
                                cell.classList.add("dateactive");
                            }
                        }
                       
                        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                            cell.classList.add("bg-info");
                        } // color today's date
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                        date++;
                    }

                }

                tbl.appendChild(row); // appending each row into calendar body.
            }
            
        })
    
    }
   
    
}

function displayDate(eventObj){
    console.log(eventObj.srcElement.innerHTML);
}