<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <span class="auth-icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            class="lock-icon"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </span>
        <h2>{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Name field - only shown during signup -->
        <div v-if="!isLogin" class="form-group">
          <label for="name">Full Name</label>
          <input 
            id="name" 
            v-model.trim="formData.name" 
            type="text" 
            required
            placeholder="Enter your full name"
            autocomplete="name"
          >
        </div>

        <!-- Email field -->
        <div class="form-group">
          <label for="email">Email address</label>
          <input 
            id="email" 
            v-model.trim="formData.email" 
            type="email" 
            required
            placeholder="Enter your email"
            autocomplete="email"
          >
        </div>

        <!-- Password field -->
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input 
              id="password" 
              v-model="formData.password" 
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="Enter your password"
              autocomplete="current-password"
            >
            <button 
              type="button" 
              class="toggle-password"
              @click="togglePasswordVisibility"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" v-if="!showPassword"/>
                <line x1="1" y1="1" x2="23" y2="23" v-if="showPassword"/>
                <path d="M17 17l-6-6" v-if="showPassword"/>
                <circle cx="12" cy="12" r="3" v-if="!showPassword"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Submit button -->
        <button 
          type="submit" 
          class="submit-btn"
          :disabled="loading"
        >
          <span v-if="!loading">{{ isLogin ? 'Sign In' : 'Sign Up' }}</span>
          <span v-else class="loading-spinner"></span>
        </button>
      </form>

      <!-- Toggle between login and signup -->
      <div class="auth-footer">
        <a href="#" @click.prevent="toggleAuthMode">
          {{ isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in' }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',
  
  data() {
    return {
      isLogin: true,
      showPassword: false,
      loading: false,
      formData: {
        email: '',
        password: '',
        name: ''
      }
    }
  },

  methods: {
    toggleAuthMode() {
      this.isLogin = !this.isLogin
      this.formData = {
        email: '',
        password: '',
        name: ''
      }
      this.showPassword = false
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },

    async handleSubmit() {
      try {
        this.loading = true
        
        // Validate form data
        if (!this.formData.email || !this.formData.password) {
          throw new Error('Please fill in all required fields')
        }

        if (!this.isLogin && !this.formData.name) {
          throw new Error('Please enter your name')
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(this.formData.email)) {
          throw new Error('Please enter a valid email address')
        }

        // Minimum password length
        if (this.formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long')
        }

        // Here you would typically make an API call
        console.log(this.isLogin ? 'Logging in with:' : 'Signing up with:', this.formData)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Handle success (you would typically navigate or show success message)
        alert(this.isLogin ? 'Login successful!' : 'Account created successfully!')
        
      } catch (error) {
        // Handle errors
        alert(error.message || 'An error occurred. Please try again.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 20px;
  box-sizing: border-box;
}

.auth-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #4f46e5;
  color: white;
  padding: 12px;
  border-radius: 50%;
  margin-bottom: 16px;
}

h2 {
  font-size: 24px;
  color: #1a1a1a;
  margin: 0;
  font-weight: 600;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  padding: 0;
}

.toggle-password:hover {
  color: #4f46e5;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.submit-btn:hover {
  background-color: #4338ca;
}

.submit-btn:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.auth-footer {
  text-align: center;
  margin-top: 24px;
}

a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

a:hover {
  color: #4338ca;
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .auth-card {
    padding: 24px;
  }

  h2 {
    font-size: 20px;
  }

  input {
    padding: 10px;
    font-size: 14px;
  }
}
</style>