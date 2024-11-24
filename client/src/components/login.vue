<template>
  <div class="min-h-screen w-full flex bg-white">
  <!-- side banner -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-purple-900 
     items-center justify-center p-12 overflow-hidden"
    >
      <div class="relative z-10">
        <h1 class="
         text-5xl font-bold tracking-tight text-white mb-4"
         >
          Get Everything<br />You Want
        </h1>
        <p class="text-purple-200 text-lg max-w-md">
          You can get everything you want if you work hard, trust the process, and stick to the plan.
        </p>
      </div>
      <!-- Abstract Background Pattern -->
      <div 
        class="absolute inset-0 opacity-30"
        :style="{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width=%22100%25%22 height=%22100%25%22 viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 stop-color=%22%238B5CF6%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%234C1D95%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d=%22M0 0h100v100H0z%22 fill=%22url(%23g)%22/%3E%3C/svg%3E')`,
          filter: 'blur(50px)',
        }"
      ></div>
    </div>

    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>
          <p class="text-sm text-gray-600 mt-2">
            Enter your email and password to access your account
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your email"
              />
            </div>

            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your password"
              />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div class="text-sm">
                <a href="#" class="font-medium text-purple-600 hover:text-purple-500">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
            >
              Sign In
            </button>

            <button
              type="button"
              @click="signInWithGoogle"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </form>

        <p class="text-center text-sm text-gray-600">
          Don't have an account?
          <a href="/signup" class="font-medium text-purple-600 hover:text-purple-500">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router' // For navigation
import {variables} from '../lib/util.js'

// Form fields
const email = ref('')
const password = ref('')

// Router instance
const router = useRouter()

const handleSubmit = async () => {
  try {
    // Prepare the payload
    const payload = {
      email: email.value,
      password: password.value,
    }
    console.log(payload)

    // API URL
    const url = `${variables.baseUrl}/api/users/login`

    // Make the POST request
    const response = await axios.post(url, payload)

    // Handle the response
    if (response.status === 201) {
      const { token } = response.data

      
    localStorage.setItem('authToken', token)
    

      alert('Login successful!')
      // Redirect to home page
      router.push('/')
    } else {
      alert('Unexpected response from the server.')
    }
  } catch (error) {
    // Handle errors
    console.log(error)
  }
}

</script>