import React from 'react';
import { Dashboard as DashboardComponent } from '@/components/Dashboard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return <DashboardComponent onBack={() => navigate('/')} />;
};

export default Dashboard;