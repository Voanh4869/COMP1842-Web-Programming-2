<template>
    <div>
      <h1>Show Word</h1>
  
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" readonly  :value="word.german"/>
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" readonly  :value="word.english"/>
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="vietnam flag"></i> Vietnamese
        </div>
        <input type="text" readonly :value="word.vietnamese" />
      </div>
      <div class="actions">
        <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}">
          Edit word
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../helpers/helpers'

const route = useRoute()
defineOptions({ name: 'Show' })
const word = ref({ _id: null, english: '', german: '', vietnamese: '' })

onMounted(async () => {
  try {
    const id = route.params.id
    const w = await api.getWord(id)
    word.value = {
      _id: w._id || w.id,
      english: w.english || w.English || '',
      german: w.german || w.German || '',
      vietnamese: w.vietnamese || w.Vietnamese || ''
    }
  } catch (err) {
    console.error('Error loading word:', err)
  }
})

  </script>
  
  <style scoped>
  .actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
  }
  </style>