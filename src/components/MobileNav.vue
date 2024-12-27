<template>
  <nav class="mobile-nav">
    <button class="nav-toggle" @click="toggleLeftSidebar">
      <i class="fas fa-bars"></i>
    </button>
    <router-link to="/" class="home-button">
      <i class="fas fa-home"></i>
    </router-link>
    <button class="nav-toggle" @click="toggleRightSidebar">
      <i class="fas fa-info-circle"></i>
    </button>
  </nav>
</template>

<script setup>
const toggleLeftSidebar = () => {
  document.querySelector('.sidebar-left').classList.toggle('active')
}

const toggleRightSidebar = () => {
  document.querySelector('.sidebar-right').classList.toggle('active')
}
</script>

<style scoped>
.mobile-nav {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--card-bg);
    padding: 1rem;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.nav-toggle, .home-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--primary-color);
    cursor: pointer;
    padding: 0.5rem 1rem;
}

@media (max-width: 1024px) {
    .mobile-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>