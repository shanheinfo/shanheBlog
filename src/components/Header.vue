<template>
    <header class="header">
      <div class="header-content">
        <!-- 左侧Logo和标题 -->
        <div class="logo">
          <img src="/logo.png" alt="Logo" class="logo-img">
          <h1 class="site-title">博客网站</h1>
        </div>
        
        <!-- 右侧功能区 -->
        <div class="header-right">
          <!-- 搜索按钮 -->
          <button class="icon-btn" @click="$emit('toggle-search')" title="搜索">
            <i class="fas fa-search"></i>
          </button>
          
          <!-- 主题切换按钮 -->
          <button class="icon-btn" @click="$emit('toggle-theme')" title="切换主题">
            <i :class="themeIcon"></i>
          </button>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useTheme } from '../composables/theme'
  
  const { theme, themeIcon } = useTheme()
  </script>
  
  <style scoped>
  .header {
    background-color: var(--primary-color);
    width: 100%;
    height: var(--header-height);
    box-shadow: var(--shadow);
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .header-content {
    max-width: var(--max-width);
    height: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .logo-img {
    height: 32px;
    width: auto;
  }
  
  .site-title {
    color: white;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .icon-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.25rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .icon-btn:hover {
    background-color: var(--primary-light);
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .site-title {
      font-size: 1.1rem;
    }
  
    .icon-btn {
      width: 36px;
      height: 36px;
      font-size: 1.1rem;
    }
  }
  </style>