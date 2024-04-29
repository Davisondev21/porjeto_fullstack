const tbody = document.querySelector("tbody");
const fetchTasks = async () => {
  const response = await fetch("http://localhost:3333/tasks");
  const tasks = await response.json();
  return tasks;
};

const createElement = (tag, innerText = "", innerHTML = "") => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
};

const creatSelect = (value) => {
const options = `
  <option value="pendente">pendente</option>
  <option value="em andamento">em andamento</option>
  <option value="concluida">concluida</option>
`;

  const select = createElement ('select', '', options);

  select.value = value

  return select
}



const createRow = (task) => {
  const { id, title, created_at, status } = task;

  const tr = createElement("tr");
  const tdTitle = createElement("td", title);
  const tdCreateAt = createElement("td", created_at);
  const tdStatus = createElement("td");
  const tdActions = createElement("td");

const select = creatSelect(status);

  const editButton = createElement(
    "button",
    "",
    "<span class='material-symbols-outlined'>edit</span>"
  );
  const deleteButton = createElement(
    "button",
    "",
    "<span class='material-symbols-outlined'>delete  <span>"
  );

  editButton.classList.add("btn-action");
  deleteButton.classList.add("btn-action");

  tdStatus.appendChild(select)

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreateAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr
};

const loadTasks
l