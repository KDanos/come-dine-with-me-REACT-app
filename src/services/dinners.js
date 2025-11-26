import axios from 'axios'
import { getToken } from '../utils/token'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/dinners`
})

export const dinnerCreate = (formData) => {
  return api.post('', formData, {
    headers: {Authorization: `Bearer ${getToken()}`}
  })
}

export const dinnerIndex = () => {
  return api.get('')
}

export const dinnerShow = (dinnerId) => {
  return api.get(`/${dinnerId}`)
}

export const dinnerUpdate = (dinnerId, formData) => {
  return api.put(`/${dinnerId}`, formData, {
    headers: {Authorization: `Bearer ${getToken()}`}
  })
}

export const dinnerDelete = (dinnerId) => {
  return api.delete(`/${dinnerId}`, {
    headers: {Authorization: `Bearer ${getToken()}`}
  })
}

export const commentCreate = (dinnerId, formData) => {
  return api.post(`/${dinnerId}/comments`, formData, {
    headers: {Authorization: `Bearer ${getToken()}`}
  })
}