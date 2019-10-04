<template>
  <div class="hello">
    <div class="mx-auto shadow bg-cover bg-bottom pt-20" style="background-image: url(https://fleabay.net/wp-content/uploads/2019/07/Best-Flea-Markets-Marrakesh-1.jpg)">
      <div class="text-center text-white pb-10">
        <h1 class="text-6xl pt-5">{{ msg }}</h1>
      </div>
      <router-link to="/auctions/new" class="inline-block text-3xl px-5 py-3 mb-10 leading-none border rounded border-transparent bg-white hover:bg-black hover:text-white mt-4 lg:mt-0">Create An Auction!</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to fleaBay'
    }
  }
}
</script>
