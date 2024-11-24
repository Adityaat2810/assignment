
<template>
  <div class="auth">
    <AuthC />
  </div>
</template>

<script>
import AuthC from '../components/signup.vue'


export default {
  name: 'Signup',
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