import React, { useState } from 'react';
import { clientesIniciales } from './clientes';

function AppClientes() {
  const [busqueda, setBusqueda] = useState(''); //Estado del campo de busqueda
  const [paginaActual, setPaginaActual] = useState(1); //Guarda el numero de pagina que se esta mostrando
  const [resultadosPorPagina, setResultadosPorPagina] = useState(3); //Clientes que se muestran por pagina
  //Se ordena por defecto:
  const [criterioOrden, setCriterioOrden] = useState('nombre'); 
  const [direccionOrden, setDireccionOrden] = useState('asc');

  //Filtrar clientes por nombre o telefono
  const clientesFiltrados = clientesIniciales.filter(cliente =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.telefono.includes(busqueda)
  );

  /*Ordenar clientes segun el criterio,
  crea una copia de los clientes filtrados,
  compara cadenas de texto alfabeticamente*/
  const clientesOrdenados = [...clientesFiltrados].sort((a, b) => {
    if (criterioOrden === 'nombre') {
      return direccionOrden === 'asc'
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre);
    } else if (criterioOrden === 'telefono') {
      return direccionOrden === 'asc'
        ? a.telefono.localeCompare(b.telefono)
        : b.telefono.localeCompare(a.telefono);
    }
    return 0;
  });

  //Paginacion
  const indiceUltimo = paginaActual * resultadosPorPagina; //Ultimo cliente para mostrar
  const indicePrimero = indiceUltimo - resultadosPorPagina; //Primer cliente para mostrar
  //Muestra solo los clientes de esa página (slice(): corta el array)
  const clientesPaginados = clientesOrdenados.slice(indicePrimero, indiceUltimo);
  //Las paginas hay en total, redondeando 
  const totalPaginas = Math.ceil(clientesOrdenados.length / resultadosPorPagina);

  //Cambia la pagina segun el numero que se elija
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div>
      <h1>LISTA DE CLIENTES</h1>

      {/*Controles de ordenamiento*/}
      <div>
        <label>Ordenar por: </label>
        <select value={criterioOrden} onChange={e => setCriterioOrden(e.target.value)}>
          <option value="nombre">Nombre</option>
          <option value="telefono">Teléfono</option>
        </select>

        <select value={direccionOrden} onChange={e => setDireccionOrden(e.target.value)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      {/*Seleccion de cantidad de resultados por pagina*/}
      <div>
        <label>Resultados por página: </label>
        <select
          value={resultadosPorPagina}
          onChange={e => {
            setResultadosPorPagina(Number(e.target.value));
            setPaginaActual(1);
          }}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      {/*Campo de búsqueda*/}
      <input
        type="text"
        placeholder="Buscar por nombre o teléfono..."
        value={busqueda}
        onChange={e => {
          setBusqueda(e.target.value);
          setPaginaActual(1); //Reinicia a la primera pagina al buscar
        }}
      />

      {/*Lista de clientes*/}
      {clientesPaginados.length > 0 ? (
        <ul>
          {clientesPaginados.map(cliente => (
            <li key={cliente.id}>
              <strong>{cliente.nombre}</strong> - {cliente.telefono}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados.</p>
      )}

      {/*Controles de paginacion*/}
      {totalPaginas > 1 && (
        <div>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
            <button key={num} onClick={() => cambiarPagina(num)}>
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppClientes;
