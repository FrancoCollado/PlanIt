interface FormularioBusquedaProps {
  texto: string;
  zona: string;
  empresa: string;
  onTexto: (valor: string) => void;
  onZona: (valor: string) => void;
  onEmpresa: (valor: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function FormularioBusqueda({
  texto,
  zona,
  empresa,
  onTexto,
  onZona,
  onEmpresa,
  onSubmit
}: FormularioBusquedaProps) {
  return (
    <form className="formulario-cliente" onSubmit={onSubmit}>
      <label>Nombre del servicio</label>
      <input
        type="text"
        value={texto}
        onChange={(e) => onTexto(e.target.value)}
        placeholder="Por ejemplo: catering"
      />

      <label>Zona de la empresa</label>
      <input
        type="text"
        value={zona}
        onChange={(e) => onZona(e.target.value)}
        placeholder="Cualquier zona"
      />

      <label>Nombre de la empresa</label>
      <input
        type="text"
        value={empresa}
        onChange={(e) => onEmpresa(e.target.value)}
        placeholder="Cualquier empresa"
      />

      <div className="botones-formulario-cliente">
        <button type="submit">Buscar</button>
      </div>
    </form>
  );
}
