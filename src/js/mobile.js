// 移动端导航管理
export function initMobileNav() {
    const leftNavToggle = document.querySelector('.nav-toggle.left');
    const rightNavToggle = document.querySelector('.nav-toggle.right');
    const leftSidebar = document.querySelector('.sidebar-left');
    const rightSidebar = document.querySelector('.sidebar-right');
    
    // 创建遮罩层
    const overlay = createOverlay();
    
    // 绑定事件
    leftNavToggle.addEventListener('click', () => toggleSidebar(leftSidebar, rightSidebar));
    rightNavToggle.addEventListener('click', () => toggleSidebar(rightSidebar, leftSidebar));
    overlay.addEventListener('click', () => closeAllSidebars(leftSidebar, rightSidebar));
}

// 创建遮罩层
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    return overlay;
}

// 切换侧边栏
function toggleSidebar(targetSidebar, otherSidebar) {
    const isOpen = !targetSidebar.classList.contains('active');
    targetSidebar.classList.toggle('active', isOpen);
    otherSidebar.classList.remove('active');
    document.querySelector('.sidebar-overlay').style.display = isOpen ? 'block' : 'none';
}