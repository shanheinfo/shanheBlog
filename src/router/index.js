import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页 - BlueWu的个人博客',
      description: 'BlueWu的个人技术博客，分享Web开发、前端技术、编程心得',
      keywords: '博客,BlueWu,前端,Vue,React,JavaScript'
    }
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('../views/Article.vue'),
    meta: {
      dynamicMeta: true
    }
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('../views/Timeline.vue'),
    meta: {
      title: '时间轴',
      description: '博客文章时间轴，按时间顺序展示所有文章',
      keywords: '时间轴,博客归档'
    }
  },
  {
    path: '/tags',
    name: 'Tags',
    component: () => import('../views/Tags.vue'),
    meta: {
      title: '标签云',
      description: '博客文章标签分类',
      keywords: '标签,分类,文章标签'
    }
  },
  {
    path: '/tag/:name',
    name: 'TagDetail',
    component: () => import('../views/TagDetail.vue'),
    meta: {
      title: '标签详情',
      description: '特定标签下的所有文章'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: '关于我',
      description: '博主个人介绍、技能栈、项目经验',
      keywords: '关于,个人介绍,技能栈'
    }
  },
  {
    path: '/category/:name',
    name: 'CategoryDetail',
    component: () => import('../views/CategoryDetail.vue'),
    meta: {
      title: '分类文章',
      description: '特定分类下的所有文章'
    }
  },
  {
    // 404页面
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '404 - 页面未找到'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // 对于需要动态获取meta信息的路由
  if (to.meta.dynamicMeta) {
    try {
      // 从后端获取页面meta信息
      const response = await fetch(`https://api.bluewu.cn/meta${to.path}`)
      const meta = await response.json()
      
      // 更新路由的meta信息
      to.meta = {
        ...to.meta,
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords
      }
    } catch (error) {
      console.error('获取页面meta信息失败:', error)
    }
  }

  // 设置页面标题
  const title = to.meta.title
    ? `${to.meta.title} - BlueWu.cn`
    : 'BlueWu.cn - 个人技术博客'
  document.title = title

  // 更新meta标签
  updateMetaTags(to.meta)

  next()
})

// 路由后置守卫
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})

// 更新meta标签
function updateMetaTags(meta) {
  // 更新description
  let descriptionMeta = document.querySelector('meta[name="description"]')
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta')
    descriptionMeta.name = 'description'
    document.head.appendChild(descriptionMeta)
  }
  descriptionMeta.content = meta.description || 'BlueWu的个人技术博客'

  // 更新keywords
  let keywordsMeta = document.querySelector('meta[name="keywords"]')
  if (!keywordsMeta) {
    keywordsMeta = document.createElement('meta')
    keywordsMeta.name = 'keywords'
    document.head.appendChild(keywordsMeta)
  }
  keywordsMeta.content = meta.keywords || 'BlueWu,博客,前端,技术'

  // 更新og:title
  let ogTitleMeta = document.querySelector('meta[property="og:title"]')
  if (!ogTitleMeta) {
    ogTitleMeta = document.createElement('meta')
    ogTitleMeta.setAttribute('property', 'og:title')
    document.head.appendChild(ogTitleMeta)
  }
  ogTitleMeta.content = meta.title || 'BlueWu.cn'

  // 更新og:description
  let ogDescriptionMeta = document.querySelector('meta[property="og:description"]')
  if (!ogDescriptionMeta) {
    ogDescriptionMeta = document.createElement('meta')
    ogDescriptionMeta.setAttribute('property', 'og:description')
    document.head.appendChild(ogDescriptionMeta)
  }
  ogDescriptionMeta.content = meta.description || 'BlueWu的个人技术博客'
}

export default router 