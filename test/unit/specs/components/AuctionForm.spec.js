import { mount } from '@vue/test-utils'
import AuctionForm from '@/components/AuctionForm'

let wrapper

beforeEach(() => {
  wrapper = mount(AuctionForm, {
    mocks: {
      $router: {
        replace: jest.fn()
      }
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('AuctionForm.vue', () => {
  it('should render errors on form', () => {
    wrapper.setData({
      error: 'TEST ERROR'
    })

    expect(wrapper.find('.errors').text()).toEqual('TEST ERROR')
  })

  it('redirects to signIn page if not signed in', () => {
    expect(wrapper.vm.$router.replace).toHaveBeenCalledWith('/signin')
  })

  it('calls createAuction when clicking submit button', () => {
    wrapper.vm.createAuction = jest.fn()
    const button = wrapper.find('[type="submit"]')

    button.trigger('submit')

    expect(wrapper.vm.createAuction).toBeCalled()
  })
})
