<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <UserPlusIcon class="w-5 h-5 mr-2 text-purple-600" />
        Invite New User
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 block">Email Address</label>
          <div class="relative">
            <MailIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              v-model="email"
              type="email"
              class="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="user@example.com"
              required
            />
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 block">Role</label>
          <div class="relative">
            <ShieldIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              v-model="role"
              class="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors appearance-none"
            >
              <option value="user">Regular User</option>
              <option value="admin">Administrator</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2.5 px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
        >
          <SendIcon v-if="!isLoading" class="w-5 h-5" />
          <LoaderIcon v-else class="w-5 h-5 animate-spin" />
          <span>{{ isLoading ? 'Sending Invitation...' : 'Send Invitation' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { MailIcon, ShieldIcon, SendIcon, LoaderIcon, UserPlusIcon } from 'lucide-vue-next'
import { variables } from '../lib/util.js'

const emit = defineEmits(['invite-sent'])
const email = ref('')
const role = ref('user')
const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    // Simulate API call
      const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post(
      `${variables.baseUrl}/api/mail/invite`,
      { email: email.value },
      config
    );
    
 
    emit('invite-sent')
    email.value = ''
    role.value = 'user'
  } finally {
    isLoading.value = false
  }
}
</script>