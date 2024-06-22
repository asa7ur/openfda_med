import React, { useState } from 'react'
import {
  Button,
  Box,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ResultDetail = ({ result }) => {
  const [showFullText, setShowFullText] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const brandName = result.openfda.brand_name || []
  const genericName = result.openfda.generic_name || []
  const manufacturerName = result.openfda.manufacturer_name || []
  const route = result.openfda.route || []
  const dosage = result.dosage_and_administration || []
  const pharmClass = result.openfda?.pharm_class_epc || []
  const purpose = result.purpose || []
  const warnings = result.warnings || []
  const description = result.description || []

  if (!brandName || !genericName || !manufacturerName) {
    return (
      <Typography variant='body1'>
        Información insuficiente para mostrar detalles del medicamento.
      </Typography>
    )
  }

  const truncatedText = (text, length = 200) => {
    return text && text.length > length ? `${text.slice(0, length)}...` : text
  }

  const renderTextArray = (label, textArray) => {
    return textArray.map((text, index) => (
      <React.Fragment key={index}>
        <Typography
          variant='body1'
          sx={{ fontSize: isSmallScreen ? '0.9rem' : 'inherit' }}
        >
          <strong>{label}:</strong> {showFullText ? text : truncatedText(text)}
        </Typography>
        {text.length > 200 && (
          <Button
            variant='text'
            onClick={() => setShowFullText(!showFullText)}
            sx={{ fontSize: '0.8rem' }}
          >
            {showFullText ? 'Ver menos' : 'Ver más'}
          </Button>
        )}
      </React.Fragment>
    ))
  }

  return (
    <Box sx={{ padding: '1rem 0rem', background: 'transparent' }}>
      <Button variant='contained' onClick={() => navigate(-1)}>
        Atrás
      </Button>
      <Paper sx={{ padding: '1rem', margin: '1rem 0rem' }}>
        <Typography
          variant={isSmallScreen ? 'h5' : 'h4'}
          component='h2'
          gutterBottom
        >
          {brandName}
        </Typography>
        <Typography variant='body1'>
          <strong>Nombre Genérico:</strong> {genericName}
        </Typography>
        <Typography variant='body1'>
          <strong>Fabricante:</strong> {manufacturerName}
        </Typography>
        <Typography variant='body1'>
          <strong>Clase de medicamento:</strong> {pharmClass}
        </Typography>
        <Typography variant='body1'>
          <strong>Forma de administración:</strong> {route}
        </Typography>
        {renderTextArray('Dosificación', dosage)}
        {renderTextArray('Propósito', purpose)}
        {renderTextArray('Advertencias', warnings)}
        {renderTextArray('Descripción', description)}
      </Paper>
    </Box>
  )
}

export default ResultDetail
