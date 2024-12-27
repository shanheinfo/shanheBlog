// 导航菜单管理
export function initNavigation() {
    // 二级菜单处理
    document.querySelectorAll('.has-submenu').forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSubmenu(submenu, link);
        });
    });
}

// 切换子菜单显示状态
function toggleSubmenu(submenu, link) {
    const isActive = submenu.classList.contains('active');
    
    if (!isActive) {
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
    } else {
        submenu.style.maxHeight = '0';
    }
    
    submenu.classList.toggle('active');
    
    // 图标旋转动画
    const icon = link.querySelector('i');
    icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(90deg)';
    icon.style.transition = 'transform 0.3s ease';
}