


document.getElementById("Patient_data").addEventListener("submit", information);

function information() {
    // profile data

    sessionStorage.setItem("Name", document.getElementById("name").getAttribute("placeholder"))
    sessionStorage.setItem("DOB", document.getElementById("DOB").getAttribute("placeholder"))
    sessionStorage.setItem("Doctor_name", document.getElementById("Doctor_name").getAttribute("placeholder"))
    sessionStorage.setItem("PID", document.getElementById("PID").getAttribute("placeholder"))
    sessionStorage.setItem("Doctor_number", document.getElementById("Doctor_number").getAttribute("placeholder"))
    sessionStorage.setItem("Doctor_email", document.getElementById("Doctor_email").getAttribute("placeholder"))
    // profile data

    var Exercise = document.getElementById("Exercise")
    sessionStorage.setItem("Exercise", Exercise.options[Exercise.selectedIndex].text)
    var Exercise_category = document.getElementById("Exercise_category")
    sessionStorage.setItem("Exercise_category", Exercise_category.options[Exercise_category.selectedIndex].text)
    var Steps = document.getElementById("Steps")
    sessionStorage.setItem("Steps", Steps.options[Steps.selectedIndex].text)
    var Sets = document.getElementById("Sets")
    sessionStorage.setItem("Sets", Sets.options[Sets.selectedIndex].text)
    var question1 = document.getElementById("question1");
    sessionStorage.setItem("question1", question1.options[question1.selectedIndex].text);
    var question2 = document.getElementById("question2");
    sessionStorage.setItem("question2", question2.options[question2.selectedIndex].text);
    var question3 = document.getElementById("question3");
    sessionStorage.setItem("question3", question3.options[question3.selectedIndex].text);
    var question4 = document.getElementById("question4");
    sessionStorage.setItem("question4", question4.options[question4.selectedIndex].text);
    var question5 = document.getElementById("question5");
    sessionStorage.setItem("question5", question5.options[question5.selectedIndex].text);
    var d = "";
    if (sessionStorage.getItem("Exercise_category") == 1) {
        d = "Easy"
    }
    else if (sessionStorage.getItem("Exercise_category") == 2) {
        d = "Medium"
    }
    else {
        d = "Difficult"
    }
    sessionStorage.setItem("Exercise_difficulty", d);






}

