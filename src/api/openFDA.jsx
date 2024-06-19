import axios from 'axios'

const BASE_URL = 'https://api.fda.gov/drug/label.json'

export const searchDrugs = async (query) => {
  let combinedResults = []
  const searchLimit = 10

  for (let i = 1; i <= query.length; i++) {
    const partialQuery = query.substring(0, i)
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          search: partialQuery,
          limit: searchLimit,
        },
      })

      if (response.data.results) {
        combinedResults = combinedResults.concat(response.data.results)
      }
    } catch (error) {
      // if (error.response && error.response.status === 404) {
      //   console.warn(`No results found for query segment: ${partialQuery}`)
      // } else {
      //   console.error('Error fetching data from OpenFDA', error)
      // }
    }
  }

  // Filtrar resultados para incluir solo los más relevantes
  const filteredResults = combinedResults.filter(
    (result) =>
      result.openfda.brand_name &&
      result.openfda.brand_name.some((name) =>
        name.toLowerCase().includes(query.toLowerCase())
      )
  )

  // Eliminar duplicados
  const uniqueResults = Array.from(
    new Set(filteredResults.map((result) => JSON.stringify(result)))
  ).map((result) => JSON.parse(result))

  const limitedResults = uniqueResults.slice(0, 5)

  return limitedResults
}
