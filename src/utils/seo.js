/**
 * SEO工具函数
 */

// 生成文章的结构化数据
export function generateArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.cover,
    datePublished: article.date,
    dateModified: article.updateDate,
    author: {
      '@type': 'Person',
      name: 'BlueWu',
      url: 'https://bluewu.cn/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'BlueWu.cn',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bluewu.cn/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bluewu.cn/article/${article.id}`
    }
  }
}

// 生成面包屑导航的结构化数据
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// 生成网站的结构化数据
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BlueWu.cn',
    description: 'BlueWu的个人技术博客，分享Web开发、前端技术、编程心得',
    url: 'https://bluewu.cn',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://bluewu.cn/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
}

// 生成站点地图
export function generateSitemap(routes) {
  const baseUrl = 'https://bluewu.cn'
  return routes
    .filter(route => !route.path.includes('*'))
    .map(route => ({
      url: `${baseUrl}${route.path}`,
      lastmod: new Date().toISOString(),
      changefreq: route.path === '/' ? 'daily' : 'weekly',
      priority: route.path === '/' ? 1.0 : 0.8
    }))
} 