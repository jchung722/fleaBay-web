import { mount, RouterLinkStub } from '@vue/test-utils'
import AuctionCard from '@/components/AuctionCard'

let wrapper

beforeEach(() => {
  wrapper = mount(AuctionCard, {
    stubs: { 'router-link': RouterLinkStub },
    propsData: {
      auctionId: 1,
      imageUrl: 'image url',
      name: 'test',
      bid: 5,
      endDate: 'date'
    }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('AuctionCard.vue', () => {
  it('router link directs to auction id path', () => {
    const auctionFormPath = '/auctions/1'
    const routerLink = wrapper.find(RouterLinkStub)

    expect(routerLink.props().to).toBe(auctionFormPath)
  })

  it('returns placeholder if object does not have picture url', () => {
    expect(wrapper.find('.bid').text()).toEqual('Bid: $5.00')
  })
})
