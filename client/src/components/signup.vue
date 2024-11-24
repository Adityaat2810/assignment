<template>
  <div class="min-h-screen w-full flex bg-white">
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
            Welcome 
          </h2>
          <p class="text-sm text-gray-600 mt-2">
            Enter your detailsto create your account !
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
        <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
        <input
          id="firstName"
          v-model="firstName"
          type="text"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Enter your first name"
        />
      </div>

      <div class="space-y-2">
        <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          id="lastName"
          v-model="lastName"
          type="text"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Enter your last name"
        />
      </div>

      <div class="space-y-2">
        <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
        <select
          id="role"
          v-model="role"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="" disabled selected>Select a role</option>
          <option value="ADMIN">Admin</option>
          <option value="MODERATOR">Moderator</option>
          <option value="GUEST">Guest</option>
        </select>
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

           
          </div>

          <div class="space-y-4">
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
            >
              Create Account
            </button>

           
          </div>
        </form>

        <p class="text-center text-sm text-gray-600">
          Already have an account?
          <a href="/login" class="font-medium text-purple-600 hover:text-purple-500">
            Sign In
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import {variables} from '../lib/util.js'
  import axios from 'axios'
  import { useRouter } from 'vue-router' 

  
  const email = ref('')
  const password = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const role = ref('') 

  const router = useRouter()

  
  const handleSubmit = async () => {
  try {
    // Prepare the payload
    const payload = {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      role: role.value,
    }

    // API URL
    const url = `${variables.baseUrl}/api/users/register`

    // Make the POST request
    const response = await axios.post(url, payload)

    // Handle the response
    if (response.status === 201) {
     const { token } = response.data
      // Save token to localStorage 
      localStorage.setItem('authToken', token)

      alert('Registration successful!')
      // Redirect to home page
      router.push('/')
    } else {
      alert('Unexpected response from the server.')
    }
  } catch (error) {
    // Handle errors
    if (error.response) {
      // Server returned an error response
      alert(`Error: ${error.response.data.message || 'Something went wrong!'}`)
    } else {
      // Network or other error
      alert('Error: Unable to connect to the server.')
    }
  }
  }
 
</script>