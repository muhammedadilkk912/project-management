import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {  FaPlus } from 'react-icons/fa';
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import {addTask,updateTask}  from '../Redux/taskSlice'

import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

  // validation
   const schema = yup.object().shape({
    title: yup.string().required("Title is required"),

    description: yup.string().required("Description is required"),

    eta: yup.string().required("Date & time is required"),

    project: yup.string().required("Project is required"),

    employee: yup.string().required("Employee is required"),

    image: yup
  .mixed()
  .required("Image is required")
  .test("fileType", "Only PNG and JPG are allowed", (value) => {
    if (typeof value === "string") return true; // ✅ existing image

    if (!value || !value[0]) return false;
    return ["image/png", "image/jpeg"].includes(value[0].type);
  })
  .test("fileSize", "File size must be less than 2MB", (value) => {
    if (typeof value === "string") return true; // ✅ FIX HERE

    if (!value || !value[0]) return false;
    return value[0].size <= 2 * 1024 * 1024;
  }),
  });

const TaskForm = ({ open, onClose, editData }) => {


     const dispatch=useDispatch()
    const projects=useSelector((state)=>state.projects.projects)
    console.log("projects=",projects)
    const employees=useSelector((state)=>state.employees.employees)
  const { register, handleSubmit, formState: { errors }, reset, watch,setValue } = useForm({
    resolver:yupResolver(schema)
   
  });

  const [preview,setPreview]=useState(null)
     const [selectedProject,setSelectedProject]=useState(null)
        // 👉 Get selected project
  const project = projects.find((p) => p.id === selectedProject);

  // 👉 Filter employees based on project
  const filteredEmployees = employees.filter((emp) =>
    project?.employees?.includes(emp.id)
  );

  useEffect(()=>{
    console.log("edit data=",editData)
 if(editData){
  setValue('title',editData?.title)
  setValue('description',editData?.description)
  setValue('image',editData?.image)
  setPreview(editData?.image)
  setValue('eta',editData?.eta)
  setValue('project',editData?.project)
  setValue('employee',editData?.employee)
  setSelectedProject(editData?.project)
  
  
 }
  },[editData])

  useEffect(() => {
  if (editData && filteredEmployees.length > 0) {
    setValue('employee', editData.employee);
  }
}, [editData, filteredEmployees]);

  const normalizeDate = (date) => {
  const d = new Date(date);
  return d.getTime(); // convert to number
};
  
  const isChanged = (oldData, newData) => {
    console.log(oldData.image)
    console.log(preview)

  
  return (
     oldData.title !== newData.title ||
     oldData.description !== newData.description  
     || normalizeDate(oldData.eta) !==  normalizeDate(newData.eta)  
     || oldData.project !== newData.project
     || oldData.employee !== newData.employee
     || oldData.image !== preview
     
     
  );
};


  


  const onFormSubmit = (data) => {
    // console.log('Employee data:', data);
    

    if(editData){
      const obj={
        title:data.title,
        description:data?.description,
        eta:data?.eta,
        project:data.project,
        employee:data.employee,
        image:preview,
        status:editData.status
    }
       const result= isChanged(editData,data)
    console.log('result=',result)
    if(!result){
      toast.error("no changes detected")
      onClose()
      return null
    }
    obj.id=editData.id
    dispatch(updateTask(obj))
    toast.success('updated successfully')
    onClose()

    }else{
        const obj={
        title:data.title,
        description:data?.description,
        eta:data?.eta,
        project:data.project,
        employee:data.employee,
        image:preview
    }
    dispatch(addTask(obj))
    toast.success("taske added successfully")
    onClose();
    }
    // console.log(obj)
   

    //  return null
    
    // onSubmit?.(data);
    // reset();
    
  };

  console.log("filtered employees=",filteredEmployees)
  const handleImageChange=(e)=>{
    const file = e.target.files[0];

  if (file) {
    setPreview(URL.createObjectURL(file));
  }
  }
  console.log("selectedProject", selectedProject);
console.log("project", project);
console.log("filteredEmployees", filteredEmployees);
  if(!open ) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add Task</h2>
          <button
            className="hover:bg-slate-200 p-2 rounded-lg transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <FaXmark className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              {...register('title')}
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.title ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder=" create login page"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              {...register('description')}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.description ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder="create dynamic login page"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          {/* DateTime */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ETA *</label>
            <input
              {...register('eta')}
              type="datetime-local"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.eta ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
              }`}
            />  
            {errors.eta && <p className="mt-1 text-sm text-red-600">{errors?.eta.message}</p>}
          </div>

          {/* project Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">projects*</label>
            <select
              {...register('project')}
              onChange={(e)=>setSelectedProject(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.project ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option  value="">Select project</option>
             {
                projects.map((proj)=>{
                    console.log("pr=",proj)
                   return  (
                       <option key={proj.id}  value={proj.id}>{proj.title}</option>
                    )
                    
                    
                })
             }
            </select>
            {errors.project && <p className="mt-1 text-sm text-red-600">{errors.project.message}</p>}
          </div>

          {/* assign task to employee Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employees</label>
            <select
              {...register('employee')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.employee ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select employees</option>
              {
               filteredEmployees.map((emp,ind)=>{
               return  (
                <option key={ind} value={emp.id}>{emp.name}</option>

                )
                
               })

              }
            </select>
            {errors.employee && <p className="mt-1 text-sm text-red-600">{errors.employee.message}</p>}
          </div>

          {/* referecne image */}
          <div className="flex flex-col space-y-2">
  <label>Image</label>

  <input
    type="file"
    accept="image/png, image/jpeg"
     {...register("image", {
    onChange: (e) => {
      handleImageChange(e); // preview
    },
  })}
    className="w-full border border-slate-300 p-2 rounded bg-gray-50 
               file:mr-3 file:py-1 file:px-3 
               file:border-0 file:bg-blue-500 file:text-white 
               file:rounded file:cursor-pointer hover:file:bg-blue-600"
  />
   {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
   {preview && (
  <img
    src={preview}
    alt="Preview"
    className="w-20 h-20   object-cover rounded border"
  />
)}
 
</div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-all border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm flex items-center justify-center space-x-2"
            >
             {!editData && <FaPlus className="w-4 h-4" />}
              <span>{editData? "Update Employee":"Add Employee"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
