<template>
	<div>
		<h1>Vo Tuan Anh Words View</h1>
		<p>This is the Words view. Display and manage your vocabulary words here.</p>

		<div style="margin-bottom:0.5rem; display:flex; align-items:center; justify-content:space-between;">
			<div>
				<div class="ui label total-count" style="font-size: 15px;">Total: <strong>{{ words.length }}</strong></div>
			</div>
		</div>

		<div style="display:flex; gap:8px; align-items:center; margin-bottom:0.5rem;">
			<div style="flex:1;">
				<div class="ui icon input fluid">
					<input type="text" placeholder="Search English, German or Vietnamese..." v-model="query" />
					<i class="search icon"></i>
				</div>
			</div>
		</div>
		<table id="words" class="ui celled table">
			<thead>
				<tr>
						<th><i class="united kingdom flag"></i>English</th>
						<th><i class="germany flag"></i> German</th>
						<th><i class="vietnam flag"></i> Vietnamese</th>
						<th colspan="3"></th>
					</tr>
			</thead>
			
				<tr v-for="(word, index) in filteredWords" :key="word._id">
					<td>{{ word.english }}</td>
					<td>{{ word.german }}</td>
					<td>{{ word.vietnamese }}</td>
					<td width="75" class="center aligned">
					<router-link :to="{ name: 'show', params: { id: word._id } }">Show</router-link></td>
					<td width="75" class="center aligned">
						<router-link :to="{ name: 'edit', params: { id: word._id } }">Edit</router-link>
					</td>
					<td width="75" class="center aligned">
						<button class="ui button" @click.prevent="deleteWord(word._id, index)">Delete</button>
					</td>
				</tr>
		</table>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api, flash } from '../helpers/helpers'
defineOptions({ name: 'words' })

const words = ref([])

const query = ref('')
const filteredWords = computed(() => {
	const q = (query.value || '').trim().toLowerCase()
	if (!q) return words.value
	return words.value.filter(w => {
		const e = (w.english || '').toLowerCase()
		const g = (w.german || '').toLowerCase()
		const v = (w.vietnamese || '').toLowerCase()
		return e.includes(q) || g.includes(q) || v.includes(q)
	})
})

async function fetchWords() {
	try {
		const response = await api.get('/words')
		const data = Array.isArray(response.data) ? response.data : []
		words.value = data.map(w => ({
			_id: w._id ?? w.id ?? '',
			english: w.english ?? w.English ?? '',
			german: w.german ?? w.German ?? '',
			vietnamese: w.vietnamese ?? w.Vietnamese ?? ''
		}))
	} catch (error) {
		console.error('Error fetching words:', error)
	}
}

onMounted(fetchWords)

async function deleteWord(id /*, index */) {
	// Auth removed: allow deleting without login
	if (!confirm('Delete this word?')) return
	try {
		await api.delete(`/words/${id}`)
		try { flash('Word deleted successfully!', 'success') } catch (e) {}
		const localIdx = words.value.findIndex(w => w._id === id)
		if (localIdx !== -1) words.value.splice(localIdx, 1)
		else await fetchWords()
	} catch (err) {
		console.error('Error deleting word:', err)
		let msg = 'Failed to delete word'
		try {
			const data = err.response?.data
			if (data) msg = data.error || data.message || JSON.stringify(data)
			else if (err.response?.statusText) msg = err.response.statusText
			else if (err.message) msg = err.message
		} catch (e) {}
		try { flash(msg, 'error', 5000) } catch (e) {}
	}
}
</script>

<style>
.total-count strong {
	font-size: 15px;
	font-weight: 700;
	margin-left: 0.25rem;
}
</style>