const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClearItems = document.getElementById("btnClearItems");
const btnClear = document.getElementById("btnClear");
const btnSaveData = document.getElementById("btnSaveData");
const tblRecords = document.getElementById("tblRecords");
const sortCriteriaSelect = document.getElementById("sortCriteria");
const sortOrderSelect = document.getElementById("sortOrder");

let arrRecords = JSON.parse(localStorage.getItem("records")) || [];

const tblTHsLabels = [
  "First Name",
  "Middle Name",
  "Last Name",
  "Age",
  "Action",
];

iterateRecords();

if (arrRecords.length == 0) {
  document.getElementById("status").style.display = "inline";
  document.getElementById("status").innerHTML = "No Records...";
} else {
  document.getElementById("status").style.display = "none";
}

btnInsertUpdate.addEventListener("click", () => {
  const inputTxt = document.getElementsByTagName("input");

  if (btnInsertUpdate.value == "insert") {
    for (const txt of inputTxt) {
      if (txt.value.trim() == "") {
        alert("Please complete all the text inputs!");
        return;
      }
    }

    let infoRecord = {
      fname: inputTxt[0].value.trim(),
      mname: inputTxt[1].value.trim(),
      lname: inputTxt[2].value.trim(),
      age: parseInt(inputTxt[3].value.trim()),
    };

    for (const txt of inputTxt) {
      txt.value = "";
    }

    arrRecords.push(infoRecord);

    sortAndDisplayRecords();
    iterateRecords();
  } else {
    for (const txt of inputTxt) {
      if (txt.value.trim() == "") {
        alert("Please complete all the text inputs!");
        return;
      }
    }
    arrRecords[parseInt(btnInsertUpdate.value)].fname =
      inputTxt[0].value.trim();
    arrRecords[parseInt(btnInsertUpdate.value)].mname =
      inputTxt[1].value.trim();
    arrRecords[parseInt(btnInsertUpdate.value)].lname =
      inputTxt[2].value.trim();
    arrRecords[parseInt(btnInsertUpdate.value)].age = parseInt(
      inputTxt[3].value.trim()
    );

    iterateRecords();

    for (const txt of inputTxt) {
      txt.value = "";
    }

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";
  }
});

btnClear.addEventListener("click", () => {
  const inputTxt = document.getElementsByTagName("input");

  for (const txt of inputTxt) {
    txt.value = "";
  }

  btnInsertUpdate.innerHTML = "Insert";
  btnInsertUpdate.value = "insert";
});

btnClearItems.addEventListener("click", () => {
  arrRecords = [];
  localStorage.clear();

  while (tblRecords.hasChildNodes()) {
    tblRecords.removeChild(tblRecords.firstChild);
  }

  document.getElementById("status").style.display = "inline";
  document.getElementById("status").innerHTML = "No Records...";

  btnInsertUpdate.innerHTML = "Insert";
  btnInsertUpdate.value = "insert";
});

btnSaveData.addEventListener("click", () => {
  localStorage.setItem("records", JSON.stringify(arrRecords));
});

sortCriteriaSelect.addEventListener("change", () => {
  sortAndDisplayRecords();
});

sortOrderSelect.addEventListener("change", () => {
  sortAndDisplayRecords();
});

function sortAndDisplayRecords() {
  const sortCriteria = sortCriteriaSelect.value;
  const sortOrder = sortOrderSelect.value;
  if (sortCriteria && sortOrder) {
    sortRecords(sortCriteria, sortOrder);
    iterateRecords();
  }
}

function sortRecords(criteria, order) {
  arrRecords.sort((a, b) => {
    const valueA = a[criteria];
    const valueB = b[criteria];
    if (order === "asc") {
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    } else if (order === "desc") {
      if (valueA > valueB) return -1;
      if (valueA < valueB) return 1;
      return 0;
    }
  });
}

function iterateRecords() {
  while (tblRecords.hasChildNodes
    ()) {
        tblRecords.removeChild(tblRecords.firstChild);
      }
    
      if (arrRecords.length > 0) {
        document.getElementById("status").style.display = "none";
    
        const tblHeaderRow = document.createElement("tr");
        const tblHeader = document.createElement("thead");
        tblHeaderRow.style.borderTop = "1px solid black";
        tblHeaderRow.style.borderBottom = "1px solid black";
    
        for (let i = 0; i < 5; i++) {
          const tblTHs = document.createElement("th");
          tblTHs.style.padding = "5px";
    
          if (i != 4) {
            tblTHs.style.borderRight = "1px solid black";
          }
    
          tblTHs.innerHTML = tblTHsLabels[i];
          tblHeaderRow.appendChild(tblTHs);
        }
    
        tblHeader.appendChild(tblHeaderRow);
        tblRecords.appendChild(tblHeader);
    
        const tblBody = document.createElement("tbody");
    
        arrRecords.forEach((rec, i) => {
          const tblRow = document.createElement("tr");
          const tbdataFname = document.createElement("td");
          const tbdataMname = document.createElement("td");
          const tbdataLname = document.createElement("td");
          const tbdataAge = document.createElement("td");
          const tbdataActionBtn = document.createElement("td");
          const btnDelete = document.createElement("button");
          const btnUpdate = document.createElement("button");
    
          tbdataFname.style.borderRight = "1px solid black";
          tbdataFname.style.padding = "10px";
    
          tbdataMname.style.borderRight = "1px solid black";
          tbdataMname.style.padding = "10px";
    
          tbdataLname.style.borderRight = "1px solid black";
          tbdataLname.style.padding = "10px";
    
          tbdataAge.style.borderRight = "1px solid black";
          tbdataAge.style.padding = "10px";
    
          tbdataActionBtn.style.padding = "10px";
    
          tblRow.style.borderBottom = "1px solid black";
    
          tbdataFname.innerHTML = rec.fname;
          tbdataMname.innerHTML = rec.mname;
          tbdataLname.innerHTML = rec.lname;
          tbdataAge.innerHTML = rec.age;
    
          btnDelete.innerHTML = "Delete";
          btnDelete.setAttribute("onclick", `deleteData(${i})`);
          btnDelete.style.marginRight = "5px";
    
          btnUpdate.innerHTML = "Edit";
          btnUpdate.setAttribute("value", "update");
          btnUpdate.setAttribute("onclick", `updateData(${i})`);
          btnUpdate.style.marginRight = "5px";
    
          tbdataActionBtn.appendChild(btnDelete);
          tbdataActionBtn.appendChild(btnUpdate);
    
          tblRow.appendChild(tbdataFname);
          tblRow.appendChild(tbdataMname);
          tblRow.appendChild(tbdataLname);
          tblRow.appendChild(tbdataAge);
          tblRow.appendChild(tbdataActionBtn);
    
          tblBody.appendChild(tblRow);
        });
    
        tblRecords.appendChild(tblBody);
      } else {
        document.getElementById("status").style.display = "inline";
        document.getElementById("status").innerHTML = "No Records...";
      }
    }
    
    function deleteData(i) {
      arrRecords.splice(i, 1);
      localStorage.setItem("records", JSON.stringify(arrRecords)); // Update local storage
      iterateRecords();
    }
    
    function updateData(i) {
      const inputTxt = document.getElementsByTagName("input");
    
      inputTxt[0].value = arrRecords[i].fname;
      inputTxt[1].value = arrRecords[i].mname;
      inputTxt[2].value = arrRecords[i].lname;
      inputTxt[3].value = arrRecords[i].age;
    
      btnInsertUpdate.innerHTML = "Update";
      btnInsertUpdate.value = i; // Correctly set the button value using template literal
    }
    