import { List, ListItem, ListItemText} from '@mui/material'

const ResultsList = ({ results, setSelectedResult }) => {
  return (
    <>
      <List>
        {results.map((result, index) => {
          const brandName = result.openfda?.brand_name?.[0]
          const genericName = result.openfda?.generic_name?.[0]

          if (!brandName || !genericName) {
            return null
          }

          return (
            <ListItem button key={index} onClick={() => setSelectedResult(result)}>
              <ListItemText primary={brandName} secondary={genericName} />
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export default ResultsList
