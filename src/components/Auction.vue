<template>
  <div class="max-w-2xl m-auto mt-10 py-10 border items-left">
    <h3 class="text-3xl mb-4">{{ auction.name }}</h3>
    <div class="inline-block border-8">
      <img :src="auction.picture" class="object-scale-down h-64 w-64 align-middle m-auto left-0">
    </div>
    <div class="text-left align-top mx-24 my-8">
      <p>
        <span class="font-bold">Owner:</span>
        {{ owner }}
      </p>
      <p>
        <span class="font-bold">Starting Bid:</span>
        $ {{ auction.starting_bid }}
      </p>
      <p>
        <span class="font-bold">Highest Bid:</span>
        $ {{ highestBid.amount }}
        <span class="font-bold">by:</span>
        {{ highestBidder }}
      </p>
      <p>
        <span class="font-bold">End Date:</span>
        {{ auction.end_date }}
      </p>
      <p>
        <span class="font-bold">Description:</span>
        {{ auction.description }}
      </p>
    </div>

    <form class="w-full max-w-sm items-center mx-auto" @submit.prevent="makeBid">
      <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
        <span class="font-bold">$</span>
        <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Your Bid" v-model="currentBid.amount">
        <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
          Make Bid!
        </button>
      </div>
    </form>
    <div class="text-red-500 errors" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
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
    this.$http.plain.get('/auctions/' + id)
      .then(response => {
        this.auction = response.data.auction
        this.owner = response.data.auction_owner
        this.highestBid = response.data.highest_bid || { amount: this.auction.starting_bid }
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

      this.$http.secured.post('/auctions/' + id + '/bids', { bid: { amount: this.currentBid.amount } })
        .then(response => {
          window.location.reload()
        })
        .catch(error => this.setError(error, 'Error creating bid.'))
    },
    checkSignedIn () {
      if (!localStorage.signedIn) {
        this.$router.replace('/signin')
      }
    }
  }
}
</script>
