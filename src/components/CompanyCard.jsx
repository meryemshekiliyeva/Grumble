import React from 'react';

const CompanyCard = ({ name, category, complaintCount, icon, bgColor }) => {
  return (
    <div className="group cursor-pointer">
      <div className="bg-card text-card-foreground rounded-xl border shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <div className="p-6 text-center">
          <div 
            className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-white text-2xl font-bold transition-transform duration-300 group-hover:scale-110`}
            style={{ backgroundColor: bgColor }}
          >
            {icon}
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{category}</p>
          <div className="text-xs text-muted-foreground">
            <span className="font-semibold text-destructive">{complaintCount}</span> şikayət
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
