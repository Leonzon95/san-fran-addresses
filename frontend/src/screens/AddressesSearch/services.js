import { stringify } from 'qs'

export const getAddresses = async (query) => {
  let data

  let baseUrl = 'http://localhost:3000/addresses'
  const stringifiedQuery = stringify(query, { arrayFormat: 'brackets' })
  baseUrl += `?${stringifiedQuery}`
  const response = await fetch(baseUrl)

  if (response.status === 200) {
    data = await response.json()
    return data
  } else {
    throw new Error(response.statusText)
  }
}
