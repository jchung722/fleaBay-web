import { mount, RouterLinkStub } from '@vue/test-utils'
import Home from '@/components/Home'

describe('Home.vue', () => {
  it('router link directs to auction form path', () => {
    const wrapper = mount(Home, {
      stubs: { 'router-link': RouterLinkStub }
    })
    const auctionFormPath = '/auctions/new'
    const routerLink = wrapper.find(RouterLinkStub)

    expect(routerLink.props().to).toBe(auctionFormPath)
  })
})