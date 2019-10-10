<template>
  <router-link :to="auctionUrl">
  <div class="inline-block w-64 rounded overflow-hidden shadow-lg mt-10 ml-10">
    <img class="w-full h-64" :src="imageUrl" alt="item image">
    <div class="bg-gray-200">
      <div class="px-6 pt-4">
        <div class="font-bold text-xl mb-2">{{ name }}</div>
      </div>
      <div class="px-6 pb-4 text-left">
        <span class="inline-block px-3 py-1 text-lg font-semibold text-gray-700 mr-2 bid">Bid: ${{ formatPrice(bid) }}</span>
        <span class="inline-block px-3 py-1 text-lg font-semibold text-gray-700 mr-2 date">Ends: {{ endDate }}</span>
      </div>
    </div>
  </div>
  </router-link>
</template>

<script>
export default {
  name: 'AuctionCard',
  props: ['auctionId', 'imageUrl', 'name', 'bid', 'endDate'],
  data () {
    return {
      auctionUrl: '/auctions/' + this.auctionId
    }
  },
  methods: {
    formatPrice (price) {
      return (price / 1).toFixed(2)
    }
  }
}
</script>
