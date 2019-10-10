<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <div class="w-full inline-block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <a href="/" class="font-semibold text-xl text-white tracking-tight"><h1>fleaBay</h1></a>
      </div>
      <div>
        <router-link to="/signin" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 signin" v-if="!isSignedIn()">Sign in</router-link>
        <router-link to="/signup" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 signup" v-if="!isSignedIn()">Sign Up</router-link>
        <a href="#" @click.prevent="signOut" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 signout" v-if="isSignedIn()">Sign out</a>
      </div>
    </div>
  </nav>
</template>

<script>
import fleaBayApi from '../services/fleaBayApi'

export default {
  name: 'Header',
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    isSignedIn () {
      return localStorage.signedIn
    },
    signOut () {
      fleaBayApi.signOut()
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/#')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
