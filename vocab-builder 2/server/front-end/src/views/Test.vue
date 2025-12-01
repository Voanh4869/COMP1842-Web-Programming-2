<template>
  <div>
    <h1>Test</h1>

    <div v-if="words.length < 5">
      <p>You need to enter at least five words to begin the test</p>
    </div>

    <div v-else>
      <div v-if="!started">
        <p>Ready to begin the test?</p>
        <button class="ui primary button" @click="startTest">Start Test</button>
      </div>
      <div v-else>
        <VocabTest :words="words" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api, flash } from '../helpers/helpers'
import VocabTest from '../components/VocabTest.vue'

defineOptions({ name: 'Test' })

const words = ref([])
const started = ref(false)

onMounted(async () => {
  try {
    const res = await api.getWords()
    // api.getWords may return an array or an axios response
    words.value = Array.isArray(res) ? res : (res.data || [])
  } catch (e) {
    console.error('Failed to load words for test', e)
  }
})

async function startTest() {
  // Auth removed: start test without logging in
  started.value = true
}
</script>