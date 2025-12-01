import { createRouter, createWebHistory } from 'vue-router'
import Words from './views/Words.vue'
import New from './views/New.vue'
import Edit from './views/Edit.vue'
import Test from './views/Test.vue'
import Show from './views/Show.vue'
import About from './views/About.vue'

const routes = [
    // redirect root to words list
    { path: '/', redirect: '/words' },
    { path: '/words', name: 'words', component: Words },
    { path: '/words/new', name: 'new', component: New },
    { path: '/words/:id/edit', name: 'edit', component: Edit },
    { path: '/test', name: 'test', component: Test },
    { path: '/show/:id', name: 'show', component: Show },
    { path: '/about', name: 'about', component: About }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkActiveClass: 'active'
})

export default router