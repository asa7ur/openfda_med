import { List, ListItem, ListItemText, Box, Paper } from '@mui/material'

const ResultsList = ({ results, setSelectedResult }) => {
  return (
    <Box sx={{ background: 'transparent' }}>
      <List >
        {results.map((result, index) => {
          const brandName = result.openfda?.brand_name?.[0]
          const genericName = result.openfda?.generic_name?.[0]

          if (!brandName || !genericName) {
            return null
          }

          return (
            <Paper sx={{ background: 'transparent' }} key={index}>
              <ListItem button onClick={() => setSelectedResult(result)}>
                <ListItemText primary={brandName} secondary={genericName} />
              </ListItem>
            </Paper>
          )
        })}
      </List>
    </Box>
  )
}

export default ResultsList
