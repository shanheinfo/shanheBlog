<template>
  <main class="main-content">
    <article v-for="post in displayedPosts" :key="post.id" class="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
      <router-link :to="`/article/${post.id}`" class="read-more">
        阅读更多 <i class="fas fa-arrow-right"></i>
      </router-link>
    </article>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> 加载中...
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentPage = ref(1)
const loading = ref(false)
const displayedPosts = ref([])
const hasMore = ref(true)

// 模拟获取文章列表的API调用
const fetchPosts = async (page) => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 模拟分页数据
  const pageSize = 10
  const mockPosts = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Vue3 文章标题 ${index + 1}`,
    excerpt: `这是第 ${index + 1} 篇文章的摘要。在现代前端开发中，组件化开发已经成为主流的开发方式。Vue3的组合式API（Composition API）为我们提供了更好的代码组织方式...`
  }))
  
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const posts = mockPosts.slice(start, end)
  
  hasMore.value = end < mockPosts.length
  return posts
}

// 加载更多文章
const loadMorePosts = async () => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  try {
    const newPosts = await fetchPosts(currentPage.value)
    displayedPosts.value.push(...newPosts)
    currentPage.value++
  } catch (error) {
    console.error('Failed to load posts:', error)
  } finally {
    loading.value = false
  }
}

// 检查滚动位置
const checkScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY
  const bottomPosition = document.documentElement.offsetHeight - 100 // 提前100px触发
  
  if (scrollPosition >= bottomPosition) {
    loadMorePosts()
  }
}

// 节流函数
const throttle = (fn, delay) => {
  let lastCall = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      fn.apply(this, args)
      lastCall = now
    }
  }
}

const throttledCheckScroll = throttle(checkScroll, 200)

onMounted(async () => {
  // 初始加载
  await loadMorePosts()
  
  // 添加滚动监听
  window.addEventListener('scroll', throttledCheckScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledCheckScroll)
})
</script>

<style scoped>
.main-content {
  padding: var(--spacing-lg);
}

.post {
  margin-bottom: 2rem;
  padding: var(--spacing-lg);
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.post h2 {
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
}

.post p {
  color: var(--text-light);
  margin-bottom: var(--spacing-md);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.read-more:hover {
  color: var(--primary-dark);
}

.loading {
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--text-light);
}

.loading i {
  margin-right: var(--spacing-sm);
}

@media (max-width: 768px) {
  .main-content {
    padding: var(--spacing-md);
  }
  
  .post {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }
}
</style>