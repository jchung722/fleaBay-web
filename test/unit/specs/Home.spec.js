import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Home from '@/components/Home'

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(Home)

    expect(wrapper.find('.hello h1').text()).toEqual('Welcome to fleaBay')
  })
})