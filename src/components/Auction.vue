<template>
  <div class="max-w-2xl m-auto mt-10 py-10 border">
    <h3 class="text-3xl mb-4">Auction</h3>
    <p>Item: {{ auction.name }}</p>
    <p>Description: {{ auction.description }}</p>
    <p>Starting Bid: {{ auction.bid }}</p>
    <img :src="auction.picture">
    <p>End Date: {{ auction.end_date }}</p>
  </div>
</template>

<script>
export default {
  name: 'Auction',
  data () {
    return {
      auction: [],
      error: ''
    }
  },
  created () {
    const id = this.$route.params.id
    this.$http.plain.get('/auctions/' + id)
      .then(response => { this.auction = response.data })
      .catch(error => this.setError(error, 'Error creating auction.'))
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    }
  }
}
</script>
