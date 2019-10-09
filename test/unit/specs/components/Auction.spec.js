import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import VueAxios from 'vue-axios'
import Auction from '@/components/Auction'

describe('Auction.vue', () => {
  it('should render errors on page', () => {
    const id = 1
    const wrapper = mount(Auction, {
      mocks: {
        $route: {
          params: { id }
        }
      }
    })
    wrapper.setData({
      error: 'TEST ERROR'
    });

    expect(wrapper.find('.errors').text()).toEqual('TEST ERROR')
  })
})