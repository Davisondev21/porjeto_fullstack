const tbody = document.querySelector("tbody");
const addForm = document.querySelector(".add-form");
const inputTask = document.querySelector(".input-task");
const fetchTasks = async () => {
  const response = await fetch(`${API}/tasks`);
  const tasks = await response.json();
  return tasks;
};

const addTask = async (event) => {
  event.preventDefault();

  const task = { title: inputTask.value };

  await fetch(`${API}/tasks`, {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(task),
    
  });

  loadTasks();
  inputTask.value = "";
};

const formatDate = (dateUTC) => {
  const options = { dateStyle: "short", timeStyle: "short" };
  const date = new Date(dateUTC).toLocaleString("pt-br", options);
  return date;
};

const deleteTask = async (id) => {
  await fetch(`${API}/tasks/${id}`, {
    method: "delete",
  });
  loadTasks();
};
  
const updateTask = async ({ id, title, status }) => {
  await fetch(`${API}/tasks/${id}`, {
    method: "put",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ title, status }),
  });

  loadTasks();
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

  const select = createElement("select", "", options);

  select.value = value;

  return select;
};

const createRow = (task) => {
  const { id, title, created_at, status } = task;

  const tr = createElement("tr");
  const tdTitle = createElement("td", title);
  const tdCreateAt = createElement("td", formatDate(created_at));
  const tdStatus = createElement("td");
  const tdActions = createElement("td");

  const select = creatSelect(status);

  select.addEventListener("change", ({ target }) =>
    updateTask({ ...task, status: target.value })
  );

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

  const editForm = createElement("form");
  const editInput = createElement("input");

  editInput.value = title;
  editForm.appendChild(editInput);

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    updateTask({ id, title: editInput.value, status });
  });

  editButton.addEventListener("click", () => {
    tdTitle.innerText = "";
    tdTitle.appendChild(editForm);
  });

  editButton.classList.add("btn-action");
  deleteButton.classList.add("btn-action");

  deleteButton.addEventListener("click", () => deleteTask(id));
  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreateAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

const loadTasks = async () => {
  const tasks = await fetchTasks();

  tbody.innerHTML = "";

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
};

addForm.addEventListener("submit", addTask);

loadTasks();
