<template>
    <div class="message-list">
      <h2>Messages</h2>
      <ul>
        <li v-for="message in messages" :key="message._id" class="message-item">
          {{ message.content }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'MessageList',
    data() {
      return {
        messages: []
      }
    },
    mounted() {
      this.fetchMessages()
    },
    methods: {
      async fetchMessages() {
        try {
          const response = await axios.get('http://localhost:3000/api/messages')
          this.messages = response.data
        } catch (error) {
          console.error('Error fetching messages:', error)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .message-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  .message-item {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>