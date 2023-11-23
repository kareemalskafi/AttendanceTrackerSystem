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
  let studentTable = document.getElementById("student-table-row");

  // Load student data from local storage
  studentData = LoadStudentData();

  // Loop through all the students and add them to table
  for (let student in studentData) {
    studentTable.innerHTML += `<div class="student-table-data">${student.firstName} ${student.lastName}</div>}`;
    studentTable.innerHTML += `<div class="student-table-data">${student.id}</div>}`;
    studentTable.innerHTML += `<div class="student-table-data">${student.absences}</div>}`;
    studentTable.innerHTML += `<div class="student-table-data">${student.tasksSolved}</div>}`;
    studentTable.innerHTML += `<div class="student-table-data">${student.totalTasks}</div>}`;
    studentTable.innerHTML += `<div class="student-table-data">${student.trainerFirstName} ${student.trainerLastName}</div>}`;
  }
}

function LoadStudentData() {
  studentData = JSON.parse(localStorage.getItem(studentDataKey));

  let trainerId = GetTrainerFromId(studentLocalStorage.trainerId);

  trainerData = GetTrainerFromId(trainerId);
  studentData["trainerFirstName"] = trainerData.firstName;
  studentData["trainerLastName"] = trainerData.lastName;
}

function GetTrainerFromId() {
  // Loop through all the trainers' ids in local storage till we find the one that is true
  for (let key in Object.keys(localStorage)) {
    // Get the key name
    let keyName = Object.keys(localStorage)[key].split("-")[0];
    // Check if the key name is trainerData
    if (keyName == trainerDataKey) {
      let getData = JSON.parse(
        localStorage.getItem(Object.keys(localStorage)[key])
      );
      if (getData.id == id) {
        // Return the trainer id
        return getData;
      }
    }
  }
}
