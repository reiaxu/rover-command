
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const insertBall = payload => api.post(`/ball`, payload)
export const getAllBalls = () => api.get(`/balls`)
export const updateBallById = (id, payload) => api.put(`/ball/${id}`, payload)
export const deleteBallById = id => api.delete(`/balls/${id}`)
export const getBallById = id => api.get(`/balls/${id}`)

const apis = {
    insertBall,
    getAllBalls,
    updateBallById,
    deleteBallById,
    getBallById,
}

export default apis