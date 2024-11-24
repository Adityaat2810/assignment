<template>
  <div class="min-h-screen bg-gray-50">
    <nav-bar />
    <div class="container mx-auto px-4 py-6">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">User Management Dashboard</h1>
      </header>
      
      <div class="grid gap-6 md:grid-cols-2">
        <stats-card 
          :total-users="users.length" 
          :active-users="activeUsers"
        />
        <invite-user @invite-sent="refreshUsers" />
      </div>

      <user-table 
        :users="users" 
        @user-deleted="handleUserDelete"
        @user-updated="handleUserUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import StatsCard from '../components/StatsCard.vue'
import InviteUser from '../components/InviteUser.vue'
import UserTable from '../components/UserTable.vue'
import { variables } from '../lib/util.js'
import axios from 'axios'


const users = ref([])
const activeUsers = computed(() => users.value.filter(user => user.status === 'active').length)

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    console.log('token is ',token)
    const url=`${variables.baseUrl}/api/users/all`
    console.log(`url is `,url)
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}` // Pass the token for authorization
      }
    });

    users.value = response.data; // Assign fetched users to the reactive variable
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
  }
};

const handleUserDelete = async (userId) => {
  // Implement delete logic
  users.value = users.value.filter(user => user.id !== userId)
}

const handleUserUpdate = async (userData) => {
  // Implement update logic
  const index = users.value.findIndex(user => user.id === userData.id)
  if (index !== -1) {
    users.value[index] = { ...users.value[index], ...userData }
  }
}

const refreshUsers = () => {
  fetchUsers()
}

onMounted(() => {
  fetchUsers()
})
</script>