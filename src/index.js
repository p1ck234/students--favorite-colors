const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const colorInputElement = document.getElementById("color-input");

const students = [
  {
    name: "Глеб",
    color: "#ff2600",
  },
  {
    name: "Иван",
    color: "#00f900",
  },
  {
    name: "Люси",
    color: "#0432ff",
  },
];

const initEventListener = () => {
  const studensElements = document.querySelectorAll(".student");
  for (const studentElement of studensElements) {
    studentElement.addEventListener("click", () => {
      let color = studentElement.dataset.color;
      alert(`Любимый цвет: ${color}`);
    });
  }
};

const initDeleteButtons = () => {
  const deleteButtonsElements = document.querySelectorAll(".button__delete");
  for (const deleteButton of deleteButtonsElements) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("Удаляюсь...");
      const index = deleteButton.dataset.index;
      students.splice(index, 1);
      renderStudents();
    });
  }
};

const renderStudents = () => {
  const studentsHTML = students
    .map((student, index) => {
      return `<li class="student" data-color="${student.color}">
        <p class="student-name">
          ${student.name} </p>
        <button data-index="${index}" class="button button__delete">Удалить</button>
      </li>`;
    })
    .join("");
  listElement.innerHTML = studentsHTML;

  initEventListener();
  initDeleteButtons();
};

renderStudents();
buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("input-error");

  if (nameInputElement.value === "") {
    nameInputElement.classList.add("input-error");
    return;
  }
  students.push({
    name: nameInputElement.value
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;"),
    color: colorInputElement.value,
  });

  renderStudents();

  nameInputElement.value = "";
});
