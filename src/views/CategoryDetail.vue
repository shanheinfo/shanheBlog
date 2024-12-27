<template>
  <main class="category-detail">
    <header class="category-header">
      <h1 class="category-title">
        <i class="fas fa-folder"></i>
        {{ categoryName }}
      </h1>
      <div class="category-stats">
        共 {{ articles.length }} 篇文章
      </div>
    </header>

    <!-- 文章列表 -->
    <div class="articles-list">
      <article v-for="article in articles" :key="article.id" class="article-card">
        <!-- 文章封面图 -->
        <div class="article-cover" v-if="article.cover">
          <img :src="article.cover" :alt="article.title">
        </div>
        
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
                <i class="fas fa-eye"></i>
                {{ formatNumber(article.views) }} 阅读
              </span>
              <span class="meta-item">
                <i class="fas fa-comments"></i>
                {{ formatNumber(article.comments) }} 评论
              </span>
            </div>
            
            <!-- 文章标签 -->
            <div class="article-tags">
              <router-link 
                v-for="tag in article.tags" 
                :key="tag"
                :to="`/tag/${tag}`"
                class="tag"
              >
                <i class="fas fa-tag"></i>
                {{ tag }}
              </router-link>
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

const categoryName = ref('')
const articles = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const loading = ref(false)

// 获取分类文章列表
const fetchCategoryArticles = async () => {
  loading.value = true
  try {
    // 这里替换为实际的API调用
    const response = await fetch(
      `https://api.bluewu.cn/category/${route.params.name}?page=${currentPage.value}`
    )
    const data = await response.json()
    
    articles.value = data.articles
    totalPages.value = data.totalPages
    categoryName.value = route.params.name
  } catch (error) {
    console.error('获取分类文章失败:', error)
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
    fetchCategoryArticles()
  },
  { immediate: true }
)
</script>

<style scoped>
.category-detail {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.category-header {
  background: var(--card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow);
}

.category-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.category-title i {
  color: var(--primary-color);
}

.category-stats {
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
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.article-cover {
  height: 200px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.article-card:hover .article-cover img {
  transform: scale(1.05);
}

.article-content {
  padding: var(--spacing-lg);
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
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.meta-left {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.meta-item {
  color: var(--text-light);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: var(--bg-color);
  color: var(--text-light);
  border-radius: var(--border-radius-sm);
  text-decoration: none;
  font-size: 0.85rem;
  transition: var(--transition);
}

.tag:hover {
  background: var(--primary-color);
  color: white;
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
  }

  .article-cover {
    height: 160px;
  }
}
</style> 