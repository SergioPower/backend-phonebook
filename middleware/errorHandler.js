const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  // Manejar errores de tipo CastError (como ID malformados)
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformado ID' })
  }

  // Manejo de errores de validación (por ejemplo, si el número de teléfono no tiene el formato correcto)
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'Error de validación', details: error.message })
  }

  // Manejar errores relacionados con la base de datos (conexión, etc.)
  if (error.name === 'MongoNetworkError') {
    return response.status(500).json({ error: 'Error de conexión a la base de datos' })
  }

  // Error general (no específico)
  if (error.message) {
    return response.status(500).json({ error: error.message })
  }

  // Si no se manejó el error, pasa al siguiente middleware (generalmente para el manejo de errores en producción)
  next(error)
}

module.exports = errorHandler
