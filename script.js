// Theme management
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme === 'dark');

function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(!isDark);
});

// Enhanced submenu handling
document.querySelectorAll('.has-submenu').forEach(item => {
    const link = item.querySelector('a');
    const submenu = item.querySelector('.submenu');
    
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const isActive = submenu.classList.contains('active');
        
        // Smooth height transition
        if (!isActive) {
            submenu.style.maxHeight = submenu.scrollHeight + 'px';
        } else {
            submenu.style.maxHeight = '0';
        }
        
        submenu.classList.toggle('active');
        
        // Add rotation animation to the icon
        const icon = link.querySelector('i');
        icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(90deg)';
        icon.style.transition = 'transform 0.3s ease';
    });
});

// Enhanced mobile navigation
const leftNavToggle = document.querySelector('.nav-toggle.left');
const rightNavToggle = document.querySelector('.nav-toggle.right');
const leftSidebar = document.querySelector('.sidebar-left');
const rightSidebar = document.querySelector('.sidebar-right');
const mainContent = document.querySelector('.main-content');
const overlay = document.createElement('div');

overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

function toggleSidebar(sidebar, isOpen) {
    sidebar.classList.toggle('active', isOpen);
    overlay.style.display = isOpen ? 'block' : 'none';
}

leftNavToggle.addEventListener('click', () => {
    const isOpen = !leftSidebar.classList.contains('active');
    toggleSidebar(leftSidebar, isOpen);
    toggleSidebar(rightSidebar, false);
});

rightNavToggle.addEventListener('click', () => {
    const isOpen = !rightSidebar.classList.contains('active');
    toggleSidebar(rightSidebar, isOpen);
    toggleSidebar(leftSidebar, false);
});

overlay.addEventListener('click', () => {
    toggleSidebar(leftSidebar, false);
    toggleSidebar(rightSidebar, false);
});