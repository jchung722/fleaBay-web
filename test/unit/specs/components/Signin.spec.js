import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Signin from '@/components/Signin'

let wrapper

beforeEach(() => {
  wrapper = mount(Signin, {
    stubs: { 'router-link': RouterLinkStub }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Signin.vue', () => {
  it('should render errors on form', () => {
    wrapper.setData({
      error: 'TEST ERROR'
    });
    expect(wrapper.find('.errors').text()).toEqual('TEST ERROR')
  })

  it('calls signIn method when clicking submit button', () => {
    wrapper.vm.signIn = jest.fn();
    const button = wrapper.find('button')
    
    button.trigger('submit')

    expect(wrapper.vm.signIn).toBeCalled();
  })
})