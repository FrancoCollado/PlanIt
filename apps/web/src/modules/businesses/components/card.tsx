import "./card.css";
// 1. Definimos los tipos de datos para TypeScript
interface CardProps {
  id: string;
  amount: string;
  label: string;
  icon: string;
}

// 2. Le indicamos a React que las props usan esa interfaz (: CardProps)
export default function Card({ id, amount, label, icon }: CardProps) {
  return (
    <div id={id} className="card-container">
      <div className="card-text">
        <div className="card-amount">{amount}</div>
        <div className="card-label">{label}</div>
      </div>
      <img className="card-icon" src={icon} alt="icono" />
    </div>
  );
}

