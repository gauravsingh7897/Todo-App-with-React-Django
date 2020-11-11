import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";

function App() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    todoGet();
  }, [list]);

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const todoGet = () => {
    fetch("http://127.0.0.1:8000/todo-list/")
      .then((response) => response.json())
      .then((data) => setList(data));
  };

  const todoSubmit = (e) => {
    e.preventDefault();
    var csrftoken = getCookie("csrftoken");
    var url = "http://127.0.0.1:8000/todo-create/";
    if (id) {
      url = `http://127.0.0.1:8000/todo-update/${id}/`;
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ title: title, detail: description }),
    })
      .then((response) => {
        setId("");
        setTitle("");
        setDescription("");
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
  };

  const todoDelete = (todo) => {
    var csrftoken = getCookie("csrftoken");

    fetch(`http://127.0.0.1:8000/todo-delete/${todo.id}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    }).then((response) => {
      todoGet();
    });
  };

  const todoUpdate = (todo) => {
    setTitle(todo.title);
    setDescription(todo.detail);
    setId(todo.id);
  };

  return (
    <>
      <div className="ui fluid container">
        <h2
          className="ui header"
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Todo App
        </h2>
        <form onSubmit={todoSubmit}>
          <div className="ui form form">
            <div className="fields fields">
              <div className="field textfield">
                <input
                  onChange={titleChange}
                  value={title}
                  type="text"
                  placeholder="Add Todo"
                  name="title"
                ></input>
              </div>
              <div className="field textfield">
                <textarea
                  rows="10"
                  onChange={descriptionChange}
                  value={description}
                  placeholder="Add Description"
                  name="description"
                ></textarea>
              </div>
              <div className="field submitbutton">
                <button
                  type="submit"
                  className="ui primary button"
                  style={{ marginBottom: "20px" }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="ui container">
          <div className="ui section divider"></div>
          {list.map(function (todo, index) {
            return (
              <div key={index}>
                <div className="delete">
                  <h3 className="ui header">{todo.title}</h3>
                  <div className="delete">
                    <button
                      type="submit"
                      onClick={() => todoUpdate(todo)}
                      className="ui green button"
                      style={{ marginBottom: "20px" }}
                    >
                      Update
                    </button>
                    <button
                      type="submit"
                      onClick={() => todoDelete(todo)}
                      className="ui orange button"
                      style={{ marginBottom: "20px" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p>{todo.detail}</p>
                <div className="ui section divider"></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
