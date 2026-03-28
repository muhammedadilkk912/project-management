import React from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { useDispatch,useSelector } from 'react-redux';
import { updateTask } from '../Redux/taskSlice';
import TaskCard from '../component/TaskCard';
const Dashboard = () => {

  const dispatch=useDispatch()
  const tasks=useSelector((state)=>state.tasks.tasks)
  // group tasks by status
  const columns = {
    todo: tasks.filter((t) => t.status === "todo"),
    progress: tasks.filter((t) => t.status === "progress"),
    test: tasks.filter((t) => t.status === "test"),
    completed: tasks.filter((t) => t.status === "completed"),
    reopen: tasks.filter((t) => t.status === "reopen"),
  };
  const columnTitles = {
  todo: "Need to Do",
  progress: "In Progress",
  test: "Need for Test",
  completed: "Completed",
  reopen: "Re-open",
};
  const onDragEnd = (result) => {
  if (!result.destination) return;

  const taskId = result.draggableId;
  const newStatus = result.destination.droppableId;

  const task = tasks.find((t) => t.id === taskId);

  dispatch(
    updateTask({
      ...task,
      status: newStatus,
    })
  );
};
  return (
      <DragDropContext onDragEnd={onDragEnd}>
  <div
    style={{
      display: "flex",
      gap: "20px",
      overflowX: "auto",
      padding: "10px",
    }}
  >
    {Object.entries(columns).map(([status, taskList]) => (
      <Droppable droppableId={status} key={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minWidth: "250px",
              background: "#f4f5f7",
              borderRadius: "10px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              maxHeight: "80vh",
            }}
          >
            {/* 🔹 Column Title */}
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
              {columnTitles[status]}
            </h3>

            {/* 🔹 Task List */}
            <div style={{ flexGrow: 1 }}>
              {taskList.map((task, index) => (
                <Draggable
                  draggableId={task.id}
                  index={index}
                  key={task.id}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        marginBottom: "10px",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    ))}
  </div>
</DragDropContext>
  )
}

export default Dashboard
