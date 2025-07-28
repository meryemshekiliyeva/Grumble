import React from 'react';

const CategoryCard = ({ name, description, icon, bgColor }) => {
  return (
    <div className="flex-shrink-0 w-44 mx-2">
      <div
        className={`group bg-white rounded-2xl transition-all duration-300 cursor-pointer category-card`}
        style={{
          border: '1px solid #e5e7eb', // Use a thin, light gray border
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}
      >
        <div className="p-6 text-center">
          <div
            className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white text-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
            style={{ backgroundColor: bgColor }}
          >
            {icon}
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300 az-text">{name}</h3>
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300 az-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
