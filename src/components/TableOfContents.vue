<template>
  <div 
    class="toc-container" 
    v-show="headings.length > 0"
    :class="{ expanded: isExpanded }"
    :style="position"
    @mousedown="startDrag"
  >
    <!-- 折叠状态显示的按钮 -->
    <button 
      v-if="!isExpanded" 
      class="toc-button"
      @click="toggleExpand"
    >
      <i class="fas fa-list-ul"></i>
    </button>

    <!-- 展开状态显示的目录面板 -->
    <div v-else class="toc-panel">
      <div class="toc-header">
        <span>
          <i class="fas fa-list-ul"></i>
          文章目录
        </span>
        <button class="close-btn" @click="toggleExpand">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="toc-content">
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
    </div>
  </div>
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
const position = ref({
  right: '20px',
  top: '200px'
})

// 拖动相关状态
let isDragging = false
let startX = 0
let startY = 0
let startPosX = 0
let startPosY = 0

// 开始拖动
const startDrag = (e) => {
  isDragging = true
  startX = e.clientX
  startY = e.clientY
  startPosX = parseInt(position.value.right)
  startPosY = parseInt(position.value.top)

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

// 拖动中
const onDrag = (e) => {
  if (!isDragging) return
  
  const deltaX = startX - e.clientX
  const deltaY = e.clientY - startY
  
  position.value = {
    right: `${startPosX + deltaX}px`,
    top: `${startPosY + deltaY}px`
  }
}

// 停止拖动
const stopDrag = () => {
  isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// 切换展开/收起
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

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
.toc-container {
  position: fixed;
  z-index: 1000;
  cursor: move;
}

.toc-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.toc-button:hover {
  background: var(--primary-dark);
  transform: scale(1.1);
}

.toc-panel {
  width: 280px;
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.toc-header {
  padding: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: var(--transition);
}

.close-btn:hover {
  background: var(--bg-color);
  color: var(--primary-color);
}

.toc-content {
  max-height: 400px;
  overflow-y: auto;
  padding: var(--spacing-md) 0;
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
</style>
