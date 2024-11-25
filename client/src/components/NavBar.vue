<template>
  <nav class="bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3">
            <LayoutDashboardIcon class="w-6 h-6" />
            <span class="text-xl font-bold">Admin Portal</span>
          </div>
          <div class="hidden md:flex space-x-4 ml-8">
            <a href="#" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors text-gray-200">Dashboard</a>
            <a href="#" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors text-gray-200">Users</a>
            <a href="#" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors text-gray-200">Settings</a>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button class="flex items-center space-x-2 hover:bg-purple-700 px-3 py-2 rounded-md transition-colors">
              <UserIcon class="w-5 h-5" />
              <span class="hidden md:block">Admin</span>
            </button>
          </div>
          <button @click="logout" class="flex items-center space-x-2 hover:bg-purple-700 px-3 py-2 rounded-md transition-colors">
            <LogOutIcon class="w-5 h-5" />
            <span class="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { UserIcon, LogOutIcon, LayoutDashboardIcon } from 'lucide-vue-next'

const logout = () => {
  // Implement logout logic
}
</script>