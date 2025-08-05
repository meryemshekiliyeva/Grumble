import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    activeUsers: 0,
    companies: 0,
  });

  useEffect(() => {
    // Example API call
    // fetch('/api/admin/metrics').then(res => res.json()).then(setMetrics);
    setMetrics({
      totalComplaints: 1200,
      pendingComplaints: 45,
      activeUsers: 350,
      companies: 80,
    });
    // Chart demo
    const ctx = document.getElementById('complaintsChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
          datasets: [{
            label: 'Complaints',
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20 + 5)),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-lg font-semibold">Total Complaints</div>
          <div className="text-3xl font-bold">{metrics.totalComplaints}</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-lg font-semibold">Pending Review</div>
          <div className="text-3xl font-bold">{metrics.pendingComplaints}</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-lg font-semibold">Active Users</div>
          <div className="text-3xl font-bold">{metrics.activeUsers}</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-lg font-semibold">Companies</div>
          <div className="text-3xl font-bold">{metrics.companies}</div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-bold mb-4">Complaints (Last 30 Days)</h3>
        <canvas id="complaintsChart" height="100"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
