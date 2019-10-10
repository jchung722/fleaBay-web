import { mount, RouterLinkStub } from '@vue/test-utils'
import Header from '@/components/Header'

let wrapper

beforeEach(() => {
  wrapper = mount(Header, {
    stubs: { 'router-link': RouterLinkStub }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Header.vue', () => {
  it('only shows signin and signup button if user is signed out', () => {
    const mockIsSignedIn = jest.fn(() => false)
    wrapper.setMethods({ isSignedIn: mockIsSignedIn })

    expect(wrapper.find('.signin').exists()).toBe(true)
    expect(wrapper.find('.signup').exists()).toBe(true)
    expect(wrapper.find('.signout').exists()).toBe(false)
  })

  it('only shows signout button if user is signed in', () => {
    const mockIsSignedIn = jest.fn(() => true)
    wrapper.setMethods({ isSignedIn: mockIsSignedIn })

    expect(wrapper.find('.signin').exists()).toBe(false)
    expect(wrapper.find('.signup').exists()).toBe(false)
    expect(wrapper.find('.signout').exists()).toBe(true)
  })

  it('calls signout method when user clicks the signout link', () => {
    const mockIsSignedIn = jest.fn(() => true)
    wrapper.setMethods({ isSignedIn: mockIsSignedIn })
    wrapper.vm.signOut = jest.fn();
    const signOutLink = wrapper.find('.signout')
    
    signOutLink.trigger('click')

    expect(wrapper.vm.signOut).toBeCalled();
  })
})