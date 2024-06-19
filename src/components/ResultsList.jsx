import { List, ListItem, ListItemText, Paper } from '@mui/material'

const ResultsList = ({ results, setSelectedResult }) => {
  return (
    <>
      <List >
        {results.map((result, index) => {
          const brandName = result.openfda?.brand_name?.[0]
          const genericName = result.openfda?.generic_name?.[0]

          if (!brandName || !genericName) {
            return null
          }

          return (
            <Paper sx={{marginBottom:'10px'}} key={index}>
              <ListItem button onClick={() => setSelectedResult(result)}>
                <ListItemText primary={brandName} secondary={genericName} />
              </ListItem>
            </Paper>
          )
        })}
      </List>
    </>
  )
}

export default ResultsList
