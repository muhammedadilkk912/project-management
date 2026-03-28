import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import {addProject,updateProject}  from '../Redux/projectSlice'
import toast from "react-hot-toast";


const schema = yup.object({
  title: yup.string().required("Title is required"),

  description: yup.string().required("Description is required"),

  startDate: yup.date().required("Start date is required"),

  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDate"), "End date must be after start date"),

  employees: yup
  .array()
  .of(yup.string())
  .min(1, "Select at least one employee")
  .required("Employees are required"),
  logo: yup
  .mixed()
  .required("Logo is required")
  .test("fileOrUrl", "Only jpg/png allowed", (value) => {

    // ✅ If it's URL (edit mode)
    if (typeof value === "string") return true;

    // ❌ If empty
    if (!value || !value[0]) return false;

    // ✅ File type check
    return ["image/jpeg", "image/png"].includes(value[0].type);
  })
  .test("fileSize", "Max size is 2MB", (value) => {

    // ✅ If URL, skip size check
    if (typeof value === "string") return true;

    if (!value || !value[0]) return false;

    return value[0].size <= 2 * 1024 * 1024;
  })
});

const Project_Form = ({ isOpen, onClose,editData }) => {
  const employees = useSelector((state) => state.employees.employees);
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
    employees: [], // ✅ IMPORTANT
  },
  });
  console.log("values",register.employees)
  const selectedEmployees = watch("employees") || [];
  console.log("selected employees",selectedEmployees)
  const [preview,setPreview]=useState(null)

  useEffect(()=>{
    console.log("edit data in form ",editData)
    if(editData){
      console.log("edit data date",editData.startDate)
      setValue("title",editData.title)
      setValue("description",editData.description)
      setValue("startDate",formatDateTimeLocal(editData.startDate))
      setValue("endDate",formatDateTimeLocal(editData.endDate))
      setValue("employees",editData.employees)
      setPreview(editData.logo)
      setValue("logo", editData.logo);

    }
  },[editData])

  const normalizeDate = (date) => {
  const d = new Date(date);
  return d.getTime(); // convert to number
};


  const isChanged = (oldData, newData) => {

    //  console.log("data result=",normalizeDate(oldData.startDate) == normalizeDate(newData.startDate))
    //  console.log(oldData.startDate,"="+newData.startDate)
    //  console.log(typeof newData.startDate)
    // console.log(oldData.startDate,"="+new Date(newData.startDate).toISOString())
    // console.log("old datan title=",oldData.title+"="+newData.title)
  return (
     oldData.title !== newData.title ||
     oldData.description !== newData.description  ||
     normalizeDate(oldData.startDate) !==  normalizeDate(newData.startDate)  ||
      normalizeDate(oldData.endDate) !==  normalizeDate(newData.endDate)  ||
     JSON.stringify(oldData.employees) !== JSON.stringify(newData.employees) ||
     oldData.logo !== newData.logo
  );
};

  const onSubmit = (data) => {

    console.log("current data",data)
    console.log("edit data",editData)

      const obj={
      title:data.title,
      description:data.description,
      startDate:data.startDate,
      endDate:data.endDate,
      employees:selectedEmployees,
      logo:preview
    }
    console.log("obj=",obj)
      if(editData){
         const result=isChanged(editData,data)
         console.log("result=",result)
        if(!result){
          toast.error("no changes made")
          onClose()
          return;
        }
        obj.id=editData.id
        dispatch(updateProject(obj))
      toast.success('updated successfully')

      }else{
        console.log("inside the add project")
               dispatch(addProject(obj))
    console.log("dispatched successfully")
    toast.success("project added successfully")
        
      }
    
  onClose()
 



  };

  const formatDateTimeLocal = (date) => {
  const d = new Date(date);

  const pad = (n) => String(n).padStart(2, "0");

  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
//   const selectedEmployees = watch("employees") || [];
//   console.log("selected employees",selectedEmployees)
const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setPreview(URL.createObjectURL(file));
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
      <div className="bg-white shadow-2xl p-5 rounded-lg md:min-w-1/3">

        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Add Projects</h2>
          <button
            className="hover:bg-slate-300 p-1 rounded-md"
            onClick={onClose}
          >
            <FaXmark className="h-5 w-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Title */}
          <div className="flex flex-col space-y-1 ">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter title"
              {...register("title")}
              className="w-full border focus:ring-2 focus:ring-blue-500 outline-none border-slate-300 p-2 rounded"
            />
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-1 " >
            <label >Description</label>
            <textarea
              placeholder="Enter description"
              {...register("description")}
              className="w-full border focus:ring-2 focus:ring-blue-500 outline-none border-slate-300 p-2 rounded"
            />
            <p className="text-red-500 text-sm">
              {errors.description?.message}
            </p>
          </div>

          {/* Start Date */}
          <div className="flex flex-col space-y-1 ">
            <label>Start Date</label>
            <input
              type="datetime-local"
              {...register("startDate")}
              className="w-full border focus:ring-2 focus:ring-blue-500 outline-none border-slate-300 p-2 rounded"
            />
            <p className="text-red-500 text-sm">
              {errors.startDate?.message}
            </p>
          </div>

          {/* End Date */}
          <div className="flex flex-col space-y-1 ">
            <label>End Date</label>
            <input
             type="datetime-local"
              {...register("endDate")}
              className="w-full border focus:ring-2 focus:ring-blue-500 outline-none border-slate-300 p-2 rounded"
            />
            <p className="text-red-500 text-sm">
              {errors.endDate?.message}
            </p>
          </div>

          {/* Logo */}
          <div className="flex flex-col space-y-1 ">
            <label>Logo</label>
            <input
              type="file"
              {...register("logo")}
              onChange={(e)=>
                handleImageChange(e)
              }
               className="w-full border border-slate-300 p-2 rounded bg-gray-50 
               file:mr-3 file:py-1 file:px-3 
               file:border-0 file:bg-blue-500 file:text-white 
               file:rounded file:cursor-pointer hover:file:bg-blue-600"
  
            />
            <p className="text-red-500 text-sm">{errors?.logo?.message}</p>
            {preview && (
  <img
    src={preview}
    alt="Preview"
    className="w-20 h-20   object-cover rounded border"
  />
)}
          </div>

          {/* Employees Multi Select */}
          <div className="flex flex-col space-y-2">
  <label>Select Employees</label>

  <select
   value="" 
    // multiple
    //  {...register("employees")}
    onChange={(e)=>{
      const value=e.target.value;
       
      let updated;
      if (!selectedEmployees.includes(value)) {
      // remove if already selected
     updated = [...selectedEmployees, value]
     setValue("employees", updated);
      }

        
        
    }}
    className="w-full border focus:ring-2 focus:ring-blue-500 outline-none border-slate-300 p-2 rounded "
  >
    <option disabled value="">select employees</option>
    {employees?.map((emp) => ( 
      <option key={emp.id} value={emp.id}>
        {emp.name}
      </option>
    ))}
  </select> 

  <p className="text-red-500 text-sm">
    {errors.employees?.message}
  </p>
</div>

{/* Selected Employees Chips */}
<div className="flex flex-wrap gap-2 mt-2">
  {employees  
    ?.filter((emp) => selectedEmployees?.includes(String(emp.id)))
    .map((emp) => (
      <div
        key={emp.id}
        className="px-3 py-1 relative flex items-center bg-blue-100 text-blue-700 rounded-full text-sm"
      >
        {emp.name}
        <button
          onClick={() =>{
            let updatedIds=selectedEmployees.filter((id)=>id !== emp.id)
            console.log("updated ids",updatedIds)
            setValue("employees",updatedIds)
          }
           
          }
          className=" absolute cursor-pointer bg-red-100 rounded right-0 bottom-5 text-red-500 "
        >
          <FaXmark className="h-4 w-4"/>
        </button>
      </div>
    ))}
</div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default Project_Form;