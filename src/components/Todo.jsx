
import React, { useEffect, useState } from "react";
import "./Todo.css";
// import todoimg from "./images/todoImg.png";
import bAndwlogo from './images/bAndwlogo.png'

const getLocalItems = () => {
  let list = JSON.parse(localStorage.getItem("myList"));
  return list;
};

function Todo() {
  const [inputData, setInputData] = useState("");
  const [todo, setTodo] = useState(getLocalItems());
  const [toggle, setToggle] = useState(true);
  const [isEdit, setIsEdit] = useState(null);
  const [clearToggle, setClearToggle] = useState(true);
  const handleInput = (e) => {
    setInputData(e.target.value);
    //    console.log(e.target.value)
  };

  const addValue = () => {
    if (!inputData) {
      // alert("Write Something");
    } else if (inputData && !toggle) {
      setTodo(
        todo.map((elem) => {
          if (elem.id === isEdit) {
            return { ...elem, result: inputData };
          }

          return elem;
        })
      );
      setInputData("");
      setToggle(true);
      setClearToggle(true);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        result: inputData,
      };

      setTodo([...todo, allInputData]);
      console.log("allInputData Value is ", allInputData);
      setInputData("");
      setClearToggle(true);
    }
  };

  const deleteValue = (index) => {
    const updateData = todo.filter((elem) => {
      console.log("Iddd");
      return index !== elem.id;
    });
    setTodo(updateData);
  };

  const editValue = (index) => {
    const inputEdit = todo.find((elem) => {
      return index === elem.id;
    });
    setToggle(false);
    setInputData(inputEdit.result);
    setIsEdit(index);
  };

  const handleClearAll = () => {
    setTodo([]);
    setClearToggle(false);
  };

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(todo));
  }, [todo]);
  return (
    <div className="main_div">
      <div className="todo_contents">
        <div className="todo_content_inner">
          <h1>To-do List</h1>
          <img src={bAndwlogo} alt="" className="todo_logo" />
          <br />

          <span>
            <input type="text" value={inputData} onChange={handleInput} placeholder={'✍️ Add todo...'} />

            {toggle ? (
              <button className="add_btn" onClick={addValue}>
                Add+
              </button>
            ) : (
              <button className="add_btn" onClick={addValue}>
                Update
              </button>
            )}
          </span>

          {todo && todo.map((item) => (
            <div className="output_box" key={item.id}>
              <button className="add_btn" onClick={() => editValue(item.id)}>
                Edit
              </button>
              <h2 className="h2">{item.result}</h2>
              <button
                className="delete_btn"
                onClick={() => deleteValue(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
          <br />

          {clearToggle ? (
            <button className="clearAll_btn" onClick={handleClearAll}>Clear All</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
