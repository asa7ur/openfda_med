import axios from 'axios'

const BASE_URL = 'https://api.fda.gov/drug/label.json'

export const searchDrugs = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        search: query,
        limit: 10,
      },
    })
    return response.data.results || []
  } catch (error) {
    console.error('Error fetching data from OpenFDA', error)
    return []
  }
}
