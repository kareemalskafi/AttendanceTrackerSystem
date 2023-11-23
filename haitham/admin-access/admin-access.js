let trainerData;
let studentData;
let trainerDataKey = "trainerData";
let studentDataKey = "studentData";

document.addEventListener("DOMContentLoaded", function () {
  // Load mock data to local storage
  LocalStorageMockData();

  // Load data from local storage
  ShowStudentData();
});

function ShowStudentData() {
  // get student table
  let nextRow = document.getElementById("rows-container");
  let prevId;

  // Load student data from local storage
  studentData = LoadStudentData();

  // Loop through all the students and add them to table
  for (let student of studentData) {
    nextRow.innerHTML += `
    <div class="row" id="${student.id}">
  <div>${student.firstName}</div>
  <div>${student.lastName}</div>
  <div>${student.id}</div>
  <div>${student.absences}</div>
  <div>${student.totalTasks}</div>
  <div>${student.id}</div>
  </div>
    `;
  }
}

function LoadStudentData() {
  // Get the data from local storage
  let getStudentsData = JSON.parse(localStorage.getItem("studentArray")) || [];

  trainerData = JSON.parse(localStorage.getItem("userArray")) || [];

  return getStudentsData;
}

function LocalStorageMockData() {
  let studentMockData = [
    {
      firstName: "haitham",
      lastName: "Alrawi",
      id: "123456",
      absences: "0",
      tasksSolved: "0",
      totalTasks: "0",
      trainerId: "1",
    },
  ];

  localStorage.setItem("studentArray", JSON.stringify(studentMockData));
}
