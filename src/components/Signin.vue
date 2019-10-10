<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <h3 class="text-2xl mb-6 text-grey-darkest">Sign In</h3>
      <form @submit.prevent="signIn">

        <div class="mb-6">
          <label for="email" class="label">E-mail Address</label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" v-model="email" id="email" placeholder="youremail@email.com">
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" v-model="password" id="password" placeholder="Password">
        </div>

        <button type="submit" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-500 hover:bg-green-dark block w-full py-4 text-white items-center justify-center">Sign In</button>

        <div class="my-4"><router-link to="/signup" class="link-grey">Sign up</router-link></div>

        <div class="text-red-500 errors" v-if="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import fleaBayApi from '../services/fleaBayApi'

export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signIn () {
      fleaBayApi.signIn({ email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/')
      }
    }
  }
}
</script>
