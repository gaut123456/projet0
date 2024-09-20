<template>
  <div class="create-message">
    <h2>Create New Message</h2>
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <label for="message-content">Message:</label>
        <input 
          id="message-content"
          v-model="content" 
          type="text" 
          placeholder="Enter your message"
          required
        >
      </div>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateMessage',
  data() {
    return {
      content: ''
    }
  },
  methods: {
    async createMessage() {
      try {
        await axios.post('http://localhost:3000/api/messages', { content: this.content })
        this.content = ''
        alert('Message created successfully!')
        this.$router.push('/') // Redirect to message list after creating
      } catch (error) {
        console.error('Error creating message:', error)
        alert('Failed to create message. Please try again.')
      }
    }
  }
}
</script>

<style scoped>
.create-message {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>