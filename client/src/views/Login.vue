
<template>
  <div class="auth">
    <AuthC />
  </div>
</template>

<script>
import AuthC from '../components/login.vue'


export default {
  name: 'Login',
  // Fix 3: Register the component in components option
  components: {
    AuthC
  }
}
</script>

<style scoped>
.auth {

}
</style>