import { mount, RouterLinkStub } from '@vue/test-utils'
import Home from '@/components/Home'

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(Home, {
      stubs: { 'router-link': RouterLinkStub }
    })

    expect(wrapper.find('.hello h1').text()).toEqual('Welcome to fleaBay')
  })
})