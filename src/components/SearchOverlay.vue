<template>
  <div class="search-overlay" @click.self="$emit('close')">
    <div class="search-container">
      <!-- 搜索输入框 -->
      <div class="search-input-wrapper">
        <i class="fas fa-search search-icon"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜索文章..." 
          @input="handleSearch"
          ref="searchInput"
        >
        <button class="close-btn" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- 搜索结果 -->
      <div class="search-results" v-if="searchQuery">
        <div v-if="loading" class="loading">
          <i class="fas fa-spinner fa-spin"></i>
          搜索中...
        </div>
        <div v-else-if="results.length === 0" class="no-results">
          未找到相关内容
        </div>
        <div v-else class="results-list">
          <router-link 
            v-for="result in results" 
            :key="result.id"
            :to="result.path"
            class="result-item"
            @click="$emit('close')"
          >
            <h3>{{ result.title }}</h3>
            <p>{{ result.excerpt }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const searchQuery = ref('')
const loading = ref(false)
const results = ref([])
const searchInput = ref(null)

// 模拟搜索功能
const handleSearch = async () => {
  if (!searchQuery.value) {
    results.value = []
    return
  }

  loading.value = true
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 这里替换为实际的搜索逻辑
  results.value = [
    {
      id: 1,
      title: '示例文章 1',
      excerpt: '这是一个示例文章的摘要...',
      path: '/article/1'
    },
    // ... 更多结果
  ]
  loading.value = false
}

// 组件挂载时自动聚焦搜索框
onMounted(() => {
  searchInput.value?.focus()
})
</script>

<style scoped>
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1001;
  display: flex;
  justify-content: center;
  padding-top: 100px;
}

.search-container {
  width: 100%;
  max-width: 600px;
  margin: 0 1rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
}

.search-icon {
  color: var(--text-light);
  margin-right: 0.5rem;
}

input {
  flex: 1;
  border: none;
  background: none;
  font-size: 1.1rem;
  color: var(--text-color);
  padding: 0.5rem 0;
}

input:focus {
  outline: none;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.1rem;
}

.search-results {
  margin-top: 1rem;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  max-height: 60vh;
  overflow-y: auto;
}

.loading,
.no-results {
  padding: 2rem;
  text-align: center;
  color: var(--text-light);
}

.result-item {
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: var(--text-color);
  border-bottom: 1px solid var(--bg-color);
  transition: var(--transition);
}

.result-item:hover {
  background-color: var(--bg-color);
}

.result-item h3 {
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.result-item p {
  color: var(--text-light);
  font-size: 0.9rem;
  margin: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .search-overlay {
    padding-top: 60px;
  }
}
</style> 