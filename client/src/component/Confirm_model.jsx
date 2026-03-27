import React from 'react';
import { FaTimes, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const Confirm_modal = ({ isOpen, onClose, onConfirm, title = "Delete Employee?", message = "This action cannot be undone. Are you sure?", itemName = "" }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    // onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 backdrop-blur-md bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl max-w-md w-full z-50 max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FaExclamationTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-500 mt-1">{itemName ? `"${itemName}"` : ''}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-sm"
          >
            <FaCheck className="w-4 h-4 inline mr-1" />
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Confirm_modal;
