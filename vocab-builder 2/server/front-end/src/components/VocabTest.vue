  <template>
    <div>
      <h2>Score: {{ score }} out of {{ total }}</h2>

      <form action="#" @submit.prevent="onSubmit">
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="germany flag"></i> German
          </div>
          <input type="text" readonly :disabled="testOver" :value="currWord.german || ''" />
        </div>

        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="united kingdom flag"></i> English
          </div>
          <input type="text" placeholder="Enter English word..." v-model="english" :disabled="testOver" autocomplete="off" />
        </div>

        <div class="ui labeled input fluid" style="margin-top:0.5rem;">
          <div class="ui label">
            <i class="vietnam flag"></i> Vietnamese
          </div>
          <input type="text" placeholder="Enter Vietnamese word..." v-model="vietnamese" :disabled="testOver" autocomplete="off" />
        </div>

        <button class="positive ui button" :disabled="testOver">Submit</button>
      </form>

      <p v-if="testOver" :class="['results', resultClass]">
        <template v-if="incorrectGuesses.length === 0">
          You got everything correct. Well done!
        </template>
        <template v-else>
          <strong>You got the following words wrong:</strong>
          <ul>
            <li v-for="(item, idx) in incorrectGuesses" :key="idx">{{ item }}</li>
          </ul>
        </template>
      </p>
    </div>
  </template>

  <script setup>
import { ref, computed, watch } from 'vue'
import { flash } from '../helpers/helpers'

const props = defineProps({ words: { type: Array, required: true } })

const randWords = ref([])
const incorrectGuesses = ref([])
const english = ref('')
const vietnamese = ref('')
const score = ref(0)
const testOver = ref(false)
const total = ref(0)

const currWord = computed(() => randWords.value[0] || {})
const resultClass = computed(() => {
  if (!testOver.value) return ''
  return incorrectGuesses.value.length === 0 ? 'success' : 'error'
})

function onSubmit() {
  const guessEng = (english.value || '').trim().toLowerCase()
  const guessVn = (vietnamese.value || '').trim().toLowerCase()
  const answerEng = (currWord.value.english || '').trim().toLowerCase()
  const answerVn = (currWord.value.vietnamese || '').trim().toLowerCase()

  // Both English and Vietnamese must match to be correct
  if (guessEng && guessVn && guessEng === answerEng && guessVn === answerVn) {
    try { flash('Correct!', 'success', 1000) } catch (e) {}
    score.value += 1
  } else {
    try { flash('Wrong!', 'error', 1000) } catch (e) {}
    incorrectGuesses.value.push(`${currWord.value.english || ''} / ${currWord.value.vietnamese || ''} - ${currWord.value.german || ''}`)
  }

  english.value = ''
  vietnamese.value = ''
  randWords.value.shift()
  if (randWords.value.length === 0) testOver.value = true
}

watch(
  () => props.words,
  (newWords) => {
    if (!Array.isArray(newWords) || newWords.length === 0) {
      randWords.value = []
      total.value = 0
      return
    }

    const normalized = newWords.map(w => ({
      _id: w._id || w.id,
      english: w.english || w.English || '',
      german: w.german || w.German || '',
      vietnamese: w.vietnamese || w.Vietnamese || ''
    }))

    total.value = normalized.length
    randWords.value = normalized.sort(() => 0.5 - Math.random())
    incorrectGuesses.value = []
    english.value = ''
    score.value = 0
    testOver.value = false
  },
  { immediate: true }
)
  </script>

  <style scoped>
  .results { 
    margin: 25px auto; 
    padding: 15px; 
    border-radius: 5px; 
  }
  .error { 
    border: 1px solid #ebccd1; 
    color: #a94442; 
    background-color: #f2dede; 
  }
  .success { 
    border: 1px solid #d6e9c6; 
    color: #3c763d; 
    background-color: #dff0d8; 
  }
  </style>