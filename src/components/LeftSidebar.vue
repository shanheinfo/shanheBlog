<template>
  <aside class="sidebar-left">
    <!-- 个人信息卡片 -->
    <div class="profile-card">
      <img src="/avatar.png" alt="头像" class="avatar">
      <h3 class="name">博主名称</h3>
      <p class="bio">热爱技术，分享生活，记录成长的点点滴滴</p>
      <div class="social-links">
        <a href="#" title="GitHub"><i class="fab fa-github"></i></a>
        <a href="#" title="微博"><i class="fab fa-weibo"></i></a>
        <a href="#" title="邮箱"><i class="fas fa-envelope"></i></a>
      </div>
    </div>

    <!-- 导航菜单 -->
    <nav class="nav-menu">
      <ul>
        <li v-for="item in menuItems" :key="item.path">
          <!-- 带子菜单的导航项 -->
          <template v-if="item.children">
            <div 
              class="nav-item has-submenu" 
              :class="{ active: item.isOpen }"
              @click="toggleSubmenu(item)"
            >
              <div class="nav-item-content">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </div>
              <i class="fas fa-chevron-right submenu-arrow" 
                 :class="{ 'rotate': item.isOpen }">
              </i>
            </div>
            <transition name="slide">
              <ul class="submenu" v-show="item.isOpen">
                <li v-for="child in item.children" :key="child.path">
                  <router-link 
                    :to="child.path" 
                    class="nav-item"
                    active-class="active"
                  >
                    <i :class="child.icon"></i>
                    <span>{{ child.title }}</span>
                  </router-link>
                </li>
              </ul>
            </transition>
          </template>
          
          <!-- 普通导航项 -->
          <router-link 
            v-else 
            :to="item.path" 
            class="nav-item"
            active-class="active"
          >
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    
    <!-- Footer -->
    <Footer class="sidebar-footer" />
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import Footer from './Footer.vue'

const menuItems = ref([
  {
    title: '首页',
    path: '/',
    icon: 'fas fa-home'
  },
  {
    title: '文章分类',
    icon: 'fas fa-folder',
    isOpen: false,
    children: [
      { title: '技术博客', path: '/category/tech', icon: 'fas fa-code' },
      { title: '生活随笔', path: '/category/life', icon: 'fas fa-pen' },
      { title: '学习笔记', path: '/category/study', icon: 'fas fa-book' },
      { title: '项目分享', path: '/category/project', icon: 'fas fa-project-diagram' }
    ]
  },
  {
    title: '标签云',
    path: '/tags',
    icon: 'fas fa-tags'
  },
  {
    title: '时间线',
    path: '/timeline',
    icon: 'fas fa-clock'
  },
  {
    title: '关于我',
    path: '/about',
    icon: 'fas fa-user'
  }
])

const toggleSubmenu = (item) => {
  // 允许多个子菜单同时展开
  item.isOpen = !item.isOpen
}
</script>

<style scoped>
.sidebar-left {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: var(--spacing-md);
}

@media (max-width: 1024px) {
  .sidebar-footer {
    display: none; /* 在移动端隐藏侧边栏中的 footer */
  }
}

.sidebar-left {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  height: fit-content;
}

/* 个人信息卡片样式 */
.profile-card {
  text-align: center;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--bg-color);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 3px solid var(--primary-color);
  padding: 3px;
}

.name {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.bio {
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-links a {
  color: var(--text-light);
  font-size: 1.2rem;
  transition: var(--transition);
}

.social-links a:hover {
  color: var(--primary-color);
}

/* 导航菜单样式 */
.nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  border-radius: var(--border-radius);
  margin-bottom: 0.25rem;
  transition: var(--transition);
}

.nav-item-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.nav-item i {
  width: 20px;
  margin-right: 0.75rem;
}

.nav-item:hover, .nav-item.active {
  background-color: var(--primary-color);
  color: white;
}

/* 子菜单样式 */
.has-submenu {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submenu-arrow {
  transition: transform 0.3s ease;
}

.submenu-arrow.rotate {
  transform: rotate(90deg);
}

.submenu {
  padding-left: 1.5rem;
}

/* 子菜单动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .sidebar-left {
    border-radius: 0;
    height: 100%;
    overflow-y: auto;
  }
}
</style>