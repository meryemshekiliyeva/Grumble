import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import apiService from '../services/api';

Chart.register(...registerables);

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    activeUsers: 0,
    companies: 0,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Try to load real data from API
        const [overview, statusDistribution] = await Promise.all([
          apiService.stats.getOverview(),
          apiService.stats.getStatusDistribution()
        ]);

        setMetrics({
          totalComplaints: overview.totalComplaints || 1247,
          pendingComplaints: statusDistribution.pending || 89,
          inProgressComplaints: statusDistribution.in_progress || 156,
          resolvedComplaints: statusDistribution.resolved || 1002,
          activeUsers: overview.activeUsers || 2847,
          companies: overview.totalCompanies || 156,
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        // Fallback to mock data
        setMetrics({
          totalComplaints: 1247,
          pendingComplaints: 89,
          inProgressComplaints: 156,
          resolvedComplaints: 1002,
          activeUsers: 2847,
          companies: 156,
        });
      }
    };

    loadDashboardData();

    // Chart demo
    const ctx = document.getElementById('complaintsChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return date.toLocaleDateString('az-AZ', { weekday: 'short' });
          }),
          datasets: [{
            label: 'Şikayətlər',
            data: [23, 45, 32, 67, 89, 56, 78],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            title: {
              display: true,
              text: 'Son 7 Günün Şikayət Statistikası'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Şikayət Sayı'
              }
            }
          }
        }
      });
    }

    // Status Chart
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
      new Chart(statusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Gözləyir', 'İcradadır', 'Həll edilib'],
          datasets: [{
            data: [89, 156, 1002],
            backgroundColor: [
              'rgba(251, 191, 36, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(34, 197, 94, 0.8)'
            ],
            borderColor: [
              'rgb(251, 191, 36)',
              'rgb(59, 130, 246)',
              'rgb(34, 197, 94)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            },
            title: {
              display: true,
              text: 'Şikayət Status Paylanması'
            }
          }
        }
      });
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">İdarə Paneli</h2>
          <p className="text-gray-600 mt-2">Şikayət idarəetmə sisteminin ümumi statistikaları və məlumatları</p>
        </div>
        <div className="text-sm text-gray-500">
          Son yenilənmə: {new Date().toLocaleString('az-AZ')}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ümumi Şikayətlər</p>
              <p className="text-2xl font-semibold text-gray-900">{metrics.totalComplaints.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Gözləyən</p>
              <p className="text-2xl font-semibold text-gray-900">{metrics.pendingComplaints}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Aktiv İstifadəçilər</p>
              <p className="text-2xl font-semibold text-gray-900">{metrics.activeUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Şirkətlər</p>
              <p className="text-2xl font-semibold text-gray-900">{metrics.companies}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Şikayət Tendensiyası</h3>
          <canvas id="complaintsChart" width="400" height="200"></canvas>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Paylanması</h3>
          <canvas id="statusChart" width="400" height="200"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
