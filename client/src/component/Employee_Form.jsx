import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { addEmployee,updateEmployee} from '../Redux/employeeSlice'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

const schema = yup.object({
 
  name: yup.string().required("Name is required"),
  position: yup.string().required("Position is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileType", "Only JPG/PNG allowed", (value) => {
      return (  
        value &&
        value[0] &&
        ["image/jpeg", "image/png"].includes(value[0].type)
      );
    })
    .test("fileSize", "Max size is 2MB", (value) => {
      return value && value[0] && value[0].size <= 2 * 1024 * 1024;
    }),
});

const editSchema = yup.object({
  name: yup.string().required("Name is required"),
  position: yup.string().required("Position is required"),
  email: yup.string().email().required("Email is required"),

  image: yup
    .mixed()
    .test("fileType", "Only JPG/PNG allowed", (value) => {
      // ✅ If no new image → allow
      if (!value || value.length === 0) return true;

      return ["image/jpeg", "image/png"].includes(value[0].type);
    })
    .test("fileSize", "Max size is 2MB", (value) => {
      // ✅ If no new image → allow
      if (!value || value.length === 0) return true;

      return value[0].size <= 2 * 1024 * 1024;
    }),
});

const Employee_Form = ({ isOpen, onClose,editData }) => {
   const employees=useSelector((state)=>state.employees.employees)
  console.log("edit data in form",editData)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editData ? editSchema:schema),
  });
    useEffect(() => {
  if (editData) {
    setValue("name", editData.name);
    setValue("position", editData.position);
    setValue("email", editData.email);
    // setValue("image",editData.image)
    setPreview(editData.image)
  }
}, [editData]);


  const onSubmit = async (data) => {
    console.log("form data",data)
    console.log("edit data",editData)
   
    // return null
    try {
      setLoading(true);
      let imageUrl = editData?.image;

      if (data.image && data.image.length > 0) {
       const file = data.image[0];
        imageUrl = URL.createObjectURL(file);
       }

    const employeeData = {
      name: data.name,
      position: data.position,
      email: data.email,
      image: imageUrl,
    };
    const isDuplicate = employees.some(
  (emp) =>
    emp.email === data.email &&
    emp.id !== editData?.id   // important for edit
);
if(isDuplicate){
  toast.error("Employee with this email already exist")
  return null
}else{
  console.log("inside employye email chec")
}
     if (editData) {
      const isChanged =
        employeeData.name !== editData.name ||
        employeeData.position !== editData.position ||
        employeeData.email !== editData.email ||
        employeeData.image !== editData.image;
        console.log("is changeed",isChanged)

      if (!isChanged) {
      
        toast.error("no changes detected")
        // return;
      }
      employeeData.id=editData.id

      dispatch(updateEmployee(employeeData));
      toast.success("Employee data updated successfully")
    } else {
      dispatch(addEmployee(employeeData));
      toast.success("employee added successfully")
    }
    //    if(editData){
    //     let imageUrl=editData.image
    //   if(data.image && data.image.length > 0){
    //     const file = data.image[0];
    //      imageUrl=URL.createObjectURL(file)
        
    //   }
    // }

    //   else{
    //      const file = data.image[0];
    //   const imageUrl = URL.createObjectURL(file);
    //   const employeeData = {
    //     name: data.name,
    //     position: data.position,
    //     email: data.email,
    //     image: imageUrl,
    //   };

    //   dispatch(addEmployee(employeeData));


    //   }

     
      //  setPreview(imageUrl);

    //   const formData = new FormData();
    //   formData.append("file", file);
    //   formData.append("upload_preset", "your_preset");

    //   const res = await fetch(
    //     "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );

    //   const result = await res.json();

      
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setPreview(URL.createObjectURL(file));
  }
};
if (!isOpen) return null;


  



  

  return (
    <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 flex justify-center items-center">
      <div className="bg-white shadow-2xl p-5 rounded-lg min-w-1/3">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Add Employee</h2>
          <button
            className="hover:bg-slate-300 p-1 rounded-md"
            onClick={onClose}
          >
            <FaXmark className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

          <div className="flex flex-col space-y-2">
  <label>Name</label>

  <input
    type="text"
    placeholder="Enter name"
    {...register("name")}
    className="w-full border border-slate-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
  />

  <p className="text-red-500 text-sm">{errors.name?.message}</p>
</div>
 <div className="flex flex-col space-y-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full border focus:ring-2 focus:ring-blue-500 outline-none border-slate-300 p-2 rounded"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>


         <div className="flex flex-col space-y-2">
            <label>Position</label>
           
            <input
              type="text"
              placeholder="Position"
              {...register("position")}
              className="w-full border focus:ring-2 focus:ring-blue-500 outline-none border-slate-300 p-2 rounded"
            />
            <p className="text-red-500 text-sm">{errors.position?.message}</p>
          </div>

         
          <div className="flex flex-col space-y-2">
  <label>Image</label>

  <input
    type="file"
    accept="image/png, image/jpeg"
    {...register("image")}
     onChange={(e) => {
    handleImageChange(e); // preview logic
  }}
    className="w-full border border-slate-300 p-2 rounded bg-gray-50 
               file:mr-3 file:py-1 file:px-3 
               file:border-0 file:bg-blue-500 file:text-white 
               file:rounded file:cursor-pointer hover:file:bg-blue-600"
  />
   {preview && (
  <img
    src={preview}
    alt="Preview"
    className="w-20 h-20   object-cover rounded border"
  />
)}
 

  <p className="text-red-500 text-sm">{errors.image?.message}</p>
</div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Uploading..." : editData?"Update":"Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Employee_Form;