import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaTrash,FaEdit } from 'react-icons/fa';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import {deleteProject} from '../Redux/projectSlice'
import toast from 'react-hot-toast';


const ProjectCard = ({data,handleEdit}) => {
    const dispatch=useDispatch()
   
    const employees=useSelector((state)=>state.employees.employees)
    
    console.log(data)




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
    
  return (
    <div className="bg-white border relative border-gray-200 h-64 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col justify-between">
  
  {/* Top section */}
  <div>
    <div className='flex gap-3 absolute top-2 items-center right-3 justify-end'>
      <button className='text-blue-500 cursor-pointer bg-blue-100 rounded-full p-1'
       onClick={()=>handleEdit(data)}
      >
        <CiEdit className='h-4 w-4'
       
        />
      </button>
      <button 
       onClick={()=>{
            console.log("inside the ")
            dispatch(deleteProject(data.id))
            toast.success('project deleted successfully')
        }}  
      className='text-red-500 cursor-pointer bg-red-100 rounded-full p-1'>
        <MdDelete className='h-4 w-4'/>
      </button>
    </div>

    <div className="flex items-start space-x-4 mt-3 mb-4">
      <img 
        src={data?.logo} 
        alt="Logo" 
        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0 overflow-hidden">
        <h3 className="text-xl font-bold text-gray-900 truncate">
          {data?.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {data?.description}
        </p>
      </div>
    </div>
  </div>

  {/* Bottom section */}
  <div>
    <div className="space-y-1 mb-2">
      <p className="text-sm text-gray-500">
        <span className="font-medium">Start:</span>{" "}
        {data?.startDate && formatDate(data.startDate)}
      </p>

      <p className="text-sm text-gray-500">
        <span className="font-medium">End:</span>{" "}
        {data?.endDate && formatDate(data.endDate)}
      </p>  
    </div>

    <div>
      <p className="text-sm font-medium text-gray-900 mb-2">Team:</p>
      <div className="flex -space-x-2 overflow-hidden">
        {employees
          .filter(emp => data?.employees?.includes(emp.id))
          .map((emp, i) => (
            <img
              key={emp.id}
              src={emp.image}
              alt={emp.name}
              className="w-8 h-8 rounded-full border-2 border-white shadow-md bg-gray-200"
            />
        ))}
      </div>
    </div>
  </div>

</div>
  )
}

export default ProjectCard
