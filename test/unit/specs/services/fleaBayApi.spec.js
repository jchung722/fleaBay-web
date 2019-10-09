import fakeAxios from "axios"
import fleaBayApi from "../../../../src/services/fleaBayApi"

describe('Sign up a user', () => {
  it('fetches data from request', async () => {
    fakeAxios.post.mockImplementation(() =>
      Promise.resolve({
        status: 201,
        data: {}
      })
    );

    const response = await fleaBayApi.signUp({email: 'test@email.com', password: 'pw'});

    expect(response.status).toEqual(201)
  })

  it('makes axios call with correct url', async () => {
    expect(fakeAxios.post).toHaveBeenCalledWith(
      '/signup',
      {email: 'test@email.com', password: 'pw'}
    )
  })
})