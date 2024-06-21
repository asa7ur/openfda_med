import React, { useState } from 'react'
import { Button, Box, Typography, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ResultDetail = ({ result }) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const navigate = useNavigate()

  const brandName = result.openfda?.brand_name?.[0]
  const genericName = result.openfda?.generic_name?.[0]
  const manufacturerName = result.openfda?.manufacturer_name?.[0]
  const route = result.openfda?.route?.[0]
  const pharmClass = result.openfda?.pharm_class_epc?.[0]
  const description = String(result.description)

  if (!brandName || !genericName || !manufacturerName) {
    return (
      <Typography variant='body1'>
        Información insuficiente para mostrar detalles del medicamento.
      </Typography>
    )
  }

  const truncatedDescription =
    description && description.length > 500
      ? `${description.slice(0, 500)}...`
      : description

  return (
    <Box sx={{ padding: '1rem 0rem', background: 'transparent' }}>
      <Button variant='contained' onClick={() => navigate(-1)}>
        Atrás
      </Button>
      <Paper sx={{ padding: '1rem', margin: '1rem 0rem' }}>
        <Typography variant='h4' component='h2' gutterBottom>
          {brandName}
        </Typography>
        <Typography variant='body1'>
          <strong>Nombre Genérico:</strong> {genericName}
        </Typography>
        <Typography variant='body1'>
          <strong>Fabricante:</strong> {manufacturerName}
        </Typography>
        <Typography variant='body1'>
          <strong>Clase de medicaménto:</strong> {pharmClass}
        </Typography>
        <Typography variant='body1'>
          <strong>Forma de administración:</strong> {route}
        </Typography>
        {description && (
          <>
            <Typography variant='body1'>
              <strong>Descripción:</strong>{' '}
              {showFullDescription ? description : truncatedDescription}
            </Typography>
            {description.length > 200 && (
              <Button
                variant='text'
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Ver menos' : 'Ver más'}
              </Button>
            )}
          </>
        )}
      </Paper>
    </Box>
  )
}

export default ResultDetail
