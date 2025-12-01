<template>
  <div id="app">
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>

          <router-link to="/words/new" class="item">
            <i class="plus circle icon"></i> New
          </router-link>

          <router-link to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>

          <router-link to="/about" class="item">
            <i class="user circle icon"></i> About
          </router-link>
        </div>
      </div>
    </div>

    <div class="ui text container">
      <!-- custom flash messages (listening for window 'flash' events) -->
      <div v-if="flashVisible" :class="['myFlash', flashType === 'error' ? 'flash-error' : 'flash-success']">
        <div class="flash-content">
          <span v-html="flashMsg"></span>
          <button class="flash-close" @click="flashVisible = false">×</button>
        </div>
      </div>
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>

    <footer class="ui inverted vertical footer segment" style="margin-top:2em;">
      <div class="ui center aligned container">
        <p style="margin:0.2rem 0">© 2025 Vocab Builder.</p>
        <p style="margin:0.2rem 0"><small>Built with Vue and Semantic UI.</small></p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from './helpers/helpers'

const flashMsg = ref(null)
const flashType = ref('success')
const flashVisible = ref(false)
let flashTimeoutId = null

onMounted(() => {
  window.addEventListener('flash', e => {
    try {
      const { message, type = 'success', timeout = 3000 } = e.detail || {}
      flashMsg.value = message
      flashType.value = type
      flashVisible.value = true
      if (flashTimeoutId) clearTimeout(flashTimeoutId)
      flashTimeoutId = setTimeout(() => {
        flashVisible.value = false
        flashTimeoutId = null
      }, timeout)
    } catch (err) {
      // ignore
    }
  })
})

async function loadWordCount() {
  try {
    const res = await api.getWords()
    wordsCount.value = Array.isArray(res) ? res.length : 0
  } catch (e) {
    console.error('Failed to load word count', e)
  }
}

onMounted(() => {
  // load initial word count
  loadWordCount()
})

const wordsCount = ref(0)

// expose to template (only flash UI and wordsCount)
const __exports = { flashMsg, flashType, flashVisible, wordsCount }
</script>

<style>
#app > div.navbar {
  margin-bottom: 1.5em;
}
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}
/* flash styles */
.myFlash.flash-success {
  background: #e6f4ea;
  border: 1px solid #bde5c7;
  color: #1b5e20;
  padding: 12px 16px;
  border-radius: 4px;
}
.myFlash.flash-error {
  background: #fcebea;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 12px 16px;
  border-radius: 4px;
}
.flash-content { display:flex; align-items:center; justify-content:space-between; }
.flash-close { background:transparent; border:0; font-size:18px; cursor:pointer; margin-left:8px }
input {
  width: 300px;
}
div.label {
  width: 120px;
}
div.input {
  margin-bottom: 10px;
}
button.ui.button {
  margin-top: 15px;
  display: block;
}
.user-badge { display:flex; align-items:center; gap:8px }
.user-avatar { width:28px; height:28px; border-radius:50%; object-fit:cover }
.user-name { font-size:0.95rem; color: #fff }
.admin-badge { background: #d9534f; color: white; padding: 2px 6px; border-radius: 12px; font-size: 0.75rem }
</style>