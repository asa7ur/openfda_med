import axios from 'axios'

const BASE_URL = 'https://api.fda.gov/drug/label.json'

export const searchDrugs = async (query) => {
  let combinedResults = []
  const searchLimit = 50

  // Con la búsqueda directa los resultados son menos precisos aunque el tiempo de espera es mucho menos
  //
  // const response = await axios.get(BASE_URL, {
  //   params: {
  //     search: query,
  //     limit: SEARCH_LIMIT,
  //   },
  // })

  // Con este método aunque el timepo de espera sea mayor, los resultados son mejores
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

  const sortedResults = filteredResults.sort((a, b) => {
    const aNames = [
      ...(a.openfda.brand_name || []),
      ...(a.openfda.generic_name || []),
    ]
    const bNames = [
      ...(b.openfda.brand_name || []),
      ...(b.openfda.generic_name || []),
    ]
    const aStartsWithQuery = aNames.some((name) =>
      name.toLowerCase().startsWith(query.toLowerCase())
    )
    const bStartsWithQuery = bNames.some((name) =>
      name.toLowerCase().startsWith(query.toLowerCase())
    )

    if (aStartsWithQuery && !bStartsWithQuery) {
      return -1
    }
    if (!aStartsWithQuery && bStartsWithQuery) {
      return 1
    }
    return 0
  })

  const uniqueResults = Array.from(
    new Set(sortedResults.map((result) => result.id))
  ).map((id) => {
    return sortedResults.find((result) => result.id === id)
  })

  return uniqueResults
}
