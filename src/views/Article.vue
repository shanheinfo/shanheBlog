<template>
  <main class="article-page">
    <div class="article-main">
      <!-- 文章头部 -->
      <header class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <div class="meta-left">
            <span class="meta-item">
              <i class="fas fa-user"></i>
              {{ article.author }}
            </span>
            <span class="meta-item">
              <i class="fas fa-calendar"></i>
              {{ formatDate(article.date) }}
            </span>
            <span class="meta-item">
              <i class="fas fa-folder"></i>
              {{ article.category }}
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
      </header>

      <!-- 文章内容 -->
      <div class="article-content markdown-body" v-html="article.content"></div>

      <!-- 文章标签 -->
      <div class="article-tags">
        <i class="fas fa-tags"></i>
        <router-link
          v-for="tag in article.tags"
          :key="tag"
          :to="`/tags/${tag}`"
          class="tag-link"
        >
          {{ tag }}
        </router-link>
      </div>

      <!-- 文章导航 -->
      <nav class="article-navigation">
        <router-link
          v-if="article.prevArticle"
          :to="`/article/${article.prevArticle.id}`"
          class="nav-item prev"
        >
          <i class="fas fa-arrow-left"></i>
          {{ article.prevArticle.title }}
        </router-link>
        <router-link
          v-if="article.nextArticle"
          :to="`/article/${article.nextArticle.id}`"
          class="nav-item next"
        >
          {{ article.nextArticle.title }}
          <i class="fas fa-arrow-right"></i>
        </router-link>
      </nav>

      <!-- 评论区组件 -->
      <Comments />
    </div>
    
    <TableOfContents :content="article.content" />
  </main>
</template>

<script setup>
import TableOfContents from '../components/TableOfContents.vue'
import Comments from '../components/Comments.vue'
import { ref } from 'vue'
import { formatDate, formatNumber } from '../utils/format'

// 模拟文章数据
const article = ref({
  id: 1,
  title: 'Vue3 组合式 API 最佳实践指南',
  author: '张三',
  date: '2024-01-15',
  category: '前端开发',
  views: 1234,
  comments: 56,
  tags: ['Vue3', 'JavaScript', '前端'],
  content: `
    <h2>引言</h2>
    <p>Vue3 的组合式 API 为我们提供了更好的代码组织方式...</p>
    <!-- 更多内容 -->
  `,
  prevArticle: {
    id: 2,
    title: '前端性能优化实战'
  },
  nextArticle: {
    id: 3,
    title: 'TypeScript 高级技巧'
  }
})
</script>

<style scoped>
.article-page {
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
  box-sizing: border-box;
}

.article-main {
  width: 100%;
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-xl);
  box-sizing: border-box;
}

.article-header {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-light);
}

.article-title {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-lg);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-light);
}

.meta-left, .meta-right {
  display: flex;
  gap: var(--spacing-md);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.article-content {
  margin-bottom: var(--spacing-xl);
}

.article-tags {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  margin-bottom: var(--spacing-xl);
  color: var(--text-light);
}

.tag-link {
  color: var(--primary-color);
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-color);
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  transition: var(--transition);
}

.tag-link:hover {
  background: var(--primary-color);
  color: white;
}

.article-navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xl);
  gap: var(--spacing-md);
}

.nav-item {
  flex: 1;
  padding: var(--spacing-md);
  background: var(--bg-color);
  border-radius: var(--border-radius);
  color: var(--text-color);
  text-decoration: none;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.nav-item:hover {
  background: var(--primary-color);
  color: white;
}

.nav-item.next {
  text-align: right;
  justify-content: flex-end;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .article-page {
    max-width: 100%;
    padding: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .article-page {
    padding: var(--spacing-md);
  }

  .article-main {
    padding: var(--spacing-md);
  }

  .article-title {
    font-size: 1.5rem;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .article-navigation {
    flex-direction: column;
  }
}
@media (max-width: 390px) {
  .article-page {
    padding: 0;
  }

  .article-main {
    padding: var(--spacing-md);
  }

  .article-title {
    font-size: 1.5rem;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .article-navigation {
    flex-direction: column;
  }
}
</style>
