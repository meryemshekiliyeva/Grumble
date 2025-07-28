import React from 'react';

const ComplaintCard = ({ title, company, author, date, summary }) => {
  return (
    <div className="bg-card text-card-foreground rounded-xl border border-gray-200 shadow-lg transition-transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-primary">{title}</h3>
            <p className="text-sm font-medium text-muted-foreground">
              <span className="font-semibold text-foreground">{company}</span> üçün
            </p>
          </div>
          <div className="text-xs text-muted-foreground">{date}</div>
        </div>
        <p className="mt-4 text-sm text-foreground/80">{summary}</p>
      </div>
      <div className="flex items-center justify-between p-4 bg-muted/20 border-t border-gray-100">
        <div className="flex items-center space-x-2">
            <img
                className="w-8 h-8 rounded-full"
                src={`https://api.dicebear.com/8.x/initials/svg?seed=${author}`}
                alt={author}
            />
            <span className="text-sm font-medium">{author}</span>
        </div>
        <div className="flex items-center space-x-4 text-muted-foreground">
            <button className="flex items-center space-x-1 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a2 2 0 0 1 1.79 1.11L15 5.88Z"/></svg>
                <span>Bəyən</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>Şərh</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;