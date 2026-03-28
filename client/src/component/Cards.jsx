import React from 'react'

const Cards = ({ icon: Icon, name, count }) => {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm bg-white">
      {/* Icon */}
      <div className="text-2xl text-gray-600">
        <Icon />
      </div>

      {/* Name */}
      <div className="flex-1 text-sm font-medium text-gray-800">
        {name}
      </div>

      {/* Count badge */}
      <div className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
        {count}
      </div>
    </div>
  )
}

export default Cards

