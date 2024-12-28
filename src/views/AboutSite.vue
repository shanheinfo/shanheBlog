<template>
  <div class="about-site">
    <div class="site-card">
      <h2 class="card-title">
        <i class="fas fa-info-circle"></i>
        关于本站
      </h2>
      <div class="card-content">
        <p>本站是一个基于 Vue3 开发的个人博客网站，主要用于分享技术文章和学习笔记。</p>
        
        <div class="feature-list">
          <h3>主要功能：</h3>
          <ul>
            <li>文章分类与标签管理</li>
            <li>评论系统</li>
            <li>代码高亮</li>
            <li>响应式设计</li>
            <li>深色模式支持</li>
          </ul>
        </div>

        <div class="tech-stack">
          <h3>技术栈：</h3>
          <ul>
            <li>
              <i class="fab fa-vuejs"></i>
              <span>Vue 3</span>
            </li>
            <li>
              <i class="fab fa-js"></i>
              <span>JavaScript</span>
            </li>
            <li>
              <i class="fas fa-code"></i>
              <span>HTML5 & CSS3</span>
            </li>
          </ul>
        </div>

        <div class="update-info">
          <h3>更新日志：</h3>
          <ul>
            <li>
              <span class="date">2024-03-20</span>
              <span class="update">新增评论功能</span>
            </li>
            <li>
              <span class="date">2024-03-15</span>
              <span class="update">优化移动端显示</span>
            </li>
            <li>
              <span class="date">2024-03-10</span>
              <span class="update">网站正式上线</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-site {
  padding: var(--spacing-lg);
}

.site-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
}

.card-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--primary-color);
  margin-bottom: var(--spacing-xl);
  font-size: 1.5rem;
}

.card-content {
  color: var(--text-color);
  line-height: 1.6;
}

.card-content > p {
  margin-bottom: var(--spacing-xl);
}

.feature-list, .tech-stack, .update-info {
  margin-bottom: var(--spacing-xl);
}

h3 {
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
  font-size: 1.2rem;
}

ul {
  list-style: none;
}

.feature-list ul li {
  margin-bottom: var(--spacing-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.feature-list ul li::before {
  content: "•";
  color: var(--primary-color);
}

.tech-stack ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
}

.tech-stack li {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--bg-color);
  border-radius: var(--border-radius);
}

.tech-stack i {
  color: var(--primary-color);
  font-size: 1.2rem;
}

.update-info ul li {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.update-info .date {
  color: var(--text-light);
  min-width: 100px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .about-site {
    padding: var(--spacing-md);
  }

  .site-card {
    padding: var(--spacing-lg);
  }

  .tech-stack ul {
    grid-template-columns: 1fr;
  }

  .update-info ul li {
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .update-info .date {
    min-width: auto;
  }
}

@media (max-width: 460px) {
  .about-site {
    padding: var(--spacing-sm);
  }

  .site-card {
    padding: var(--spacing-md);
  }

  .card-title {
    font-size: 1.3rem;
  }
}
</style> 