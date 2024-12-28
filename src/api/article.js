import axiosService from '../utils/axios'

export const articleApi = {
    // 获取文章列表
    getArticles(params) {
        return axiosService.get('/articles', params)
    },

    // 使用 slug 获取文章详情
    getArticleBySlug(slug) {
        return axiosService.get(`/articles/${slug}`)
    },

    // 创建文章时需要生成 slug
    createArticle(data) {
        // 后端会处理 slug 的生成
        return axiosService.post('/articles', data)
    },

    // 更新文章
    updateArticle(slug, data) {
        return axiosService.put(`/articles/${slug}`, data)
    },

    // 删除文章
    deleteArticle(slug) {
        return axiosService.delete(`/articles/${slug}`)
    }
} 