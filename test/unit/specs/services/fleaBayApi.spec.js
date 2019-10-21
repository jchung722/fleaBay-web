import fakeAxios from 'axios'
import fleaBayApi from '@/services/fleaBayApi'

describe('POST user sign up', () => {
  it('returns created status', async () => {
    fakeAxios.post.mockImplementation(() =>
      Promise.resolve({
        status: 201,
        data: {}
      })
    )

    const response = await fleaBayApi.signUp({email: 'test@email.com', password: 'pw'})

    expect(response.status).toEqual(201)
  })

  it('makes axios post request with correct endpoint', async () => {
    expect(fakeAxios.post).toHaveBeenCalledWith(
      '/signup',
      {email: 'test@email.com', password: 'pw'}
    )
  })
})

describe('POST user sign in', () => {
  it('returns csrf token', async () => {
    fakeAxios.post.mockImplementation(() =>
      Promise.resolve({
        data: { csrf: 'token' }
      })
    )

    const response = await fleaBayApi.signIn({email: 'test@email.com', password: 'pw'})

    expect(response.data.csrf).toEqual('token')
  })

  it('makes axios post request with correct endpoint', async () => {
    expect(fakeAxios.post).toHaveBeenCalledWith(
      '/signin',
      {email: 'test@email.com', password: 'pw'}
    )
  })
})

describe('DELETE user sign in', () => {
  it('return no content status', async () => {
    fakeAxios.delete.mockImplementation(() =>
      Promise.resolve({
        status: 204,
        data: {}
      })
    )

    const response = await fleaBayApi.signOut()

    expect(response.status).toEqual(204)
  })

  it('makes axios delete request with correct endpoint', async () => {
    expect(fakeAxios.delete).toHaveBeenCalledWith(
      '/signin'
    )
  })
})

describe('POST auction', () => {
  it('returns created auction', async () => {
    fakeAxios.post.mockImplementation(() =>
      Promise.resolve({
        status: 201,
        data: { name: 'item', starting_bid: 1, end_date: Date.today }
      })
    )
    const expectedPayload = { name: 'item', starting_bid: 1, end_date: Date.today }

    const response = await fleaBayApi.createAuction(expectedPayload)

    expect(response.status).toEqual(201)
    expect(response.data).toEqual(expectedPayload)
  })

  it('makes axios post request with correct endpoint', async () => {
    expect(fakeAxios.post).toHaveBeenCalledWith(
      '/auctions',
      { name: 'item', starting_bid: 1, end_date: Date.today }
    )
  })
})

describe('GET auction', () => {
  it('returns an auction', async () => {
    fakeAxios.get.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { name: 'item', starting_bid: 1, end_date: Date.today }
      })
    )

    const response = await fleaBayApi.getAuction(1)

    expect(response.status).toEqual(200)
    expect(response.data).toEqual({ name: 'item', starting_bid: 1, end_date: Date.today })
  })

  it('makes axios get request with correct endpoint', async () => {
    expect(fakeAxios.get).toHaveBeenCalledWith(
      '/auctions/1'
    )
  })
})

describe('POST bid', () => {
  it('returns created bid', async () => {
    fakeAxios.post.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { amount: 10 }
      })
    )

    const response = await fleaBayApi.createBid(2, { amount: 10 })

    expect(response.status).toEqual(200)
    expect(response.data).toEqual({ amount: 10 })
  })

  it('makes axios post request with correct endpoint', async () => {
    expect(fakeAxios.post).toHaveBeenCalledWith(
      '/auctions/2/bids',
      { amount: 10 }
    )
  })
})

describe('GET auctions', () => {
  it('returns all auctions', async () => {
    fakeAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: [ { name: 'auction1' }, { name: 'auction2' }, { name: 'auction3' } ]
      })
    )

    const response = await fleaBayApi.getAllAuctions()

    expect(response.data).toEqual([ { name: 'auction1' }, { name: 'auction2' }, { name: 'auction3' } ])
  })

  it('makes axios get request with correct endpoint', async () => {
    expect(fakeAxios.get).toHaveBeenCalledWith(
      '/auctions'
    )
  })
})
