const { pool } = require("../../front/js/database");

exports.getUserRows = async function () {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectUserQuery = "SELECT * FROM Users;";
      const [row] = await connection.query(selectUserQuery);
      return row; //추가해야 함
    } catch (error) {
      console.error(`#### getUserRows Query error ######`);
      return false;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(`#### getUserRows DB error ######`);
    return false;
  }
};

exports.insertTodo = async function (userIdx, contents, type) {
  //DB연결
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const insertTodoQuery =
        "insert into Todos (userIdx, contents, type) values (?, ?, ?);";
      const insertTodoParams = [userIdx, contents, type];

      const [row] = await connection.query(insertTodoQuery, insertTodoParams);
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### insertTodo Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### insertTodo DB error ###### ${err}`);
    return false;
  }
};

exports.selectTodoByType = async function (userIdx, type) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectTodoByTypeQuery =
        "select todoIdx, contents, status from Todos where userIdx = ? and type =? and not(status  = 'D');";
      const selectTodoByTypeParams = [userIdx, type];

      const [row] = await connection.query(
        selectTodoByTypeQuery,
        selectTodoByTypeParams
      );
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### selectTodo Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### selectTodo DB error ###### ${err}`);
    return false;
  }
};

exports.selectValidTodo = async function (userIdx, todoIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const selectValidTodoQuery =
        "select * from Todos where userIdx = ? and todoIdx = ? and not(status='D');";
      const selectValidTodoParams = [userIdx, todoIdx];

      const [row] = await connection.query(
        selectValidTodoQuery,
        selectValidTodoParams
      );
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### selectTodo Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### selectTodo DB error ###### ${err}`);
    return false;
  }
};

exports.updateTodo = async function (userIdx, todoIdx, contents, status) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const updateTodoQuery =
        "update Todos set contents = ifnull(?, contents), status = ifnull(?, status) where userIdx = ? and todoIdx = ?;";
      const updateTodoParams = [contents, status, userIdx, todoIdx];

      const [row] = await connection.query(updateTodoQuery, updateTodoParams);
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### selectTodo Query error ###### \n ${err}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#### selectTodo DB error ###### ${err}`);
    return false;
  }
};

exports.deleteTodo = async function (userIdx, todoIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    try {
      const deleteTodoQuery =
        "update Todos set status = 'D' where userIdx = ? and todoIdx = ?;";
      const deleteTodoParams = [userIdx, todoIdx];

      const [row] = await connection.query(deleteTodoQuery, deleteTodoParams);
      connection.release();
      return row; //추가해야 함
    } catch (err) {
      console.error(`#### deleteTodo Query error ###### \n ${err}`);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(`#### deleteTodo DB error ###### ${err}`);
    return false;
  }
};
