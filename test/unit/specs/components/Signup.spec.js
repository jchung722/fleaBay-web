import { mount, RouterLinkStub } from '@vue/test-utils'
import Signup from '@/components/Signup'

let wrapper

beforeEach(() => {
  wrapper = mount(Signup, {
    stubs: { 'router-link': RouterLinkStub }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Signup.vue', () => {
  it('should render errors on form', () => {
    wrapper.setData({
      error: 'TEST ERROR'
    })

    expect(wrapper.find('.errors').text()).toEqual('TEST ERROR')
  })

  it('calls signIn method when clicking submit button', () => {
    wrapper.vm.signUp = jest.fn()
    const button = wrapper.find('button')

    button.trigger('submit')

    expect(wrapper.vm.signUp).toBeCalled()
  })
})
