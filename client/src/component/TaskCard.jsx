import React from "react";
import { useSelector } from "react-redux";

const statusColors = {
  todo: "bg-orange-100 text-orange-800",
  progress: "bg-blue-100 text-blue-800",
  test: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  reOpen: "bg-red-100 text-red-800",
};

const statusConfig = {
  todo: "To Do",
  progress: "In Progress",
  test: "Testing",
  completed: "Completed",
  reOpen: "Re-open",
};

const TaskCard = ({ task }) => {
  const employees = useSelector((state) => state.employees.employees);
  const projects = useSelector((state) => state.projects.projects);

  const emp = employees.find((empl) => empl.id === task.employee);
  const prj = projects.find((prj) => prj.id === task.project);

  const formatDate = (date) => {
    console.log("inside the data form");
    console.log("datesakfd ", date);
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow p-3 max-w-[300px] mx-auto">
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{task?.title}</h3>

      {/* Task Image */}
      {task?.image && (
        <div className="mb-2">
          <img
            src={task.image}
            alt={task.title}
            className="w-full h-16 object-cover rounded"
          />
        </div>
      )}

      {/* Employer */}
      <div className="flex items-center space-x-2 mb-2">
        <img
          src={emp?.image}
          alt={emp?.name}
          className="w-6 h-6 rounded object-cover"
        />
        <span className="text-xs font-medium text-gray-700">{emp?.name}</span>
      </div>

      {/* Project and ETA */}
      <div className="space-y-1 mb-2 text-xs text-gray-600">
        <p>
          <span className="font-medium">Project:</span> {prj?.title}
        </p>
        <p>
          <span className="font-medium">ETA:</span> {formatDate(task?.eta)}
        </p>
      </div>

      {/* Status Badge */}
      <span
        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[task?.status]}`}
      >
        {statusConfig[task?.status]}
      </span>
    </div>

  );
};

export default TaskCard;
