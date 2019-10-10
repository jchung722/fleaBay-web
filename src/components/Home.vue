<template>
  <div>
    <div class="mx-auto shadow bg-cover bg-bottom pt-20" style="background-image: url(https://fleabay.net/wp-content/uploads/2019/07/Best-Flea-Markets-Marrakesh-1.jpg)">
      <div class="text-center text-white pb-10">
        <h1 class="text-6xl pt-5">Welcome to fleaBay</h1>
      </div>
      <router-link to="/auctions/new" class="button inline-block text-3xl px-5 py-3 mb-10 leading-none border rounded border-transparent bg-white hover:bg-black hover:text-white mt-4 lg:mt-0">Create An Auction!</router-link>
    </div>

    <div class="text-red-500 errors" v-if="error">{{ error }}</div>
    <AuctionCard
      v-for="auction in auctions"
      v-bind:key="auction.id"
      v-bind:auctionId="auction.id"
      v-bind:name="auction.name"
      v-bind:imageUrl="checkPicture(auction)"
      v-bind:bid="checkBid(auction)"
      v-bind:endDate="auction.end_date"
    ></AuctionCard>
  </div>
</template>

<script>
import fleaBayApi from '../services/fleaBayApi'
import AuctionCard from '@/components/AuctionCard'

export default {
  name: 'Home',
  components: {
    AuctionCard
  },
  data () {
    return {
      auctions: [],
      error: ''
    }
  },
  created () {
    fleaBayApi.getAllAuctions()
      .then(response => {
        this.auctions = response.data
        console.log(this.auctions[0].highest_bid.amount)
      })
      .catch(error => this.setError(error, 'Error retrieving auction.'))
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    checkPicture (auction) {
      const placeholderUrl = 'https://static.thenounproject.com/png/1174579-200.png'
      return auction.picture || placeholderUrl
    },
    checkBid (auction) {
      return (auction.highest_bid && auction.highest_bid.amount) || auction.starting_bid
    }
  }
}
</script>
