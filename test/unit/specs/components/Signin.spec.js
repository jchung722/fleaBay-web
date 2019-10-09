import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Signin from '@/components/Signin'

describe('Signin.vue', () => {
  it('should render errors on form', () => {
    const wrapper = mount(Signin, {
      stubs: { 'router-link': RouterLinkStub }
    })
    wrapper.setData({
      error: 'TEST ERROR'
    });

    expect(wrapper.find('.errors').text()).toEqual('TEST ERROR')
  })
})