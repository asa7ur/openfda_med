import { List, ListItemButton, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ResultsList = ({ results, onResultClick }) => {
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
            <ListItemButton
              key={result.id}
              onClick={() => {
                onResultClick(),
                  navigate(`/producto/${result.id}`, { state: { result } })
              }}
            >
              <ListItemText primary={brandName} secondary={genericName} />
            </ListItemButton>
          )
        })}
      </List>
    </>
  )
}

export default ResultsList
