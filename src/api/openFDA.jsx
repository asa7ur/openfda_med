import axios from 'axios'

const BASE_URL = 'https://api.fda.gov/drug/label.json'

export const searchDrugs = async (query) => {
  let combinedResults = []
  const searchLimit = 50

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

  const filteredResults = combinedResults.filter((result) => {
    const brandNames = result.openfda.brand_name || []
    const genericNames = result.openfda.generic_name || []
    const allNames = [...brandNames, ...genericNames]
    return allNames.some((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    )
  })

  console.log(filteredResults)

  const uniqueResults = Array.from(
    new Set(filteredResults.map((result) => JSON.stringify(result)))
  )
    .map((result) => JSON.parse(result))
    .slice(0, 10)

  return uniqueResults
}
