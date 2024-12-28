<template>
  <div class="app" :data-theme="theme">
    <!-- 遮罩层，用于移动端侧边栏打开时 -->
    <div class="overlay" :class="{ active: isOverlayVisible }" @click="closeAllSidebars"></div>

    <!-- 主容器 -->
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <Header
        @toggle-search="toggleSearch"
        @toggle-theme="toggleTheme"
      />

      <!-- 搜索悬浮框 -->
      <SearchOverlay
        v-if="isSearchOpen"
        @close="closeSearch"
      />

      <!-- 主要内容区域 -->
      <div class="content-container">
        <LeftSidebar :class="{ active: isLeftSidebarOpen }" />
        <router-view class="main-content"></router-view>
        <RightSidebar :class="{ active: isRightSidebarOpen }" />
      </div>
    </div>

    <!-- 移动端底部导航 -->
    <MobileNav
      @toggle-left="toggleLeftSidebar"
      @toggle-right="toggleRightSidebar"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import SearchOverlay from './components/SearchOverlay.vue'
import LeftSidebar from './components/LeftSidebar.vue'
import RightSidebar from './components/RightSidebar.vue'
import MobileNav from './components/MobileNav.vue'
import { useTheme } from './composables/theme'

// 使用主题组合函数
const { theme, toggleTheme } = useTheme()

// 状态管理
const isSearchOpen = ref(false)
const isLeftSidebarOpen = ref(false)
const isRightSidebarOpen = ref(false)

// 计算遮罩层是否可见
const isOverlayVisible = computed(() =>
  isLeftSidebarOpen.value || isRightSidebarOpen.value
)

// 搜索框控制
const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
}

const closeSearch = () => {
  isSearchOpen.value = false
}

// 侧边栏控制
const toggleLeftSidebar = () => {
  isLeftSidebarOpen.value = !isLeftSidebarOpen.value
  isRightSidebarOpen.value = false
}

const toggleRightSidebar = () => {
  isRightSidebarOpen.value = !isRightSidebarOpen.value
  isLeftSidebarOpen.value = false
}

const closeAllSidebars = () => {
  isLeftSidebarOpen.value = false
  isRightSidebarOpen.value = false
}
</script>

<style>
@import './styles/variables.css';

@import './styles/components.css';

/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
}

/* 遮罩层 */
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.overlay.active {
  display: block;
}

/* 主容器样式 */
.main-container {
  max-width: 1650px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: var(--card-bg);
  box-shadow: var(--shadow);
}

/* 内容区域布局 */
.content-container {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr) var(--sidebar-width);
  gap: 2rem;
  padding: 2rem;
  min-height: calc(100vh - var(--header-height));
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .main-container {
    margin: 0;
    width: 100%;
  }

  .content-container {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .sidebar-left,
  .sidebar-right {
    position: fixed;
    top: var(--header-height);
    height: calc(100vh - var(--header-height));
    background: var(--card-bg);
    z-index: 999;
    transition: transform 0.3s ease;
  }

  .sidebar-left {
    left: 0;
    transform: translateX(-100%);
  }

  .sidebar-right {
    right: 0;
    transform: translateX(100%);
  }

  .sidebar-left.active,
  .sidebar-right.active {
    transform: translateX(0);
  }
}
</style>
