import Vue from 'vue'
import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Signup from '@/components/Signup'

describe('Signup.vue', () => {
  it('should render errors on form', () => {
    const wrapper = mount(Signup, {
      stubs: { 'router-link': RouterLinkStub }
    })
    wrapper.setData({
      error: 'TEST ERROR'
    });

    expect(wrapper.find('.errors').text()).toEqual('TEST ERROR')
  })
})