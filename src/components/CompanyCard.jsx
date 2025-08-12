import React from 'react';
import { Link } from 'react-router-dom';

const CompanyCard = ({ name, category, icon, bgColor, onClick, companyId }) => {
  const isImageIcon = icon && (icon.startsWith('http') || icon.startsWith('/'));

  const CardContent = () => (
    <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-gray-300/70">
        <div className="p-6 text-center">
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
              isImageIcon ? 'bg-white border border-gray-200' : 'text-white text-2xl font-bold'
            }`}
            style={{ backgroundColor: isImageIcon ? 'white' : bgColor }}
          >
            {isImageIcon ? (
              <img
                src={icon}
                alt={name}
                className="w-12 h-12 object-contain rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : (
              <span>{icon}</span>
            )}
            {isImageIcon && (
              <span
                className="hidden text-2xl"
                style={{ color: bgColor }}
              >
                {name.charAt(0)}
              </span>
            )}
          </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600">{category}</p>
      </div>
    </div>
  );

  // Generate company ID from name if not provided
  const generatedId = companyId || name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/companies/${generatedId}`} className="group cursor-pointer block">
      <CardContent />
    </Link>
  );
};

export default CompanyCard;
