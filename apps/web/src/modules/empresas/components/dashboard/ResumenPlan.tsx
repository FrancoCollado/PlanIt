import { LIMITE_SERVICIOS_PLAN_GRATIS } from '../../hooks/useEmpresaDashboard';

interface ResumenPlanProps {
  plan: 'gratis' | 'pro';
  cantidadServicios: number;
}

export default function ResumenPlan({ plan, cantidadServicios }: ResumenPlanProps) {
  if (plan === 'pro') {
    return <p className="texto-ayuda-empresa">Tenes el plan Pro: podes cargar todos los servicios que quieras.</p>;
  }

  return (
    <p className="texto-ayuda-empresa">
      Plan gratis: llevas {cantidadServicios} de {LIMITE_SERVICIOS_PLAN_GRATIS} servicios.
    </p>
  );
}
