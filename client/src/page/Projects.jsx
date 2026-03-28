import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import Project_Form from '../component/Project_From';
import { useSelector } from 'react-redux';
import ProjectCard from '../component/ProjectCard';
const Projects = () => {
    const [open,setOpen]=useState(false)
    const projects=useSelector((state)=>state.projects.projects)
    const [editData,setEditData]=useState(null)

    const handleEdit=(data)=>{
      console.log("inside the edit data",data)
      setEditData(data)
      setOpen(true)
    }
  return (
    <div className='space-y-4 p-4 '>
        <div className='flex items-center justify-between'>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
             <button 
                    onClick={()=>setOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 shadow-sm hover:shadow-md transition-all">
                      <IoMdAdd />
                      <span>Add Project</span>
                    </button>

        </div>
        {
          projects?.length > 0 ?(
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>  
              {
                projects.map((project)=>(
                  <ProjectCard key={project.id} data={project} handleEdit={handleEdit}/>
                ))
              }
            </div>

          ):(
            <div className='text-center py-10'>
              <p className='text-gray-500'>No projects found.</p>
            </div>

          )  
        }
        {
            open && <Project_Form isOpen={open} onClose={()=>{setOpen(false),setEditData(null)}} editData={editData} />
        }
      
    </div>   
  )
}

export default Projects
