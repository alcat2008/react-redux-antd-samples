import axios from 'axios'

let fetcher = axios.create({
  method: 'post',
  baseURL: process.env.NODE_ENV === 'production' ? 'http://www.easy-mock.com/mock/59c4abdae0dc663341b47ad8/' : '/',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'accessToken': 'asdfasdf'
  }
})

fetcher.interceptors.request.use((config) => {
  console.log('===> request params: ', config.data)
  console.log('===> request url: ', config.url)
  return config
}, function (error) {
  return Promise.reject(error)
})

fetcher.interceptors.response
  .use((response) => {
    console.log('===> response data: ', response.data)
    return response.data
  }, function (error) {
    console.log('===> response error: ', error)
    return Promise.reject(error)
  })

export default fetcher.post
