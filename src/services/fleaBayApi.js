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
  createAuction: async (data) => {
    return secured.post('/auctions', data)
  },
  getAuction: async (id) => {
    return plain.get('/auctions/' + id)
  },
  createBid: async (id, data) => {
    return secured.post('/auctions/' + id + '/bids', data)
  }
}

export default fleaBayAPI
