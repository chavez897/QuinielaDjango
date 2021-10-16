import axios from '@/axios.js'

export default {
  loginAction({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/auth/token/', data)
        .then((response) => {
          const data = response['data']
          const accessToken = data['access']
          const refreshToken = data['refresh']
          // Set accessToken
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', refreshToken)

          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
