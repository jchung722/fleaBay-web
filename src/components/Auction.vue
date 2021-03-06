<template>
  <div class="max-w-2xl m-auto mt-10 py-10 border items-left">
    <h3 class="text-3xl mb-4 auction-name">{{ auction.name }}</h3>
    <div class="inline-block border-8">
      <img :src="auction.picture" class="image object-scale-down h-64 w-64 align-middle m-auto left-0">
    </div>
    <div class="text-left align-top mx-24 my-8">
      <p>
        <span class="font-bold">Owner:</span>
        <span class="owner">{{ owner }}</span>
      </p>
      <p>
        <span class="font-bold">Starting Bid:</span>
        <span class="starting-bid">$ {{ formatPrice(auction.starting_bid) }}</span>
      </p>
      <p v-if="highestBidder">
        <span class="font-bold">Highest Bid:</span>
        <span class="highest-bid">$ {{ formatPrice(highestBid.amount) }}</span>
        <span class="font-bold">by:</span>
        <span class="highest-bidder">{{ highestBidder }}</span>
      </p>
      <p>
        <span class="font-bold">End Date:</span>
        <span class="end-date">{{ auction.end_date }}</span>
      </p>
      <p>
        <span class="font-bold">Description:</span>
        <span class="description">{{ auction.description }}</span>
      </p>
    </div>
    <template v-if="isAuctionOver()">
      <p class="text-red-500 text-2xl notice">Auction is over!</p>
      <p class="text-blue-500 text-2xl winner" v-if="highestBidder">Winner is {{ highestBidder }}</p>
      <p class="text-blue-500 text-2xl winner" v-else>No winner</p>
    </template>
    <template v-else>
      <form class="w-full max-w-sm items-center mx-auto bid-form" @submit.prevent="makeBid">
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <span class="font-bold">$</span>
          <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Your Bid" v-model="currentBid.amount">
          <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
            Make Bid!
          </button>
        </div>
      </form>
    </template>
    <div class="text-red-500 errors" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import fleaBayApi from '../services/fleaBayApi'

export default {
  name: 'Auction',
  data () {
    return {
      auction: [],
      owner: '',
      highestBid: [],
      highestBidder: '',
      currentBid: [],
      error: ''
    }
  },
  created () {
    const id = this.$route.params.id
    fleaBayApi.getAuction(id)
      .then(response => {
        this.auction = response.data.auction
        this.owner = response.data.auction_owner
        this.highestBid = response.data.highest_bid || []
        this.highestBidder = response.data.highest_bidder
      })
      .catch(error => this.setError(error, 'Error retrieving auction.'))
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    makeBid () {
      this.checkSignedIn()
      const id = this.$route.params.id
      const value = this.currentBid
      if (!value) {
        return
      }

      fleaBayApi.createBid(id, { bid: { amount: this.currentBid.amount } })
        .then(response => {
          window.location.reload()
        })
        .catch(error => this.setError(error, 'Error creating bid.'))
    },
    checkSignedIn () {
      if (!localStorage.signedIn) {
        this.$router.replace('/signin')
      }
    },
    isAuctionOver () {
      return new Date(this.auction.end_date) <= new Date()
    },
    formatPrice (price) {
      return (price / 1).toFixed(2)
    }
  }
}
</script>
