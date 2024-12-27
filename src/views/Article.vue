<template>
  <main class="article-page">
    <!-- 文章头部信息 -->
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
            <router-link :to="`/category/${article.category}`">
              {{ article.category }}
            </router-link>
          </span>
        </div>
        
        <div class="meta-right">
          <span class="meta-item">
            <i class="fas fa-eye"></i>
            {{ formatNumber(article.views) }} 阅读
          </span>
          <span class="meta-item">
            <i class="fas fa-comments"></i>
            {{ formatNumber(article.comments) }} 评论
          </span>
        </div>
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
    </header>

    <!-- 文章内容 -->
    <div class="article-content markdown-body" v-html="article.content"></div>

    <!-- 文章底部 -->
    <footer class="article-footer">
      <!-- 版权信息 -->
      <div class="copyright">
        <i class="fas fa-copyright"></i>
        版权声明：本文著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
      </div>

      <!-- 上一篇/下一篇 -->
      <div class="article-navigation">
        <router-link 
          v-if="article.prevArticle"
          :to="`/article/${article.prevArticle.id}`"
          class="nav-item prev"
        >
          <i class="fas fa-chevron-left"></i>
          <span>{{ article.prevArticle.title }}</span>
        </router-link>
        
        <router-link
          v-if="article.nextArticle"
          :to="`/article/${article.nextArticle.id}`"
          class="nav-item next"
        >
          <span>{{ article.nextArticle.title }}</span>
          <i class="fas fa-chevron-right"></i>
        </router-link>
      </div>
    </footer>

    <!-- 评论区 -->
    <section class="comments-section">
      <h2 class="section-title">
        <i class="fas fa-comments"></i>
        评论区
      </h2>
      
      <!-- 评论列表 -->
      <div class="comments-list">
        <div v-for="comment in article.comments" :key="comment.id" class="comment-item">
          <div class="comment-avatar">
            <img :src="comment.avatar" :alt="comment.author">
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-date">{{ formatRelativeTime(comment.date) }}</span>
            </div>
            <div class="comment-text">{{ comment.content }}</div>
            <div class="comment-actions">
              <button class="action-btn" @click="replyToComment(comment)">
                <i class="fas fa-reply"></i>
                回复
              </button>
              <button class="action-btn" @click="likeComment(comment)">
                <i class="fas fa-heart"></i>
                {{ comment.likes }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 评论输入框 -->
      <div class="comment-form">
        <textarea 
          v-model="newComment"
          placeholder="写下你的评论..."
          rows="4"
        ></textarea>
        <button class="submit-btn" @click="submitComment">
          发表评论
        </button>
      </div>
    </section>

    <!-- 右侧目录 -->
    <aside class="article-sidebar">
      <TableOfContents :content="article.content" />
    </aside>
  </main>
</template>

<script setup>
import TableOfContents from '../components/TableOfContents.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { formatDate, formatNumber, formatRelativeTime } from '../utils/format'

const route = useRoute()
const newComment = ref('')

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

// 提交评论
const submitComment = () => {
  if (!newComment.value.trim()) return
  // 这里添加提交评论的逻辑
  newComment.value = ''
}

// 回复评论
const replyToComment = (comment) => {
  // 这里添加回复评论的逻辑
}

// 点赞评论
const likeComment = (comment) => {
  // 这里添加点赞评论的逻辑
}

onMounted(() => {
  // 这里添加获取文章详情的逻辑
})
</script>

<style scoped>
.article-page {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-xl);
  max-width: var(--content-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: var(--spacing-xl);
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

/* 复用之前的 meta 和 tags 样式 */
.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  font-size: 0.9rem;
}

.meta-left, .meta-right {
  display: flex;
  gap: var(--spacing-md);
}

.meta-item {
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* 文章内容样式 */
.article-content {
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: var(--spacing-xl);
}

/* 文章底部样式 */
.article-footer {
  border-top: 1px solid var(--border-light);
  padding-top: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.copyright {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--bg-color);
  border-radius: var(--border-radius);
}

.article-navigation {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.nav-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: var(--spacing-md);
  background: var(--bg-color);
  border-radius: var(--border-radius);
  color: var(--text-color);
  text-decoration: none;
  transition: var(--transition);
}

.nav-item:hover {
  background: var(--primary-color);
  color: white;
}

.nav-item.next {
  text-align: right;
  justify-content: flex-end;
}

/* 评论区样式 */
.comments-section {
  margin-top: var(--spacing-xl);
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comment-item {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.comment-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.comment-author {
  font-weight: 500;
  color: var(--primary-color);
}

.comment-date {
  color: var(--text-light);
  font-size: 0.9rem;
}

.comment-text {
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
}

.comment-actions {
  display: flex;
  gap: var(--spacing-md);
}

.action-btn {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: var(--transition);
}

.action-btn:hover {
  color: var(--primary-color);
}

.comment-form {
  margin-top: var(--spacing-xl);
}

textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--bg-color);
  color: var(--text-color);
  resize: vertical;
  margin-bottom: var(--spacing-md);
}

.submit-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
}

.submit-btn:hover {
  background: var(--primary-dark);
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .article-page {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .article-page {
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