import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000'
    : process.env.VUE_APP_API_BACK

export default axios.create({
  baseURL,
  // You can add your headers here
})
