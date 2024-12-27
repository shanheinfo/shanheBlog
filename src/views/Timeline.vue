<template>
  <main class="timeline-page">
    <h1 class="page-title">
      <i class="fas fa-clock"></i>
      时间轴
    </h1>

    <!-- 年份导航 -->
    <div class="year-nav">
      <button 
        v-for="year in years" 
        :key="year"
        class="year-btn"
        :class="{ active: currentYear === year }"
        @click="scrollToYear(year)"
      >
        {{ year }}
      </button>
    </div>

    <!-- 时间线内容 -->
    <div class="timeline">
      <div v-for="(yearData, year) in timelineData" :key="year" class="timeline-year" :id="`year-${year}`">
        <div class="year-marker">
          <span class="year-label">{{ year }}</span>
          <span class="post-count">{{ yearData.length }} 篇文章</span>
        </div>
        
        <div class="timeline-items">
          <div v-for="item in yearData" :key="item.id" class="timeline-item">
            <div class="timeline-date">
              <span class="date">{{ formatDate(item.date, 'MM-DD') }}</span>
              <span class="time">{{ formatDate(item.date, 'HH:mm') }}</span>
            </div>
            
            <div class="timeline-content">
              <router-link :to="`/article/${item.id}`" class="timeline-title">
                {{ item.title }}
              </router-link>
              
              <div class="timeline-meta">
                <span class="meta-item">
                  <i class="fas fa-folder"></i>
                  <router-link :to="`/category/${item.category}`">
                    {{ item.category }}
                  </router-link>
                </span>
                <span class="meta-item">
                  <i class="fas fa-eye"></i>
                  {{ formatNumber(item.views) }} 阅读
                </span>
                <span class="meta-item">
                  <i class="fas fa-comments"></i>
                  {{ formatNumber(item.comments) }} 评论
                </span>
              </div>
              
              <div class="timeline-tags">
                <router-link 
                  v-for="tag in item.tags" 
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
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <button 
      class="back-to-top"
      :class="{ visible: showBackToTop }"
      @click="scrollToTop"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { formatDate, formatNumber } from '../utils/format'

// 模拟时间线数据
const timelineData = ref({
  '2024': [
    {
      id: 1,
      title: 'Vue3 组合式 API 最佳实践指南',
      date: '2024-01-15 14:30',
      category: '前端开发',
      views: 1234,
      comments: 56,
      tags: ['Vue3', 'JavaScript']
    },
    // ... 更多文章
  ],
  '2023': [
    {
      id: 2,
      title: 'TypeScript 高级技巧分享',
      date: '2023-12-20 10:15',
      category: '前端开发',
      views: 986,
      comments: 43,
      tags: ['TypeScript', '前端']
    },
    // ... 更多文章
  ],
  // ... 更多年份
})

const years = Object.keys(timelineData.value).sort((a, b) => b - a)
const currentYear = ref(years[0])
const showBackToTop = ref(false)

// 滚动到指定年份
const scrollToYear = (year) => {
  currentYear.value = year
  const element = document.getElementById(`year-${year}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 返回顶���
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 监听滚动事件
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300

  // 更新当前年份
  for (const year of years) {
    const element = document.getElementById(`year-${year}`)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 100) {
        currentYear.value = year
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.timeline-page {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  position: relative;
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

.year-nav {
  position: sticky;
  top: calc(var(--header-height) + var(--spacing-md));
  background: var(--card-bg);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-xl);
  z-index: 10;
  display: flex;
  gap: var(--spacing-sm);
  overflow-x: auto;
}

.year-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
}

.year-btn.active {
  background: var(--primary-color);
  color: white;
}

.timeline {
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 120px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-color);
}

.timeline-year {
  margin-bottom: var(--spacing-xl);
}

.year-marker {
  margin-bottom: var(--spacing-lg);
  margin-left: 120px;
  padding-left: var(--spacing-xl);
  position: relative;
}

.year-marker::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  width: 14px;
  height: 14px;
  background: var(--primary-color);
  border-radius: 50%;
  transform: translateY(-50%);
}

.year-label {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
}

.post-count {
  margin-left: var(--spacing-md);
  color: var(--text-light);
  font-size: 0.9rem;
}

.timeline-item {
  display: flex;
  margin-bottom: var(--spacing-lg);
}

.timeline-date {
  width: 120px;
  text-align: right;
  padding-right: var(--spacing-xl);
  flex-shrink: 0;
}

.date {
  display: block;
  font-weight: 500;
  color: var(--text-color);
}

.time {
  display: block;
  font-size: 0.9rem;
  color: var(--text-light);
}

.timeline-content {
  flex: 1;
  background: var(--card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  position: relative;
}

.timeline-content::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  width: 12px;
  height: 12px;
  background: var(--card-bg);
  border-radius: 50%;
  transform: translateY(-50%);
  border: 2px solid var(--primary-color);
}

.timeline-title {
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-color);
  text-decoration: none;
  margin-bottom: var(--spacing-sm);
  transition: var(--transition);
}

.timeline-title:hover {
  color: var(--primary-color);
}

.timeline-meta {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
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

.timeline-tags {
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

.back-to-top {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .timeline::before {
    left: 80px;
  }

  .year-marker {
    margin-left: 80px;
  }

  .timeline-date {
    width: 80px;
    padding-right: var(--spacing-lg);
  }

  .timeline-content {
    margin-right: 0;
  }
}
</style> 