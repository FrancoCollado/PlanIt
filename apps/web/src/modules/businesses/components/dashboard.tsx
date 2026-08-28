import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Boxes, 
  FileText, 
  Table, 
  Plus, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Gift, 
  MessageSquare, 
  Bell, 
  Power, 
  ChevronDown 
} from 'lucide-react';

import Card from './card';

interface DashboardProps {
  role?: string; // O role?: 'admin' | 'business' | 'client';
  onLogout?: () => void;
}

export default function AdminDashboard({ role, onLogout }: DashboardProps) {
  const [uiComponentsOpen, setUiComponentsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-800">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#00bfa5] text-white flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          {/* Logo / Header */}
          <div className="p-5 text-xl font-bold tracking-wide flex items-center gap-2 border-b border-white/10">
            Simple Admin
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 px-2 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'dashboard' ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/90'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            {/* Collapsible Menu Item */}
            <div>
              <button
                onClick={() => setUiComponentsOpen(!uiComponentsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md hover:bg-white/10 text-white/90 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Boxes size={18} />
                  <span>UI Components</span>
                  <span className="bg-white text-[#00bfa5] text-[10px] font-bold px-1.5 py-0.5 rounded">
                    New
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${uiComponentsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Sub-items */}
              {uiComponentsOpen && (
                <div className="pl-6 pt-1 space-y-1">
                  <button
                    onClick={() => setActiveTab('form')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'form' ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <FileText size={16} />
                    <span>Form</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('datatable')}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'datatable' ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Table size={16} />
                      <span>Data Table</span>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Plus size={12} />
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-white/10 flex items-center justify-around text-white/80">
          <button className="hover:text-white transition-colors p-1" title="Messages">
            <MessageSquare size={18} />
          </button>
          <button className="hover:text-white transition-colors p-1" title="Notifications">
            <Bell size={18} />
          </button>
          <button 
            onClick={onLogout} 
            className="hover:text-white transition-colors p-1" 
            title="Logout"
          >
            <Power size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>

        {/* Maintenance Banner */}
        <div className="bg-rose-100 border border-rose-200 text-rose-600 px-4 py-3 rounded-md mb-6 text-sm">
          This template is under maintenance!
        </div>

        {/* GRILLA DE TARJETAS EN CSS PURO */}
        <div className="cards-grid">
          <Card id="verde" amount="$ 153.000" label="Revenue" icon="money.svg" />
          <Card id="amarillo" amount="20" label="Sales" icon="cart.svg" />
          <Card id="azul" amount="20" label="Customer" icon="badge.svg" />
          <Card id="gris" amount="20" label="Employee" icon="gift.svg" />
        </div>


        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-[#dcfce7] p-5 rounded-lg flex items-center justify-between shadow-sm">
            <div>
              <div className="text-2xl font-bold text-slate-800">$ 153.000</div>
              <div className="text-sm text-slate-500 font-medium mt-1">Revenue</div>
            </div>
            <div className="p-3 bg-white/40 rounded-lg text-emerald-700">
              <DollarSign size={28} />
            </div>
          </div>

          {/* Sales Card */}
          <div className="bg-[#fef9c3] p-5 rounded-lg flex items-center justify-between shadow-sm">
            <div>
              <div className="text-2xl font-bold text-slate-800">20</div>
              <div className="text-sm text-slate-500 font-medium mt-1">Sales</div>
            </div>
            <div className="p-3 bg-white/40 rounded-lg text-amber-700">
              <ShoppingCart size={28} />
            </div>
          </div>

          {/* Customer Card */}
          <div className="bg-[#dbeafe] p-5 rounded-lg flex items-center justify-between shadow-sm">
            <div>
              <div className="text-2xl font-bold text-slate-800">20</div>
              <div className="text-sm text-slate-500 font-medium mt-1">Customer</div>
            </div>
            <div className="p-3 bg-white/40 rounded-lg text-blue-700">
              <Users size={28} />
            </div>
          </div>

          {/* Employee Card */}
          <div className="bg-[#e2e8f0] p-5 rounded-lg flex items-center justify-between shadow-sm">
            <div>
              <div className="text-2xl font-bold text-slate-800">20</div>
              <div className="text-sm text-slate-500 font-medium mt-1">Employee</div>
            </div>
            <div className="p-3 bg-white/40 rounded-lg text-slate-700">
              <Gift size={28} />
            </div>
          </div>
        </div>

        {/* Main Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Section Container */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm min-h-[320px]">
            <h2 className="text-lg font-bold text-[#00bfa5] mb-4">Chart Daily</h2>
            <div className="flex items-center justify-center h-64 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded">
              Contenido del gráfico
            </div>
          </div>

          {/* Todo List Container */}
          <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm min-h-[320px]">
            <h2 className="text-lg font-bold text-[#00bfa5] mb-4">Todo List</h2>
            <div className="flex items-center justify-center h-64 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded">
              Contenido de la lista de tareas
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}