<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <UsersIcon class="w-5 h-5 mr-2 text-purple-600" />
        User Statistics
      </h2>
      <div class="grid grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 transform hover:scale-105 transition-transform">
          <div class="flex items-center justify-between mb-4">
            <p class="text-purple-600 font-medium">Total Users</p>
            <UsersIcon class="w-5 h-5 text-purple-500" />
          </div>
          <p class="text-3xl font-bold text-purple-700">{{ totalUsers }}</p>
          <p class="text-sm text-purple-600 mt-2">All registered users</p>
        </div>
        <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 transform hover:scale-105 transition-transform">
          <div class="flex items-center justify-between mb-4">
            <p class="text-green-600 font-medium">Active Users</p>
            <ActivityIcon class="w-5 h-5 text-green-500" />
          </div>
          <p class="text-3xl font-bold text-green-700">{{ activeUsers }}</p>
          <p class="text-sm text-green-600 mt-2">Currently active</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UsersIcon, ActivityIcon } from 'lucide-vue-next'

defineProps({
  totalUsers: {
    type: Number,
    required: true
  },
  activeUsers: {
    type: Number,
    required: true
  }
})
</script>