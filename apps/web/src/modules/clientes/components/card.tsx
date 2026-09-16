import "./card.css";

// Es una copia idéntica de la tarjeta que usa el dashboard de "businesses",
// para que las 4 tarjetas de arriba se vean exactamente igual en el dashboard de clientes.
// Usamos nombres de clase con el prefijo "cliente-" para que no choquen con los del otro módulo.

interface CardProps {
  id: string;
  amount: string;
  label: string;
  icon: string;
}

export default function Card({ id, amount, label, icon }: CardProps) {
  return (
    <div id={id} className="cliente-card-container">
      <div className="cliente-card-accent" />
      <div className="cliente-card-body">
        <div className="cliente-card-text">
          <div className="cliente-card-amount">{amount}</div>
          <div className="cliente-card-label">{label}</div>
        </div>
        <img className="cliente-card-icon" src={icon} alt="icono" />
      </div>
    </div>
  );
}
