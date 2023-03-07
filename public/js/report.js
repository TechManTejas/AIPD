
const count = document.getElementById("counts")

if(sessionStorage.getItem("Steps")=="NA")
{
    count.innerHTML = sessionStorage.getItem("Steps");
}
else if (isNaN(sessionStorage.getItem("Steps"))) {
    count.innerHTML = 0;
}
else {
    count.innerHTML = sessionStorage.getItem("Steps");
}
const time = document.getElementById("time")
if (isNaN(sessionStorage.getItem("time_avg"))) {
    time.innerHTML = 0 + "s";
}
else {
    time.innerHTML = sessionStorage.getItem("time_avg") + "s"
}
const speed = document.getElementById("speed")
if (isNaN(sessionStorage.getItem("speed_avg"))) {
    speed.innerHTML = 0 + "mm/s";

}
else {
    speed.innerHTML = sessionStorage.getItem("speed_avg") + "mm/s"
}


const Exercise = document.getElementById("Exercise")
Exercise.innerHTML = sessionStorage.getItem("Exercise")
const Exercise_category = document.getElementById("Exercise_category")
Exercise_category.innerHTML = sessionStorage.getItem("Exercise_category")
const Exercise_difficulty = document.getElementById("Exercise_difficulty")
Exercise_difficulty.innerHTML = sessionStorage.getItem("Exercise_difficulty")
const total_time = document.getElementById("total_time")
total_time.innerHTML = sessionStorage.getItem("total_time")
const Sets = document.getElementById("Sets")
Sets.innerHTML = sessionStorage.getItem("Sets")
const total_a = document.getElementById("total_a")
total_a.innerHTML = sessionStorage.getItem("counter_value")
const total_e = document.getElementById("total_e")
total_e.innerHTML = sessionStorage.getItem("total_e")

const date_d=document.getElementById("date")
date_d.innerHTML=new Date().toString().split(" ").slice(0, 4).toString()
const time_d=document.getElementById("time_d")
time_d.innerHTML=new Date().toString().split(" ").slice(4, 5).toString()


// profile values
const name = sessionStorage.getItem("Name")
document.getElementById("name").placeholder = name
const DOB = sessionStorage.getItem("DOB")
document.getElementById("DOB").placeholder = DOB
const PID = sessionStorage.getItem("PID")
document.getElementById("PID").placeholder = PID
const Doctor_name = sessionStorage.getItem("Doctor_name")
document.getElementById("Doctor_name").placeholder = Doctor_name
const Doctor_number = sessionStorage.getItem("Doctor_number")
document.getElementById("Doctor_number").placeholder = Doctor_number
const Doctor_email = sessionStorage.getItem("Doctor_email")
document.getElementById("Doctor_email").placeholder = Doctor_email








// function sendEmail(email, message) {
//     alert(email);
//     Email.send({
//         Host: "smtp.gmail.com",
//         Username: "testteam9832@gmail.com",
//         Password: "fmwgwwwiigkyyxfv",
//         To: email,
//         from: "testteam9832@gmail.com",
//         Subject: "Report",
//         Body: message,
//     }).then(msg => {
//         //console.log (message);
//         if (msg == 'OK') {
//             alert('Your mail has been send. Thank you for connecting.');
//         }
//         else {
//             console.error(msg);
//             console.log(msg)
//             alert('There is error at sending message. ')

//         }

//     });
//     console.log("sent");

// }



document.getElementById("FinalReport").addEventListener("submit", datadownload);

