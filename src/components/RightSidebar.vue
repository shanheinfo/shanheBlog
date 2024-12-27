<template>
  <aside class="sidebar-right">
    <!-- 博客统计卡片 -->
    <div class="info-card">
      <h3 class="card-title">
        <i class="fas fa-chart-line"></i>
        博客统计
      </h3>
      <ul class="stat-list">
        <li>
          <i class="fas fa-file-alt"></i>
          <span class="stat-label">文章数</span>
          <span class="stat-value">1,262</span>
        </li>
        <li>
          <i class="fas fa-comments"></i>
          <span class="stat-label">评论数</span>
          <span class="stat-value">6,060</span>
        </li>
        <li>
          <i class="fas fa-calendar-alt"></i>
          <span class="stat-label">运行天数</span>
          <span class="stat-value">3年22天</span>
        </li>
        <li>
          <i class="fas fa-clock"></i>
          <span class="stat-label">最后活动</span>
          <span class="stat-value">2小时前</span>
        </li>
        <li>
          <i class="fas fa-eye"></i>
          <span class="stat-label">访客总数</span>
          <span class="stat-value">2,612,193</span>
        </li>
      </ul>
    </div>

    <!-- 热门文章卡片 -->
    <div class="info-card">
      <h3 class="card-title">
        <i class="fas fa-fire"></i>
        热门文章
      </h3>
      <ul class="article-list">
        <li v-for="article in hotArticles" :key="article.id">
          <router-link :to="article.path">
            {{ article.title }}
            <span class="view-count">
              <i class="fas fa-eye"></i>
              {{ article.views }}
            </span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 标签云卡片 -->
    <div class="info-card">
      <h3 class="card-title">
        <i class="fas fa-tags"></i>
        标签云
      </h3>
      <div class="tag-cloud">
        <router-link 
          v-for="tag in tags" 
          :key="tag.name"
          :to="`/tag/${tag.name}`"
          :style="{ fontSize: `${tag.size}rem` }"
        >
          {{ tag.name }}
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

// 热门文章数据
const hotArticles = ref([
  { id: 1, title: 'Vue3 组合式 API 最佳实践', path: '/article/1', views: 1234 },
  { id: 2, title: 'TypeScript 高级技巧分享', path: '/article/2', views: 986 },
  { id: 3, title: '前端性能优化实战指南', path: '/article/3', views: 876 },
  { id: 4, title: 'Node.js 服务端开发技巧', path: '/article/4', views: 765 },
  { id: 5, title: '响应式设计完全指南', path: '/article/5', views: 654 }
])

// 标签云数据
const tags = ref([
  { name: 'Vue', size: 1.4 },
  { name: 'React', size: 1.3 },
  { name: 'JavaScript', size: 1.5 },
  { name: 'TypeScript', size: 1.2 },
  { name: 'Node.js', size: 1.3 },
  { name: 'CSS', size: 1.2 },
  { name: '前端', size: 1.4 },
  { name: '后端', size: 1.1 },
  { name: '性能优化', size: 1.0 },
  { name: '工程化', size: 1.2 }
])
</script>

<style scoped>
.sidebar-right {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.info-card {
  padding: 1.5rem;
  border-bottom: 1px solid var(--bg-color);
}

.info-card:last-child {
  border-bottom: none;
}

.card-title {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-title i {
  color: var(--primary-color);
}

/* 统计列表样式 */
.stat-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stat-list li {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px dashed var(--bg-color);
}

.stat-list li:last-child {
  border-bottom: none;
}

.stat-list i {
  width: 20px;
  margin-right: 0.75rem;
  color: var(--primary-color);
}

.stat-label {
  flex: 1;
  color: var(--text-light);
}

.stat-value {
  color: var(--primary-color);
  font-weight: 500;
}

/* 热门文章列表样式 */
.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-list li {
  margin-bottom: 0.75rem;
}

.article-list a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color);
  text-decoration: none;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.article-list a:hover {
  background-color: var(--bg-color);
  color: var(--primary-color);
}

.view-count {
  font-size: 0.9rem;
  color: var(--text-light);
}

.view-count i {
  margin-right: 0.25rem;
}

/* 标签云样式 */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag-cloud a {
  color: var(--text-light);
  text-decoration: none;
  transition: var(--transition);
}

.tag-cloud a:hover {
  color: var(--primary-color);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .sidebar-right {
    border-radius: 0;
    height: 100%;
    overflow-y: auto;
  }
}
</style>