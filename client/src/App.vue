

// src/App.vue
<script>
export default {
  name: 'App',
  data() {
    return {
      routes: [
        { path: '/home', name: 'Home' },
        { path: '/signup', name: 'Signup' },
        { path: '/login', name: 'Login' },


      ]
    }
  }
}
</script>

<template>
  <div id="app">
    
    <!-- <nav>
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->

    <!-- This is crucial - add router-view to show the routed components -->
    <router-view></router-view>
  </div>
</template>

<style>
.active {
  color: #42b983;
  font-weight: bold;
}
.exact-active {
  text-decoration: underline;
}
nav {
  padding: 20px;
}
nav a {
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}
nav a.router-link-active {
  color: #42b983;
  font-weight: bold;
}
</style>