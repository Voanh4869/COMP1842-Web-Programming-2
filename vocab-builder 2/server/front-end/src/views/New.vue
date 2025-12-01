<template>
	<div class="new-view">
		<h2>New Word</h2>
		<WordForm @createOrUpdate="createOrUpdate" />
	</div>
</template>

<script setup>
import WordForm from '../components/WordForm.vue'
import { api, flash } from '../helpers/helpers'
import { useRouter } from 'vue-router'

const router = useRouter()
defineOptions({ name: 'New' })

async function createOrUpdate(word) {
	// Auth removed: allow creating words without login
	try {
		const newWord = { English: word.english, German: word.german, Vietnamese: word.vietnamese }
		await api.createWord(newWord)
		try { flash('Word created', 'success') } catch (e) {}
		router.push('/words')
	} catch (err) {
		console.error('Error creating word:', err)
	}
}
</script>

<style scoped>
.new-view { padding: 1rem; }
</style>

