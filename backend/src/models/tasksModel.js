const conection = require("./conection");

const getAll = async () => {
  const [tasks] = await conection.execute("SELECT * FROM tasks");
  return tasks;
};

const creatTask = async (task) =>{

const{title} = task;

const query = 'INSERT INTO tasks(tile, status, created_at)values(?, ?, ?)';

const createdTask = await Connection.execute(query,[title, pendente, ])
}

module.exports = {
  getAll,
  creatTask
};
