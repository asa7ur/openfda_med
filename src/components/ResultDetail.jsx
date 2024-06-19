import { Button, Box, Typography, Paper } from '@mui/material'

const ResultDetail = ({ result, setSelectedResult }) => {
  const brandName = result.openfda?.brand_name?.[0]
  const genericName = result.openfda?.generic_name?.[0]
  const manufacturerName = result.openfda?.manufacturer_name?.[0]
  const description = result.description

  if (!brandName || !genericName || !manufacturerName) {
    return (
      <p>Información insuficiente para mostrar detalles del medicamento.</p>
    )
  }

  return (
    <Box sx={{ padding: '1rem 0rem', background: 'transparent' }}>
      <Button variant='contained' onClick={() => setSelectedResult(null)}>
        Atrás
      </Button>
      <Paper sx={{padding: '1rem', margin: '1rem 0rem'}}>
        <Typography variant='h5' component='h2' gutterBottom>
          {brandName}
        </Typography>
        <Typography variant='body1'>
          <strong>Nombre Genérico:</strong> {genericName}
        </Typography>
        <Typography variant='body1'>
          <strong>Fabricante:</strong> {manufacturerName}
        </Typography>
        {description && (
          <Typography variant='body1'>
            <strong>Descripción:</strong> {description}
          </Typography>
        )}
      </Paper>
    </Box>
  )
}

export default ResultDetail
