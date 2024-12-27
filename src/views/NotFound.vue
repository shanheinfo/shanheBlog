<template>
  <main class="not-found">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">页面未找到</h1>
      <p class="error-message">抱歉，您访问的页面不存在或已被移除</p>
      <div class="actions">
        <router-link to="/" class="home-btn">
          <i class="fas fa-home"></i>
          返回首页
        </router-link>
        <button class="back-btn" @click="goBack">
          <i class="fas fa-arrow-left"></i>
          返回上页
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.not-found {
  min-height: calc(100vh - var(--header-height) - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
}

.not-found-content {
  text-align: center;
  max-width: 500px;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  color: var(--primary-color);
  line-height: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--spacing-lg);
}

.error-title {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
}

.error-message {
  color: var(--text-light);
  margin-bottom: var(--spacing-xl);
}

.actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.home-btn,
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
  cursor: pointer;
}

.home-btn {
  background: var(--primary-color);
  color: white;
  text-decoration: none;
}

.home-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.back-btn {
  background: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.back-btn:hover {
  background: var(--card-bg);
  transform: translateY(-2px);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .actions {
    flex-direction: column;
  }
}
</style> 