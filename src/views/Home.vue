<template>
  <main class="main-content">
    <article v-for="post in posts" :key="post.id" class="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
      <router-link :to="`/article/${post.id}`" class="read-more">
        阅读更多 <i class="fas fa-arrow-right"></i>
      </router-link>
    </article>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  {
    id: 1,
    title: 'Vue3 组件化开发实践',
    excerpt: '在现代前端开发中，组件化开发已经成为主流的开发方式。Vue3的组合式API（Composition API）为我们提供了更好的代码组织方式...'
  },
  {
    id: 2,
    title: 'TypeScript 高级特性详解',
    excerpt: 'TypeScript作为JavaScript的超集，提供了许多强大的特性。本文将深入探讨TypeScript的高级特性，包括泛型、装饰器、类型体操等内容...'
  }
])
</script>

<style scoped>
.post {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
}

.post:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
}

.read-more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-color);
    text-decoration: none;
    margin-top: 1rem;
}

.read-more:hover {
    color: var(--primary-light);
}
</style>