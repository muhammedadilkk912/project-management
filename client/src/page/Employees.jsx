"use client"; // Next.js App Router
import React, {  useState } from 'react';
import { FaUserPlus, FaEdit, FaTrash, FaSearch, FaUser } from 'react-icons/fa';
import Employee_Form from '../component/Employee_Form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {deleteEmployee} from '../Redux/employeeSlice'
import Confirm_modal from '../component/Confirm_model';


const Employees = () => {
  const dispatch=useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedId, setSelectedId] = useState(null);
const [editData,setEditData]=useState(null)
    const employees=useSelector((state)=>state.employees.employees)
    console.log(employees)
   


  const [open,setOpen]=useState(false)

  const [search, setSearch] = useState('');

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.position.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    console.log('Edit employee', id); // Navigate to edit form
  };

  const handleDelete = (id) => {
    console.log("inside the handle delete") ;
     setSelectedId(id);
  setIsModalOpen(true);
  
  };
  const confirmDelete =()=>{
    console.log("inide the delete")
    dispatch(deleteEmployee(selectedId))
    setIsModalOpen(false);
    setSelectedId(null)
  }


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-500">Manage your team members</p>
        </div>
        <button 
        onClick={()=>setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 shadow-sm hover:shadow-md transition-all">
          <FaUserPlus />
          <span>Create Employee</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={employee.email}>
                      {employee.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {setEditData(employee),setOpen(true)}}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No employees found matching your search.
          </div>
        )}
        {
            open && <Employee_Form isOpen={open} onClose={()=>{setOpen(false),setEditData(null)}} editData={editData}/>
        }
        <Confirm_modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} onConfirm={confirmDelete} />
      </div>
    </div>
  );
};

export default Employees;
