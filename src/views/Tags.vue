<template>
  <main class="tags-page">
    <h1 class="page-title">
      <i class="fas fa-tags"></i>
      标签云
    </h1>

    <!-- 标签云展示 -->
    <div class="tags-cloud">
      <router-link
        v-for="tag in tags"
        :key="tag.name"
        :to="`/tag/${tag.name}`"
        class="tag-item"
        :style="{
          fontSize: `${1 + (tag.count / maxCount) * 0.5}rem`,
          '--tag-size': tag.count
        }"
      >
        {{ tag.name }}
        <span class="tag-count">{{ tag.count }}</span>
      </router-link>
    </div>

    <!-- 标签列表 -->
    <div class="tags-list">
      <div v-for="tag in sortedTags" :key="tag.name" class="tag-section">
        <h2 class="tag-header">
          <i class="fas fa-tag"></i>
          {{ tag.name }}
          <span class="tag-count">{{ tag.count }}</span>
        </h2>

        <div class="articles-list">
          <router-link
            v-for="article in tag.articles"
            :key="article.id"
            :to="`/article/${article.id}`"
            class="article-item"
          >
            <span class="article-title">{{ article.title }}</span>
            <div class="article-meta">
              <span class="meta-item">
                <i class="fas fa-calendar"></i>
                {{ formatDate(article.date) }}
              </span>
              <span class="meta-item">
                <i class="fas fa-eye"></i>
                {{ formatNumber(article.views) }}
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatDate, formatNumber } from '../utils/format'

// 模拟标签数据
const tags = ref([
  {
    name: 'Vue3',
    count: 42,
    articles: [
      {
        id: 1,
        title: 'Vue3 组合式 API 最佳实践',
        date: '2024-01-15',
        views: 1234
      },
      // ... 更多文章
    ]
  },
  {
    name: 'TypeScript',
    count: 35,
    articles: [
      {
        id: 2,
        title: 'TypeScript 高级类型指南',
        date: '2024-01-10',
        views: 986
      },
      // ... 更多文章
    ]
  },
  // ... 更多标签
])

// 计算最大文章数量，用于标签云字体大小计算
const maxCount = computed(() => {
  return Math.max(...tags.value.map(tag => tag.count))
})

// 按文章数量排序的标签列表
const sortedTags = computed(() => {
  return [...tags.value].sort((a, b) => b.count - a.count)
})
</script>

<style scoped>
.tags-page {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.page-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: var(--spacing-xl);
  color: var(--text-color);
}

.page-title i {
  color: var(--primary-color);
}

.tags-cloud {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-xl);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  justify-content: center;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: var(--border-radius);
  text-decoration: none;
  transition: var(--transition);
  position: relative;
}

.tag-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0.1;
  background: var(--primary-color);
}

.tag-item:hover {
  transform: translateY(-2px);
  color: var(--primary-color);
}

.tag-count {
  font-size: 0.85em;
  color: var(--text-light);
  background: var(--card-bg);
  padding: 0.2em 0.5em;
  border-radius: var(--border-radius-sm);
}

.tag-section {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);
}

.tag-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-light);
  color: var(--text-color);
}

.tag-header i {
  color: var(--primary-color);
}

.articles-list {
  display: grid;
  gap: var(--spacing-md);
}

.article-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--bg-color);
  border-radius: var(--border-radius);
  text-decoration: none;
  transition: var(--transition);
}

.article-item:hover {
  transform: translateX(4px);
  background: var(--primary-color);
}

.article-item:hover .article-title,
.article-item:hover .meta-item {
  color: white;
}

.article-title {
  color: var(--text-color);
  transition: var(--transition);
}

.article-meta {
  display: flex;
  gap: var(--spacing-md);
}

.meta-item {
  color: var(--text-light);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: var(--transition);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .article-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .tag-item {
    font-size: 0.9rem !important;
  }
}
</style> 