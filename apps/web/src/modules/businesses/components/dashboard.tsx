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
import { HorizontalCard } from './HorizontalCard';
import './dashboard.css';

interface DashboardProps {
  role?: string; // O role?: 'admin' | 'business' | 'client';
  onLogout?: () => void;
}

export default function AdminDashboard({ role, onLogout }: DashboardProps) {
  const [uiComponentsOpen, setUiComponentsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Datos para las 3 tarjetas exclusivas de la empresa
  const businessCardsData = [
    {
      id: 'card-1',
      category: 'Crear Servicio',
      title: ' Crea bienes o servicios',
      description: 'Amplia tu oferta para que más gente te vea',
      date: '10 de Octubre',
      action: () => alert('Ver ventas')
    },
    {
      id: 'card-2',
      category: 'Actualizar Servicios',
      title: 'Actualiza tus Bienes o Servicios ya creados',
      description: 'Puedes modificar los servicios que tiene disponibles hasta el momento',
      date: '12 de Octubre',
      action: () => alert('Ver inventario')
    },
    {
      id: 'card-3',
      category: 'Eliminar Servicios',
      title: 'Da de baja un servicio',
      description: 'Puedes eliminar servicios que no uses',
      date: '15 de Octubre',
      action: () => alert('Ver clientes')
    },
  ];

  return (
    <div className='container'>
      {/* Sidebar Navigation */}
      <aside>
        <div>
          {/* Logo / Header */}
          <div> </div>

          <nav>
            {/* Menu Item */}
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

        {/* TARJETAS SUPERIORES */}
        <div className="cards-grid">
          <Card id="verde" amount="$ 153.000" label="Revenue" icon="money.svg" />
          <Card id="amarillo" amount="20" label="Sales" icon="cart.svg" />
          <Card id="azul" amount="20" label="Customer" icon="badge.svg" />
          <Card id="gris" amount="20" label="Employee" icon="gift.svg" />
        </div>

        {/* --- POSICIÓN MEDIA: 3 Tarjetas distintas para 'business' --- */}
        {role === 'business' && (
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            {businessCardsData.map((card) => (
              <HorizontalCard
                key={card.id}
                category={card.category}
                title={card.title}
                description={card.description}
                date={card.date}
                onClick={card.action}
              />
            ))}
          </div>
        )}

        {/* Paneles Principales */}
        <div>
        </div>
      </main>
    </div>
  );
}