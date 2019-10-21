import { mount } from '@vue/test-utils'
import Auction from '@/components/Auction'

let wrapper

beforeEach(() => {
  const id = 1
  wrapper = mount(Auction, {
    mocks: {
      $route: {
        params: { id }
      }
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Auction.vue', () => {
  it('renders errors on page', () => {
    wrapper.setData({
      error: 'TEST ERROR'
    })

    expect(wrapper.find('.errors').text()).toEqual('TEST ERROR')
  })

  it('shows message that auction is over', () => {
    const mockIsAuctionOver = jest.fn(() => true)
    wrapper.setMethods({ isAuctionOver: mockIsAuctionOver })

    expect(wrapper.find('.notice').text()).toEqual('Auction is over!')
  })

  it('shows winner as highest bidder for finished auction', () => {
    const mockIsAuctionOver = jest.fn(() => true)
    wrapper.setMethods({ isAuctionOver: mockIsAuctionOver })
    wrapper.setData({
      highestBidder: 'ME'
    })

    expect(wrapper.find('.winner').text()).toEqual('Winner is ME')
  })

  it('shows message of no winner if no bids for finished auction', () => {
    const mockIsAuctionOver = jest.fn(() => true)
    wrapper.setMethods({ isAuctionOver: mockIsAuctionOver })

    expect(wrapper.find('.winner').text()).toEqual('No winner')
  })

  it('shows bid form for ongoing auction', () => {
    const mockIsAuctionOver = jest.fn(() => false)
    wrapper.setMethods({ isAuctionOver: mockIsAuctionOver })

    expect(wrapper.find('.bid-form').exists()).toBe(true)
  })

  it('reformats prices to have two decimal places', () => {
    wrapper.setData({
      auction: { starting_bid: 20 },
      highestBidder: 'winner@gmail.com',
      highestBid: { amount: 10.5 }
    })

    expect(wrapper.find('.highest-bid').text()).toEqual('$ 10.50')
    expect(wrapper.find('.starting-bid').text()).toEqual('$ 20.00')
  })

  it('shows highest bid and bidder if bid is made', () => {
    wrapper.setData({
      highestBidder: 'winner@gmail.com',
      highestBid: { amount: 10 }
    })

    expect(wrapper.find('.highest-bidder').text()).toEqual('winner@gmail.com')
    expect(wrapper.find('.highest-bid').text()).toEqual('$ 10.00')
  })

  it('hides highest bid and bidder description if no bid is made', () => {
    expect(wrapper.find('.highest-bidder').exists()).toBe(false)
    expect(wrapper.find('.highest-bid').exists()).toBe(false)
  })

  it('displays auction attributes', () => {
    wrapper.setData({
      owner: 'owner@gmail.com',
      auction: {
        name: 'item',
        description: 'description',
        starting_bid: 5,
        end_date: 'date',
        picture: 'image'
      }
    })

    expect(wrapper.find('.auction-name').text()).toEqual('item')
    expect(wrapper.find('.description').text()).toEqual('description')
    expect(wrapper.find('.starting-bid').text()).toEqual('$ 5.00')
    expect(wrapper.find('.end-date').text()).toEqual('date')
    expect(wrapper.find('img').attributes('src')).toEqual('image')
  })

  it('makes bid when button is clicked', () => {
    wrapper.vm.makeBid = jest.fn()
    const bidButton = wrapper.find('button')

    bidButton.trigger('submit')

    expect(wrapper.vm.makeBid).toBeCalled()
  })
})
