<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mt-8">
    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <ListIcon class="w-5 h-5 mr-2 text-purple-600" />
        User List
      </h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th v-for="header in headers" :key="header" 
                  class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {{ header }}
              </th>
              <th class="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <UserIcon class="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ `${user.firstName} ${user.lastName}` }}</div>
                    <div class="text-sm text-gray-500">{{ user.role }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-3 py-1 text-xs font-medium rounded-full',
                    'bg-green-100 text-green-800' 
                ]">
                  active
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                <button
                  @click="openEditModal(user)"
                  class="text-purple-600 hover:text-purple-900 bg-purple-50 p-2 rounded-lg transition-colors"
                >
                  <PencilIcon class="h-4 w-4" />
                </button>
                <button
                  @click="confirmDelete(user.id)"
                  class="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <TrashIcon class="h-4 w-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showEditModal" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Edit User</h3>
          <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-500">
            <XIcon class="w-5 h-5" />
          </button>
        </div>
        <form @submit.prevent="handleEdit" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 block">Name</label>
            <input
              v-model="editingUser.name"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 block">Role</label>
            <select
              v-model="editingUser.role"
              class="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import {
  UserIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
  ListIcon
} from 'lucide-vue-next'
import axios from 'axios'
import { variables } from '../lib/util.js'

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['user-deleted', 'user-updated'])

const headers = ['User', 'Email', 'Status']
const showEditModal = ref(false)
const editingUser = ref(null)

const openEditModal = (user) => {
  editingUser.value = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }
  showEditModal.value = true
}

const handleEdit = async () => {
  try {
    const [firstName, lastName] = editingUser.value.name.split(' ');
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const url = `${variables.baseUrl}/api/users/edit/${editingUser.value.id}`;
    const payload = {
      email: editingUser.value.email,
      firstName: firstName || " ",
      lastName: lastName || " ",
      role: editingUser.value.role,
    };

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.put(url, payload, config);

    if (response.status === 200) {
      // Instead of modifying props directly, emit the updated user
      emit('user-updated', {
        id: editingUser.value.id,
        firstName: firstName || '',
        lastName: lastName || '',
        email: editingUser.value.email,
        role: editingUser.value.role,
      });
      showEditModal.value = false;
    }
  } catch (error) {
    console.error('Update failed:', error);
    if (error.response?.status === 401) {
      alert('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      alert('You do not have permission to edit this user.');
    } else {
      alert('Update failed. Please try again later.');
    }
  }
};

const confirmDelete = async (userId) => {
  try {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

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

    const response = await axios.delete(
      `${variables.baseUrl}/api/users/delete/${userId}`, 
      config
    );
    console.log(response)

    if (response.status === 200) {
      emit('user-deleted', userId);
    }
  } catch (error) {
    console.error('Delete failed:', error);
    if (error.response?.status === 403) {
      alert('You do not have permission to delete users');
    } else if (error.response?.status === 400) {
      alert(error.response.data.error || 'Cannot delete this user');
    } else {
      alert('Failed to delete user. Please try again later.');
    }
  }
};
</script>