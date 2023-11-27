let studentData;

document.addEventListener("DOMContentLoaded", function () {
  // Load data from local storage
  ShowStudentData();
});

function ShowStudentData() {
  // get student table
  let nextRow = document.getElementById("table");

  // Load student data from local storage
  studentData = LoadStudentData();
  console.log(studentData);
  // Loop through all the students and add them to table
  for (let student of studentData) {
    let totalTasks = 0;
    let solvedTasks = 0;

    for (let task in student.studentTasks) {
      totalTasks += +student.studentTasks[task];
    }

    if (!student.solvedTasks) {
      solvedTasks = 0;
    } else {
      solvedTasks = student.solvedTasks;
    }

    nextRow.innerHTML += `
  <tr>
  <td>${student.studentID}</td>
  <td>${student.studentName}</td>
  <td>${solvedTasks}</td>
  <td>${totalTasks}</td>
  <td>${student.absent}</td>
  </tr>
    `;
  }
}

function LoadStudentData() {
  // Get the data from local storage
  let getStudentDataa = JSON.parse(localStorage.getItem("allData")) || [];

  return getStudentDataa;
}
