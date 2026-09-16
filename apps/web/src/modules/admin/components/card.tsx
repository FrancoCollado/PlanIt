import "./card.css";

// Copia de la tarjeta vertical de "businesses" (icono + monto + etiqueta),
// usada acá para las 4 tarjetas de arriba del dashboard de admin.
// Prefijo "admin-" en las clases para que no choquen con las de otros módulos.

interface CardProps {
  id: string;
  amount: string;
  label: string;
  icon: string;
}

export default function Card({ id, amount, label, icon }: CardProps) {
  return (
    <div id={id} className="admin-card-container">
      <div className="admin-card-accent" />
      <div className="admin-card-body">
        <div className="admin-card-text">
          <div className="admin-card-amount">{amount}</div>
          <div className="admin-card-label">{label}</div>
        </div>
        <img className="admin-card-icon" src={icon} alt="icono" />
      </div>
    </div>
  );
}
