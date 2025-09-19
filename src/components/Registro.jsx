import React from 'react'
// registro
const Registro = () => {
  return (
    <div className="container mt-4">
      <h2>Registro</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  )
}

export default Registro