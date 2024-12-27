<template>
  <nav class="table-of-contents" v-show="headings.length > 0">
    <div class="toc-header">
      <i class="fas fa-list-ul"></i>
      文章目录
    </div>

    <div class="toc-content" ref="tocContent">
      <div
        v-for="heading in headings"
        :key="heading.id"
        class="toc-item"
        :class="{
          active: activeId === heading.id,
          [`level-${heading.level}`]: true
        }"
        :style="{ paddingLeft: `${(heading.level - 1) * 1}rem` }"
      >
        <a
          :href="`#${heading.id}`"
          @click.prevent="scrollToHeading(heading.id)"
        >
          {{ heading.text }}
        </a>
      </div>
    </div>

    <!-- 展开/收起按钮（移动端） -->
    <button class="toc-toggle" @click="toggleToc">
      <i :class="isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
    </button>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const headings = ref([])
const activeId = ref('')
const isExpanded = ref(false)
const tocContent = ref(null)

// 解析文章内容中的标题
const parseHeadings = () => {
  const article = document.querySelector('.article-content')
  if (!article) return

  const headingElements = article.querySelectorAll('h1, h2, h3, h4, h5, h6')
  headings.value = Array.from(headingElements).map(el => ({
    id: el.id,
    text: el.textContent,
    level: parseInt(el.tagName.charAt(1))
  }))
}

// 滚动到指定标题
const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // 头部导航的高度
    const top = element.offsetTop - offset
    window.scrollTo({
      top,
      behavior: 'smooth'
    })

    // 移动端自动收起目录
    if (window.innerWidth <= 768) {
      isExpanded.value = false
    }
  }
}

// 监听标题元素的可见性
const observeHeadings = () => {
  const article = document.querySelector('.article-content')
  if (!article) return

  const headingElements = article.querySelectorAll('h1, h2, h3, h4, h5, h6')

  const callback = (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id
        break
      }
    }
  }

  const observer = new IntersectionObserver(callback, {
    rootMargin: '-80px 0px -80% 0px'
  })

  headingElements.forEach(el => observer.observe(el))

  // 清理函数
  return () => {
    headingElements.forEach(el => observer.unobserve(el))
  }
}

// 切换目录展开/收起（移动端）
const toggleToc = () => {
  isExpanded.value = !isExpanded.value
}

// 组件挂载时初始化
onMounted(() => {
  parseHeadings()
  const cleanup = observeHeadings()

  // 清理函数
  onUnmounted(() => {
    if (cleanup) cleanup()
  })
})
</script>

<style scoped>
.table-of-contents {
  position: sticky;
  top: calc(var(--header-height) + var(--spacing-lg));
  max-height: calc(100vh - var(--header-height) - var(--spacing-lg) * 2);
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: var(--transition);
}

.toc-header {
  padding: var(--spacing-md);
  font-weight: 500;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toc-header i {
  color: var(--primary-color);
}

.toc-content {
  padding: var(--spacing-md) 0;
  overflow-y: auto;
  max-height: calc(100vh - var(--header-height) - 150px);
}

.toc-item {
  line-height: 1.6;
}

.toc-item a {
  display: block;
  padding: 0.25rem var(--spacing-md);
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.9rem;
  transition: var(--transition);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toc-item:hover a {
  color: var(--primary-color);
  background: var(--bg-color);
}

.toc-item.active a {
  color: var(--primary-color);
  background: var(--bg-color);
  font-weight: 500;
}

.toc-toggle {
  display: none;
  width: 100%;
  padding: var(--spacing-sm);
  border: none;
  background: var(--card-bg);
  color: var(--text-color);
  cursor: pointer;
  border-top: 1px solid var(--border-color);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .table-of-contents {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    max-height: 50vh;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    transform: translateY(calc(100% - 40px));
    z-index: 100;
  }

  .table-of-contents.expanded {
    transform: translateY(0);
  }

  .toc-toggle {
    display: block;
  }

  .toc-content {
    max-height: calc(50vh - 80px);
  }
}
</style>