function datadownload() {

    var q1 = document.getElementById("qu1");
    q1 = q1.options[q1.selectedIndex].text;
    var q2 = document.getElementById("qu2");
    q2 = q2.options[q2.selectedIndex].text;
    var q3 = document.getElementById("qu3");
    q3 = q3.options[q3.selectedIndex].text;
    var q4 = document.getElementById("qu4");
    q4 = q4.options[q4.selectedIndex].text;
    var q5 = document.getElementById("qu5");
    q5 = q5.options[q5.selectedIndex].text;

    var textToSave = `
Final Report 
Patient name : ${name}
Date of Birth : ${DOB}
Patient ID : ${PID}
Doctor Name : ${Doctor_name}
Doctor Number : ${Doctor_number}
Date : ${new Date().toString().split(" ").slice(0, 4).toString()}
Time : ${new Date().toString().split(" ").slice(4, 5).toString()} 
Exercise : ${sessionStorage.getItem('Exercise')}
Exercise Category : ${sessionStorage.getItem("Exercise_category")}
Exercise Difficulty : ${sessionStorage.getItem("Exercise_difficulty")}
Repetitions : ${sessionStorage.getItem("Steps")}
Sets : ${sessionStorage.getItem("Sets")}
Total Count Expected : ${sessionStorage.getItem("total_e")}
Total Count Performed : ${sessionStorage.getItem("counter_value")}
Time/Repetition : ${sessionStorage.getItem("time_avg")} s
Average Speed : ${sessionStorage.getItem("speed_avg")} mm/s
Total Time Taken : ${sessionStorage.getItem("total_time")} 
Before Exercise 
Question 1 : How are you feeling now ? ${sessionStorage.getItem("question1")}
Question 2 : How is the pain now ? ${sessionStorage.getItem("question2")}
Question 3 : Are you done with your meal ? ${sessionStorage.getItem("question3")}
Question 4 : Did you watch the exercise videos  ? ${sessionStorage.getItem("question4")}
Question 5 : Rate our Exercise Information Catalog  ? ${sessionStorage.getItem("question5")}
After Exercise
Question 1 : How are you feeling now ? ${q1}
Question 2 : How is the pain now ? ${q2}
Question 3 : How would you rate our AI-based Guidance ? ${q3}
Question 4 : Do you agree with the report created ? ${q4}
Question 5 : Rate overall exercise experience with Tool ${q5}

`



// create html template
var htmlTemplate=`

<!DOCTYPE html>
<html>
<style>
table {
   
   
    width: 80%;
    font-size: small;

  }
  
  td, th {
   
    text-align: left;
    padding: 8px;
    width:50%;
  }
  hr
  {
    width:50%;
  }
  
</style>
<body>

<h2 style="text-align:center">Final Report</h2>

<table style="width:100%;font-size: small;" border=1>
<tr><td colspan="2" style=" text-align: center;font-size:medium"><b>User Details</b></td></tr>
  <tr>
    <td>Patient Name</td>
    <td>${name}</td>
  </tr>
  <tr>
    <td>Date of Birth</td>
    <td>${DOB}</td>
  </tr>
  <tr>
    <td>Patient ID</td>
    <td>${PID}</td>
  </tr>
  <tr>
    <td>Doctor Name</td>
    <td>${Doctor_name}</td>
  </tr>
  <tr>
    <td>Doctor email</td>
    <td>${Doctor_email}</td>
  </tr>
  <tr>
    <td>Doctor Contact Number</td>
    <td>${Doctor_number}</td>
  </tr>
</table>

<br><br><br>
<table style="width:100%;font-size: small;" border=1>
<tr><td colspan="2" style=" text-align: center;font-size:medium;" ><b>Exercise Details</b></td></tr>
  <tr>
    <td>Date | Time</td>
    <td>${new Date().toString().split(" ").slice(0, 4).toString()} | ${new Date().toString().split(" ").slice(4, 5).toString()} </td>
  </tr>
  <tr>
    <td>Exercise | Category</td>
    <td>${sessionStorage.getItem('Exercise')} | ${sessionStorage.getItem("Exercise_category")}</td>
  </tr>
  <tr>
    <td>Exercise Difficulty</td>
    <td>${sessionStorage.getItem("Exercise_difficulty")}</td>
  </tr>
  <tr>
    <td>Repetitions | Sets</td>
    <td>${sessionStorage.getItem("Steps")} | ${sessionStorage.getItem("Sets")} </td>
  </tr>
  <tr>
    <td>Total Count Performed | Expected</td>
    <td>${sessionStorage.getItem("counter_value")} | ${sessionStorage.getItem("total_e")}</td>
  </tr>
  <tr>
    <td>Time Per Repetition</td>
    <td>${sessionStorage.getItem("time_avg")} s</td>
  </tr>
  <tr>
    <td>Average Speed</td>
    <td>${sessionStorage.getItem("speed_avg")} mm/s</td>
  </tr>
  <tr>
    <td>Total Time Taken</td>
    <td>${sessionStorage.getItem("total_time")} </td>
  </tr>
</table>
<br><br><br>
<table style="width:100%;font-size: small;" border=1>
<tr><td colspan="2" style=" text-align: center;font-size:medium" border=1><b>General Questions</b></td></tr>
  <tr>
    <td style=" text-align: center;font-size:medium"><b>Before Exercise</b></td>
    <td style=" text-align: center;font-size:medium"><b>After Exercise</b></td>
  </tr>
  <tr>
    <td>How are you feeling now? | ${sessionStorage.getItem("question1")}</td>
    <td>How are you feeling now? | ${q1}</td>
  </tr>
  <tr>
    <td>How is the pain now? | ${sessionStorage.getItem("question2")}</td>
    <td>How is the pain now? | ${q2}</td>
  </tr>
  <tr>
    <td>Are you done with your meal? | ${sessionStorage.getItem("question3")}</td>
    <td>Are you done with your meal? | ${q3}</td>
  </tr>
  <tr>
    <td>Did you watch the exercise videos | ${sessionStorage.getItem("question4")}</td>
    <td>Do you agree with the report created? | ${q4}</td>
  </tr>
  <tr>
    <td>Rate our Exercise Information Catalog | ${sessionStorage.getItem("question5")}</td>
    <td>Rate overall exercise experience with Tool | ${q5}</td>
  </tr>
  
</table>


</body>
</html>


`







































   
    // sendEmail(sessionStorage.getItem("Doctor_email"), textToSave);

    sessionStorage.clear();
    sessionStorage.setItem("Doctor_email",Doctor_email)
    sessionStorage.setItem("Report",textToSave)
    sessionStorage.setItem("Report_html",htmlTemplate)
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'ReportData.txt';
    hiddenElement.click();

}