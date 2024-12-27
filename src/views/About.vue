<template>
  <main class="about-page">
    <!-- 个人信息卡片 -->
    <section class="profile-card">
      <div class="profile-header">
        <img src="/avatar.png" alt="头像" class="profile-avatar">
        <div class="profile-info">
          <h1 class="profile-name">山河</h1>
          <p class="profile-title">全栈开发工程师</p>
          <div class="profile-social">
            <a href="https://github.com" target="_blank" title="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="mailto:example@email.com" title="Email">
              <i class="fas fa-envelope"></i>
            </a>
            <a href="https://weibo.com" target="_blank" title="微博">
              <i class="fab fa-weibo"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="profile-stats">
        <div class="stat-item">
          <span class="stat-value">1,262</span>
          <span class="stat-label">文章</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">6,060</span>
          <span class="stat-label">评论</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">12,345</span>
          <span class="stat-label">访问</span>
        </div>
      </div>
    </section>

    <!-- 个人简介 -->
    <section class="about-section">
      <h2 class="section-title">
        <i class="fas fa-user"></i>
        关于我
      </h2>
      <div class="section-content">
        <p>热爱编程，热爱技术，致力于分享技术经验和学习心得。主要关注后端开发，前端开发、Java、云原生等技术领域。</p>
        <p>1年+工作经验，参与过多个大型项目开发，对现代前端工程化、性能优化、跨平台开发等领域有深入研究。</p>
      </div>
    </section>

    <!-- 技能栈 -->
    <section class="about-section">
      <h2 class="section-title">
        <i class="fas fa-code"></i>
        技能栈
      </h2>
      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill.name" class="skill-item">
          <div class="skill-header">
            <i :class="skill.icon"></i>
            <span>{{ skill.name }}</span>
          </div>
          <div class="skill-bar">
            <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目经历 -->
    <section class="about-section">
      <h2 class="section-title">
        <i class="fas fa-project-diagram"></i>
        项目经历
      </h2>
      <div class="projects-list">
        <div v-for="project in projects" :key="project.name" class="project-card">
          <h3 class="project-title">{{ project.name }}</h3>
          <p class="project-desc">{{ project.description }}</p>
          <div class="project-tech">
            <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
          <a :href="project.link" target="_blank" class="project-link">
            <i class="fas fa-external-link-alt"></i>
            查看项目
          </a>
        </div>
      </div>
    </section>

    <!-- 联系方式 -->
    <section class="about-section">
      <h2 class="section-title">
        <i class="fas fa-envelope"></i>
        联系我
      </h2>
      <div class="contact-info">
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <span>example@email.com</span>
        </div>
        <div class="contact-item">
          <i class="fab fa-weixin"></i>
          <span>WeChat_ID</span>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const skills = ref([
  { name: 'Vue.js', level: 90, icon: 'fab fa-vuejs' },
  { name: 'React', level: 85, icon: 'fab fa-react' },
  { name: 'Node.js', level: 80, icon: 'fab fa-node-js' },
  { name: 'JavaScript', level: 95, icon: 'fab fa-js' },
  { name: 'TypeScript', level: 85, icon: 'fas fa-code' },
  { name: 'Docker', level: 75, icon: 'fab fa-docker' }
])

const projects = ref([
  {
    name: '企业级中台系统',
    description: '基于 Vue3 + TypeScript 开发的大型中台系统，包含数十个业务模块...',
    technologies: ['Vue3', 'TypeScript', 'Element Plus'],
    link: '#'
  },
  {
    name: '跨平台移动应用',
    description: '使用 React Native 开发的跨平台移动应用，支持 iOS 和 Android...',
    technologies: ['React Native', 'Redux', 'Node.js'],
    link: '#'
  }
])
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 0 auto;
}

.profile-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.profile-header {
  display: flex;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.8rem;
  margin-bottom: var(--spacing-sm);
}

.profile-title {
  color: var(--text-light);
  margin-bottom: var(--spacing-md);
}

.profile-social {
  display: flex;
  gap: var(--spacing-md);
}

.profile-social a {
  color: var(--text-light);
  font-size: 1.5rem;
  transition: var(--transition);
}

.profile-social a:hover {
  color: var(--primary-color);
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  text-align: center;
}

.stat-item {
  padding: var(--spacing-md);
  background: var(--bg-color);
  border-radius: var(--border-radius);
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
}

.stat-label {
  color: var(--text-light);
  font-size: 0.9rem;
}

.about-section {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title i {
  color: var(--primary-color);
}

.section-content {
  line-height: 1.8;
  color: var(--text-color);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.skill-item {
  background: var(--bg-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: var(--spacing-sm);
}

.skill-header i {
  color: var(--primary-color);
}

.skill-bar {
  height: 6px;
  background: var(--border-light);
  border-radius: 3px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: var(--primary-color);
  border-radius: 3px;
  transition: width 1s ease;
}

.projects-list {
  display: grid;
  gap: var(--spacing-lg);
}

.project-card {
  background: var(--bg-color);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
}

.project-title {
  margin-bottom: var(--spacing-sm);
}

.project-desc {
  color: var(--text-light);
  margin-bottom: var(--spacing-md);
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.tech-tag {
  background: var(--card-bg);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--primary-color);
  text-decoration: none;
}

.contact-info {
  display: grid;
  gap: var(--spacing-md);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-color);
  border-radius: var(--border-radius);
}

.contact-item i {
  color: var(--primary-color);
  font-size: 1.25rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-social {
    justify-content: center;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style> 