<template>
  <main class="tag-detail">
    <header class="tag-header">
      <h1 class="tag-title">
        <i class="fas fa-tag"></i>
        {{ tagName }}
      </h1>
      <div class="tag-stats">
        共 {{ articles.length }} 篇文章
      </div>
    </header>

    <!-- 文章列表 -->
    <div class="articles-list">
      <article v-for="article in articles" :key="article.id" class="article-card">
        <div class="article-content">
          <router-link :to="`/article/${article.id}`" class="article-title">
            {{ article.title }}
          </router-link>
          
          <p class="article-excerpt">{{ article.excerpt }}</p>
          
          <!-- 文章元信息 -->
          <div class="article-meta">
            <div class="meta-left">
              <span class="meta-item">
                <i class="fas fa-calendar"></i>
                {{ formatDate(article.date) }}
              </span>
              <span class="meta-item">
                <i class="fas fa-folder"></i>
                <router-link :to="`/category/${article.category}`">
                  {{ article.category }}
                </router-link>
              </span>
            </div>
            
            <div class="meta-right">
              <span class="meta-item">
                <i class="fas fa-eye"></i>
                {{ formatNumber(article.views) }}
              </span>
              <span class="meta-item">
                <i class="fas fa-comments"></i>
                {{ formatNumber(article.comments) }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- 分页器 -->
    <div class="pagination" v-if="totalPages > 1">
      <button 
        class="page-btn"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <button 
        v-for="page in totalPages"
        :key="page"
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
      
      <button 
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatDate, formatNumber } from '../utils/format'

const route = useRoute()
const router = useRouter()

const tagName = ref('')
const articles = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const loading = ref(false)

// 获取标签文章列表
const fetchTagArticles = async () => {
  loading.value = true
  try {
    const response = await fetch(
      `https://api.bluewu.cn/tag/${route.params.name}?page=${currentPage.value}`
    )
    const data = await response.json()
    
    articles.value = data.articles
    totalPages.value = data.totalPages
    tagName.value = route.params.name
  } catch (error) {
    console.error('获取标签文章失败:', error)
  } finally {
    loading.value = false
  }
}

// 切换页码
const changePage = (page) => {
  currentPage.value = page
  router.push({
    query: { page: page > 1 ? page : undefined }
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 监听路由参数变化
watch(
  () => route.params.name,
  () => {
    currentPage.value = parseInt(route.query.page) || 1
    fetchTagArticles()
  },
  { immediate: true }
)
</script>

<style scoped>
.tag-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.tag-header {
  background: var(--card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow);
}

.tag-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.tag-title i {
  color: var(--primary-color);
}

.tag-stats {
  color: var(--text-light);
  font-size: 0.9rem;
}

.articles-list {
  display: grid;
  gap: var(--spacing-lg);
}

.article-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.article-title {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-color);
  text-decoration: none;
  margin-bottom: var(--spacing-sm);
  display: block;
  transition: var(--transition);
}

.article-title:hover {
  color: var(--primary-color);
}

.article-excerpt {
  color: var(--text-light);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta-left,
.meta-right {
  display: flex;
  gap: var(--spacing-md);
}

.meta-item {
  color: var(--text-light);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-item a {
  color: inherit;
  text-decoration: none;
  transition: var(--transition);
}

.meta-item a:hover {
  color: var(--primary-color);
}

/* 分页样式复用之前的代码 */
.pagination {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xl);
}

.page-btn {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--card-bg);
  color: var(--text-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
}

.page-btn:hover:not(:disabled) {
  background: var(--primary-color);
  color: white;
}

.page-btn.active {
  background: var(--primary-color);
  color: white;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
}
</style> 