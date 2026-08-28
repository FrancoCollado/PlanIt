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
import './dashboard.css';

interface DashboardProps {
  role?: string; // O role?: 'admin' | 'business' | 'client';
  onLogout?: () => void;
}

export default function AdminDashboard({ role, onLogout }: DashboardProps) {
  const [uiComponentsOpen, setUiComponentsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className='container'>
      {/* Sidebar Navigation */}
      <aside>
        <div>
          {/* Logo / Header */}
          <div> </div>


          <nav>

            {/*  Menu Item */}
            <div>
             

              {/* Sub-items */}
              {uiComponentsOpen && (
                <div>
                 

                </div>
              )}
              
            </div>
          </nav>
        </div>


      </aside>

  
      <main>
        <h1>Dashboard</h1>

        {/* Banner */}
        <div id="subtitulo"> Observa tus estadísticas </div>

        {/* TARJETAS  */}
        <div className="cards-grid">
          <Card id="verde" amount="$ 153.000" label="Revenue" icon="money.svg" />
          <Card id="amarillo" amount="20" label="Sales" icon="cart.svg" />
          <Card id="azul" amount="20" label="Customer" icon="badge.svg" />
          <Card id="gris" amount="20" label="Employee" icon="gift.svg" />
        </div>

 
        {/* Paneles Principales */}
        <div>
        </div>
      </main>
    </div>
  );
}