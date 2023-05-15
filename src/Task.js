import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = ({ taskObj, onComplete }) => {

  function handleCompleteClick() {
    onComplete(taskObj.id);
    toast.success("Görev tamamlandı!");
  }

  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <p>{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>{p}</span>
        ))}
      </div>
      {onComplete && <button onClick={(handleCompleteClick)}>Tamamlandı</button>}
    </div>
  );
};

export default Task;
