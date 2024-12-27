// 主题管理模块
export function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // 加载保存的主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme === 'dark');
    
    // 主题切换事件
    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(!isDark);
    });
}

// 更新主题图标
function updateThemeIcon(isDark) {
    const icon = document.querySelector('#theme-toggle i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}