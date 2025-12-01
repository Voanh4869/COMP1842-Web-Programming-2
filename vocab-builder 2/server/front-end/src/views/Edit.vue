<template>
	<div class="edit-view">
		<h2>Edit Word</h2>
		<WordForm :word="word" @createOrUpdate="onCreateOrUpdate" />
		<div style="margin-top:1rem;">
			<router-link to="/words">Cancel</router-link>
		</div>
	</div>
</template>

<script setup>
import WordForm from '../components/WordForm.vue'
import { api, flash } from '../helpers/helpers'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

defineOptions({ name: 'Edit' })

const word = ref({ _id: null, english: '', german: '', vietnamese: '' })

onMounted(async () => {
	// Auth removed: allow loading edit view without logging in
	const id = route.params.id || route.params.wordId
	if (!id) return
	try {
		const w = await api.getWord(id)
		word.value = {
			_id: w._id || w.id,
			english: w.english || w.English || '',
			german: w.german || w.German || '',
			vietnamese: w.vietnamese || w.Vietnamese || ''
		}
	} catch (err) {
		console.error('Error loading word for edit:', err)
	}
})

async function onCreateOrUpdate(newWord) {
	// Auth removed: allow updates without login
	try {
		const body = {
			English: newWord.english || word.value.english,
			German: newWord.german || word.value.german,
			Vietnamese: newWord.vietnamese || word.value.vietnamese
		}
		await api.put(`/words/${word.value._id}`, body)
		try { flash('Word updated successfully!', 'success') } catch (e) {}
		router.push('/words')
	} catch (err) {
		console.error('Error updating word:', err)
	}
}
</script>

<style scoped>
.edit-view { padding: 1rem; }
</style>

