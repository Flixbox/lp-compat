import { APPS_WORKER_BASE_URL } from '@lp-compat/shared'
import axios from 'axios'

const getApiUrl = () => APPS_WORKER_BASE_URL

const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Max-Age': 600,
  },
  withCredentials: true,
})


