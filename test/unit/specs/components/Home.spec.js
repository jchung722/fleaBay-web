import { mount, RouterLinkStub } from '@vue/test-utils'
import Home from '@/components/Home'

let wrapper

beforeEach(() => {
  wrapper = mount(Home, {
    stubs: { 'router-link': RouterLinkStub }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Home.vue', () => {
  it('router link directs to auction form path', () => {
    const auctionFormPath = '/auctions/new'
    const routerLink = wrapper.find(RouterLinkStub)

    expect(routerLink.props().to).toBe(auctionFormPath)
  })

  it('renders errors on page', () => {
    wrapper.setData({
      error: 'TEST ERROR'
    })

    expect(wrapper.find('.errors').text()).toEqual('TEST ERROR')
  })

  it('returns placeholder if object does not have picture url', () => {
    expect(wrapper.vm.checkPicture({ picture: '' })).toEqual('https://static.thenounproject.com/png/1174579-200.png')
  })

  it('returns picture url if object has one', () => {
    expect(wrapper.vm.checkPicture({ picture: 'image url' })).toEqual('image url')
  })

  it('returns the highest bid amount of auction if it exists', () => {
    const auction = { starting_bid: 5, highest_bid: { amount: 7 } }
    expect(wrapper.vm.checkBid(auction)).toEqual(7)
  })

  it('returns the starting bid amount of auction if highest bid does not exist', () => {
    const auction = { starting_bid: 5 }
    expect(wrapper.vm.checkBid(auction)).toEqual(5)
  })
})
