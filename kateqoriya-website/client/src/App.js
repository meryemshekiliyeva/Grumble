import React, { useEffect, useState } from "react";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Xəta baş verdi:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Kateqoriyalar</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {categories.map((cat, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              width: "200px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "2rem" }}>{cat.icon}</div>
            <h3>{cat.title}</h3>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;