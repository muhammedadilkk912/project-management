import React, { useState } from 'react'
import { FaUserPlus } from 'react-icons/fa'
import TaskForm from '../component/TaskForm'

import { FaEye,FaEdit , } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { FaCircleCheck, FaXmark } from 'react-icons/fa6';
import { useSelector,useDispatch } from 'react-redux';
import {deleteTask} from '../Redux/taskSlice'
import Confirm_modal from '../component/Confirm_model';
import toast from 'react-hot-toast';


const Task = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData,setEditData]=useState(null) 
  
  const dispatch=useDispatch()
  const tasks=useSelector((state)=>state?.tasks?.tasks)
  const employee=useSelector((state)=>state.employees.employees)
  const project=useSelector((state)=>state.projects.projects)
  console.log("taks",tasks)
    const [open,setOpen]=useState(false)
     const [tasks1] = useState([
    {
      id: 1,
      title: 'Fix login authentication bug',
      description: 'User cannot login with correct credentials. Check JWT token validation.',
      status: 'in-progress',
      employee: { name: 'Muhammed Adil', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
      deadline: '2026-03-30',
      project: 'ShiftSync Attendance'
    },
    {
      id: 2,
      title: 'Design new dashboard UI',
      description: 'Create responsive Kanban view for task management.',
      status: 'completed',
      employee: { name: 'Sarah Johnson', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=40&h=40&fit=crop&crop=face' },
      deadline: '2026-03-25',
      project: 'Employee Portal'
    },
    // Add more...
  ]);    

  const [search, setSearch] = useState('');
  const [viewTask, setViewTask] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const filteredTasks = tasks?.filter(task =>  
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.project.toLowerCase().includes(search.toLowerCase()) 
  );

  console.log("view task=",viewTask)



  const statusConfig = {
    'todo': { label: 'To Do', color: 'bg-orange-100 text-orange-800' },
    'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
    'need-for-test': { label: 'Testing', color: 'bg-yellow-100 text-yellow-800' },
    'completed': { label: 'Done', color: 'bg-green-100 text-green-800' },
    're-open': { label: 'Re-open', color: 'bg-red-100 text-red-800' }
  };
  const formatDate = (date) => {
        console.log("inside the data form ")  
        console.log("datesakfd ",date)  
  const d = new Date(date);

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

 const confirmDelete =()=>{
    console.log("inide the delete")
    dispatch(deleteTask(taskToDelete))
    setIsModalOpen(false);
    toast.success('task deleted successfully')
  setTaskToDelete(null)
  }

  return (
    <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task</h1>
              <p className="text-gray-500">Assign task to  team members</p>
            </div>
            <button 
            onClick={()=>setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 shadow-sm hover:shadow-md transition-all">
              <FaUserPlus />
              <span>Create Tasks</span>
            </button>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks?filteredTasks?.map((task) => {
          const status = statusConfig[task?.status];
          const emp=employee.find((val)=>val.id == task.employee);
          const prj=project.find((val)=>val.id == task.project)
          // console.log("emp details",employee)
          console.log("tt",task)
          return (
            <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all p-6">
              {/* Status Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${status?.color}`}>
                <FaCircleCheck className="w-3 h-3 mr-1" />
                <span>{task?.status}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{task?.title}</h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-3">{task?.description}</p>

              {/* Meta Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                 
                    
                         <img src={emp?.image} alt={emp?.name} className="w-8 h-8 rounded-full mr-2" />
                  <span>{emp?.name}</span>

                 
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CiClock2 className="w-4 h-4 mr-1" />
                  <span>Due: {formatDate(task.eta)}</span>
                </div>
                <div className="text-sm font-medium text-gray-900 truncate">{prj?.title}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                <button
                   onClick={() => 
                    { 
                     
                        setViewTask({
      ...task,
      projectDetails: prj,
      employeeDetails: emp,
    });}}
                  className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center space-x-1 text-sm"
                >
                  <FaEye />
                  <span>View</span>
                </button>
                <button 
                onClick={()=>{
                  setOpen(true)
                  setEditData(task)
                }}
                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                  <FaEdit className="w-4 h-4" />
                </button>

                <button
                  onClick={()=>{setIsModalOpen(true)
                 setTaskToDelete(task.id)
                }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <MdDeleteOutline 
                 
                  className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        }):(
          <div className='flex justify-center items-center'>
            <p>tasks not found</p>
          </div>
        )}
      </div>
       {/* View Details Modal */}
      {viewTask && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{viewTask?.title}</h2>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${statusConfig[viewTask?.status].color}`}>
                    {statusConfig[viewTask?.status].label}
                  </div>
                </div>
                <button onClick={() => setViewTask(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <FaXmark className="w-5 h-5" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-gray-700 whitespace-pre-wrap mb-6">{viewTask?.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <img src={viewTask.employeeDetails.image} alt={viewTask?.employeeDetails.name} className="w-12 h-12 rounded-full mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{viewTask?.employeeDetails?.name}</div>
                        
                      </div>
                     
                    </div>
                     <div className='flex text-xl'>
                        <h3 className='text-xl'>project:-</h3>
                        <div className="font-medium ">{viewTask?.projectDetails.title}</div>
                      </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <CiClock2 className="w-4 h-4 mr-2" />
                      Deadline: <span className="ml-1 font-medium text-gray-900">{viewTask?.eta}</span>
                    </div>
                    <div className='flex '>

                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Add attachments, comments, sub-tasks here */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Actions</h4>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Update Status</button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Add Comment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

          {
            open &&                 <TaskForm open={open} onClose={()=>{setOpen(false), setEditData(null)}} editData={editData} />


          }
                  <Confirm_modal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false),setTaskToDelete(null)}} onConfirm={confirmDelete} title='Delete Task'/>

    
      
    </div>
  )
}

export default Task
