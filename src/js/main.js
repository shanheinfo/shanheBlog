// 导入模块
import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initMobileNav } from './mobile.js';

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initMobileNav();
});