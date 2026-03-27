"use client"; // For Next.js App Router
import React, { useState, useCallback } from 'react';
import { FaHome, FaFilter, FaUser, FaCalendarAlt } from 'react-icons/fa';


const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Fix login bug', assignee: 'Muhammed A.', eta: 'Mar 28', project: 'ShiftSync', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop', column: 'need-to-do' },
    { id: 2, title: 'Design attendance UI', assignee: 'Adil KK', eta: 'Mar 30', project: 'ShiftSync', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop', column: 'in-progress' },
    { id: 3, title: 'API integration', assignee: 'Team Lead', eta: 'Done', project: 'Attendance', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=50&h=50&fit=crop', column: 'completed' },
    // Add more sample tasks...
  ]);

  const [filterProject, setFilterProject] = useState('All');
  const [draggedTask, setDraggedTask] = useState(null);

  const columns = ['need-to-do', 'in-progress', 'need-for-test', 'completed', 're-open'];
  const columnLabels = {
    'need-to-do': 'Need to Do',
    'in-progress': 'In Progress',
    'need-for-test': 'Need for Test',
    'completed': 'Completed',
    're-open': 'Re-open'
  };

  const projects = ['All', 'ShiftSync', 'Attendance'];

  const handleDragStart = useCallback((e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e, targetColumn) => {
    e.preventDefault();
    if (draggedTask) {
      setTasks(tasks.map(task =>
        task.id === draggedTask.id ? { ...task, column: targetColumn } : task
      ));
      setDraggedTask(null);
    }
  }, [draggedTask, tasks]);

  const filteredTasks = tasks.filter(task => filterProject === 'All' || task.project === filterProject);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <FaHome className="w-8 h-8 text-gray-500" />
          <h1 className="text-3xl font-bold text-gray-900">Dashboard View</h1>
        </div>
        <div className="flex items-center space-x-2">
          <FaFilter className="w-5 h-5 text-gray-500" />
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {projects.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 min-h-[600px]">
        {columns.map((column) => (
          <div
            key={column}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 min-h-[400px] hover:shadow-md transition-shadow"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column)}
          >
            <h3 className="font-semibold text-lg text-gray-900 mb-4 capitalize">{columnLabels[column]}</h3>
            <div className="space-y-3">
              {filteredTasks
                .filter(task => task.column === column)
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:shadow-lg cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02]"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <div className="flex items-start space-x-3">
                      <img src={task.image} alt={task.assignee} className="w-10 h-10 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{task.title}</h4>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <FaUser className="w-4 h-4 mr-1" />
                          {task.assignee}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <FaCalendarAlt className="w-4 h-4 mr-1" />
                          ETA: {task.eta}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{task.project}</p>
                      </div>
                    </div>
                  </div>
                ))}
              {filteredTasks.filter(task => task.column === column).length === 0 && (
                <div className="text-center py-8 text-gray-400">Drop tasks here</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
