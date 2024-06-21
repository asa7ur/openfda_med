import { List, ListItem, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ResultsList = ({ results }) => {
  const navigate = useNavigate()

  return (
    <>
      <List>
        {results.map((result) => {
          const brandName = result.openfda?.brand_name?.[0]
          const genericName = result.openfda?.generic_name?.[0]

          if (!brandName || !genericName) {
            return null
          }

          return (
            <ListItem
              button
              key={result.id}
              onClick={() =>
                navigate(`/producto/${result.id}`, { state: { result } })
              }
            >
              <ListItemText primary={brandName} secondary={genericName} />
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export default ResultsList
