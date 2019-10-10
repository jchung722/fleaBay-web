import { securedAxiosInstance as secured, plainAxiosInstance as plain } from './axiosWrapper'

const fleaBayAPI = {
  signUp: async (data) => {
    return plain.post('/signup', data)
  },
  signIn: async (data) => {
    return plain.post('/signin', data)
  },
  signOut: async () => {
    return secured.delete('/signin')
  },
  getAllAuctions: async () => {
    return plain.get('/auctions')
  },
  getAuction: async (id) => {
    return plain.get('/auctions/' + id)
  },
  createAuction: async (data) => {
    return secured.post('/auctions', data)
  },
  createBid: async (id, data) => {
    return secured.post('/auctions/' + id + '/bids', data)
  }
}

export default fleaBayAPI
