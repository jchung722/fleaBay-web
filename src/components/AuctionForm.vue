<template>
  <div class="max-w-2xl m-auto mt-10 py-10 border">
    <div class="text-red-500 errors" v-if="error">{{ error }}</div>
    <h3 class="text-3xl mb-4">Create a new Auction!</h3>
    <form action="" @submit.prevent="createAuction">
      <div class="mb-6 text-left">
        <label class="label px-5">Name</label>
        <input class="appearance-none border rounded w-11/12 my-2 mx-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               placeholder="Cool Stuff"
               v-model="Auction.name" />
        <label class="label px-5">Starting Bid</label>
        <input class="appearance-none border rounded w-11/12 my-2 mx-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               placeholder="0.99"
               v-model="Auction.bid" />
        <label class="label px-5">Image URL</label>
        <input class="appearance-none border rounded w-11/12 my-2 mx-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               placeholder="img.cool.com"
               v-model="Auction.picture" />
        <label class="label px-5">End Date</label>
        <input class="appearance-none border rounded w-11/12 my-2 mx-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               placeholder="MM/DD/YYYY"
               v-model="Auction.end_date" />
        <label class="label px-5">Description</label>
        <textarea class="appearance-none border rounded w-11/12 my-2 mx-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  cols="40"
                  rows="5"
                  placeholder="Really cool stuff you should bid on."
                  v-model="Auction.description">
        </textarea>
      </div>
      <input type="submit" value="Create" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-blue-300 hover:bg-blue-300 block w-11/12 m-5 py-4 text-white items-center justify-center" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'AuctionForm',
  data () {
    return {
      Auction: [],
      error: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    createAuction () {
      const value = this.Auction
      if (!value) {
        return
      }
      this.$http.secured.post('/auctions', { auction:
                                             { name: this.Auction.name,
                                               bid: this.Auction.bid,
                                               picture: this.Auction.picture,
                                               end_date: new Date(this.Auction.end_date),
                                               description: this.Auction.description
                                             }
      })
        .then(response => {
          this.$router.replace('/auctions/' + response.data.id)
        })
        .catch(error => this.setError(error, 'Error creating auction.'))
    }
  }
}
</script>
