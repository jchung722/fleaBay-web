import { mount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import VueAxios from 'vue-axios'
import Auction from '@/components/Auction'

describe('Auction.vue', () => {
  it('renders errors on page', () => {
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

  it('finished auction shows message that it is over', () => {
    const id = 1
    const mockAuctionEnded = jest.fn(() => true)
    const wrapper = mount(Auction, {
      mocks: {
        $route: {
          params: { id }
        },
      }
    })
    wrapper.setMethods({ auctionEnded: mockAuctionEnded })

    expect(wrapper.find('.notice').text()).toEqual('Auction is over!')
  })

  it('finished auction shows winner as highest bidder', () => {
    const id = 1
    const mockAuctionEnded = jest.fn(() => true)
    const wrapper = mount(Auction, {
      mocks: {
        $route: {
          params: { id }
        },
      }
    })
    wrapper.setMethods({ auctionEnded: mockAuctionEnded })
    wrapper.setData({
      highestBidder: 'ME'
    });

    expect(wrapper.find('.winner').text()).toEqual('Winner is ME')
  })

  it('finished auction shows message of no winner if no bids', () => {
    const id = 1
    const mockAuctionEnded = jest.fn(() => true)
    const wrapper = mount(Auction, {
      mocks: {
        $route: {
          params: { id }
        },
      }
    })
    wrapper.setMethods({ auctionEnded: mockAuctionEnded })

    expect(wrapper.find('.winner').text()).toEqual('No winner')
  })

  it('ongoing auction shows bid form', () => {
    const id = 1
    const mockAuctionEnded = jest.fn(() => false)
    const wrapper = mount(Auction, {
      mocks: {
        $route: {
          params: { id }
        },
      }
    })
    wrapper.setMethods({ auctionEnded: mockAuctionEnded })

    expect(wrapper.find('.bid-form').exists()).toBe(true)
  })
})