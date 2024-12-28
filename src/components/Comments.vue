<template>
  <section class="comments-section">
    <h2 class="section-title">
      <i class="fas fa-comments"></i>
      评论区
    </h2>

    <!-- 评论列表 -->
    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-avatar">
          <img :src="comment.avatar || defaultAvatar" :alt="comment.author || '匿名用户'">
        </div>
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-author">{{ comment.isAnonymous ? '匿名用户' : comment.author }}</span>
            <span class="comment-date">{{ formatRelativeTime(comment.date) }}</span>
          </div>
          <div class="comment-text" v-html="renderComment(comment.content)"></div>

          <!-- 评论操作 -->
          <div class="comment-actions">
            <button class="action-btn" @click="replyToComment(comment)">
              <i class="fas fa-reply"></i>
              回复
            </button>
            <button class="action-btn" @click="likeComment(comment)">
              <i class="fas fa-heart" :class="{ 'liked': comment.isLiked }"></i>
              {{ comment.likes }}
            </button>
          </div>

          <!-- 二级评论 -->
          <div v-if="comment.replies && comment.replies.length > 0" class="replies-section">
            <!-- 默认显示第一条回复 -->
            <div class="reply-item" v-show="!comment.showAllReplies">
              <div class="comment-avatar">
                <img :src="comment.replies[0].avatar || defaultAvatar" :alt="comment.replies[0].author || '匿名用户'">
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.replies[0].isAnonymous ? '匿名用户' : comment.replies[0].author }}</span>
                  <span class="comment-date">{{ formatRelativeTime(comment.replies[0].date) }}</span>
                </div>
                <div class="comment-text" v-html="renderComment(comment.replies[0].content)"></div>
                <div class="comment-actions">
                  <button class="action-btn" @click="replyToComment(comment.replies[0])">
                    <i class="fas fa-reply"></i>
                    回复
                  </button>
                  <button class="action-btn" @click="likeComment(comment.replies[0])">
                    <i class="fas fa-heart" :class="{ 'liked': comment.replies[0].isLiked }"></i>
                    {{ comment.replies[0].likes }}
                  </button>
                </div>
              </div>
            </div>

            <!-- 展开后显示所有回复 -->
            <div v-show="comment.showAllReplies"
                 v-for="reply in comment.replies"
                 :key="reply.id"
                 class="reply-item">
              <div class="comment-avatar">
                <img :src="reply.avatar || defaultAvatar" :alt="reply.author || '匿名用户'">
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ reply.isAnonymous ? '匿名用户' : reply.author }}</span>
                  <span class="comment-date">{{ formatRelativeTime(reply.date) }}</span>
                </div>
                <div class="comment-text" v-html="renderComment(reply.content)"></div>
                <div class="comment-actions">
                  <button class="action-btn" @click="replyToComment(reply)">
                    <i class="fas fa-reply"></i>
                    回复
                  </button>
                  <button class="action-btn" @click="likeComment(reply)">
                    <i class="fas fa-heart" :class="{ 'liked': reply.isLiked }"></i>
                    {{ reply.likes }}
                  </button>
                </div>
              </div>
            </div>

            <!-- 展开/收起按钮 -->
            <button
              v-if="comment.replies.length > 1"
              class="toggle-replies-btn"
              @click="toggleReplies(comment)"
            >
              {{ comment.showAllReplies ? '收起回复' : `展开其他 ${comment.replies.length - 1} 条回复` }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 评论输入区域 -->
    <div class="comment-form">
      <div class="form-header">
        <div class="user-info">
          <input
            v-model="newComment.author"
            placeholder="昵称（选填）"
            class="input-field"
          >
          <input
            v-model="newComment.email"
            type="email"
            placeholder="邮箱（选填）"
            class="input-field"
          >
          <div class="anonymous-option">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="newComment.isAnonymous"
                @change="showAnonymousTip"
              >
              匿名发布
            </label>
            <div v-if="showTip" class="tooltip">
              公开不可见，但站长可见
              <button class="close-tip" @click="showTip = false">×</button>
            </div>
          </div>
        </div>
      </div>

      <div class="editor-wrapper">
        <textarea
          v-model="newComment.content"
          placeholder="写下你的评论..."
          rows="4"
          class="comment-textarea"
        ></textarea>

        <div class="editor-toolbar">
          <button
            class="toolbar-btn"
            @click="toggleCodeEditor"
          >
            <i class="fas fa-code"></i>
            插入代码
          </button>
        </div>
      </div>

      <!-- 代码编辑器 -->
      <div v-if="showCodeEditor" class="code-editor">
        <select v-model="codeLanguage" class="language-select">
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <!-- 添加更多语言选项 -->
        </select>
        <textarea
          v-model="codeContent"
          placeholder="在此输入代码..."
          rows="6"
          class="code-textarea"
        ></textarea>
        <div class="code-editor-actions">
          <button class="btn" @click="insertCode">插入</button>
          <button class="btn secondary" @click="showCodeEditor = false">取消</button>
        </div>
      </div>

      <button class="submit-comment-btn" @click="submitComment">
        <i class="fas fa-paper-plane"></i>
        发表评论
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { formatRelativeTime } from '../utils/format'
import { renderComment } from '../utils/highlight'

const defaultAvatar = 'https://secure.gravatar.com/avatar/default?s=80&d=mp'
const showTip = ref(false)
const showCodeEditor = ref(false)
const codeLanguage = ref('javascript')
const codeContent = ref('')

const newComment = reactive({
  author: '',
  email: '',
  content: '',
  isAnonymous: false
})

// 更丰富的评论数据示例
const comments = ref([
  {
    id: 1,
    author: '张三',
    avatar: 'https://secure.gravatar.com/avatar/1?s=80&d=identicon',
    date: '2024-01-20T10:00:00',
    content: '这是一个很棒的文章！代码示例特别有用：\n```javascript\nconst greeting = "Hello World";\nconsole.log(greeting);\n```',
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: 11,
        author: '李四',
        avatar: 'https://secure.gravatar.com/avatar/2?s=80&d=identicon',
        date: '2024-01-20T10:30:00',
        content: '确实很实用，我也学到了很多。',
        likes: 3,
        isLiked: false
      },
      {
        id: 12,
        author: '王五',
        avatar: 'https://secure.gravatar.com/avatar/3?s=80&d=identicon',
        date: '2024-01-20T11:00:00',
        content: '这个代码示例写得太好了！',
        likes: 2,
        isLiked: false
      }
    ],
    showAllReplies: false
  },
  {
    id: 2,
    author: '赵六',
    avatar: 'https://secure.gravatar.com/avatar/4?s=80&d=identicon',
    date: '2024-01-19T15:30:00',
    content: '分享一个 Python 示例：\n```python\ndef hello_world():\n    print("Hello, World!")\n\nhello_world()\n```\n希望对大家有帮助！',
    likes: 8,
    isLiked: false,
    replies: [
      {
        id: 21,
        author: '孙七',
        avatar: 'https://secure.gravatar.com/avatar/5?s=80&d=identicon',
        date: '2024-01-19T16:00:00',
        content: 'Python 真的很简洁！',
        likes: 4,
        isLiked: false
      }
    ],
    showAllReplies: false
  },
  {
    id: 3,
    author: '周八',
    avatar: 'https://secure.gravatar.com/avatar/6?s=80&d=identicon',
    date: '2024-01-18T09:15:00',
    content: '文章写得很详细，对新手特别友好！',
    likes: 12,
    isLiked: false,
    replies: [],
    showAllReplies: false
  }
])

// 显示匿名提示
const showAnonymousTip = () => {
  if (newComment.isAnonymous) {
    showTip.value = true
    setTimeout(() => {
      showTip.value = false
    }, 3000)
  }
}

// 切换代码编辑器
const toggleCodeEditor = () => {
  showCodeEditor.value = !showCodeEditor.value
  if (!showCodeEditor.value) {
    codeContent.value = ''
  }
}

// 插入代码到评论
const insertCode = () => {
  if (!codeContent.value.trim()) return
  
  const codeBlock = [
    '```' + codeLanguage.value,
    codeContent.value.trim(),
    '```'
  ].join('\n')
  
  newComment.content += '\n' + codeBlock + '\n'
  showCodeEditor.value = false
  codeContent.value = ''
}

// 切换回复显示
const toggleReplies = (comment) => {
  comment.showAllReplies = !comment.showAllReplies
}

// 回复评论
const replyToComment = (comment) => {
  // 实现回复逻辑
  console.log('回复评论:', comment)
}

// 点赞评论
const likeComment = (comment) => {
  comment.isLiked = !comment.isLiked
  comment.likes += comment.isLiked ? 1 : -1
}

// 提交评论
const submitComment = () => {
  // 实现提交评论逻辑
  console.log('提交评论:', newComment)
}
</script>

<style scoped>
.comments-section {
  margin-top: var(--spacing-xl);
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
}

/* 评论列表样式 */
.comments-list {
  padding: var(--spacing-lg);
}

.comment-item {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-light);
}

.comment-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

/* 头像样式 */
.comment-avatar {
  flex-shrink: 0;
}

.comment-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: var(--shadow-sm);
  border: 2px solid var(--primary-light);
}

/* 评论内容样式 */
.comment-content {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.comment-author {
  font-weight: 500;
  color: var(--primary-color);
  font-size: 1.1rem;
}

.comment-date {
  color: var(--text-light);
  font-size: 0.9rem;
}

.comment-text {
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
  word-break: break-word;
}

/* 评论操作按钮 */
.comment-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: var(--bg-color);
  color: var(--text-light);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9rem;
}

.action-btn:hover {
  background: var(--primary-color);
  color: white;
}

.action-btn i.liked {
  color: var(--primary-color);
}

/* 回复区域样式 */
.replies-section {
  margin-top: var(--spacing-md);
  margin-left: var(--spacing-xl);
  padding-left: var(--spacing-lg);
  border-left: 2px solid var(--border-light);
}

.reply-item {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  background: var(--bg-color);
  border-radius: var(--border-radius);
}

.reply-item .comment-avatar img {
  width: 40px;
  height: 40px;
}

.toggle-replies-btn {
  margin-top: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.9rem;
}

.toggle-replies-btn:hover {
  text-decoration: underline;
}

/* 评论表单样式 */
.comment-form {
  padding: var(--spacing-lg);
  background: var(--bg-color);
  border-radius: var(--border-radius);
  margin-top: var(--spacing-xl);
}

.form-header {
  margin-bottom: var(--spacing-lg);
}

.user-info {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.input-field {
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--card-bg);
  color: var(--text-color);
  font-size: 0.95rem;
  transition: var(--transition);
}

.input-field:focus {
  border-color: var(--primary-color);
  outline: none;
}

.anonymous-option {
  position: relative;
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.tooltip {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--card-bg);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  font-size: 0.9rem;
  margin-top: var(--spacing-sm);
  white-space: nowrap;
  z-index: 1000;
  border: 1px solid var(--border-light);
}

.close-tip {
  margin-left: var(--spacing-md);
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0 var(--spacing-sm);
}

/* 编辑器样式 */
.editor-wrapper {
  position: relative;
  margin-bottom: var(--spacing-lg);
}

.comment-textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--card-bg);
  color: var(--text-color);
  font-size: 0.95rem;
  resize: vertical;
  min-height: 100px;
  transition: var(--transition);
}

.comment-textarea:focus {
  border-color: var(--primary-color);
  outline: none;
}

.editor-toolbar {
  padding: var(--spacing-sm);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  gap: var(--spacing-sm);
}

.toolbar-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.toolbar-btn:hover {
  background: var(--bg-color);
  color: var(--primary-color);
}

/* 代码编辑器样式 */
.code-editor {
  margin: var(--spacing-md) 0;
  padding: var(--spacing-md);
  background: var(--bg-color);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-light);
}

.language-select {
  width: 100%;
  margin-bottom: var(--spacing-sm);
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--card-bg);
  color: var(--text-color);
  font-size: 0.95rem;
}

.code-textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--code-bg);
  color: var(--code-color);
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 150px;
}

.code-editor-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.95rem;
}

.btn:not(.secondary) {
  background: var(--primary-color);
  color: white;
}

.btn.secondary {
  background: var(--bg-color);
  color: var(--text-color);
}

.btn:hover {
  opacity: 0.9;
}

/* 发布评论按钮样式 */
.submit-comment-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: var(--spacing-md);
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: var(--spacing-lg);
}

.submit-comment-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.submit-comment-btn:active {
  transform: translateY(0);
  box-shadow: none;
}

.submit-comment-btn i {
  font-size: 1.1rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .user-info {
    flex-direction: column;
  }
  
  .input-field {
    width: 100%;
  }
  
  .comment-item {
    gap: var(--spacing-md);
  }
  
  .replies-section {
    margin-left: var(--spacing-md);
    padding-left: var(--spacing-md);
  }
}

/* 添加小屏幕设备的适配 */
@media (max-width: 460px) {
  .comments-section {
    margin-top: var(--spacing-md);
    padding: var(--spacing-sm);
  }

  .section-title {
    font-size: 1.2rem;
    padding: var(--spacing-md);
  }

  .comments-list {
    padding: var(--spacing-sm);
  }

  .comment-item {
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
  }

  .comment-avatar {
    align-self: flex-start;
  }

  .comment-avatar img {
    width: 36px;
    height: 36px;
  }

  .comment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }

  .comment-author {
    font-size: 1rem;
  }

  .comment-date {
    font-size: 0.8rem;
  }

  .comment-actions {
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .action-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.85rem;
  }

  /* 二级评论适配 */
  .replies-section {
    margin-left: 0;
    padding-left: 0;
  }

  .reply-item {
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
  }

  .reply-item .comment-avatar img {
    width: 32px;
    height: 32px;
  }

  /* 评论表单适配 */
  .form-header {
    padding: var(--spacing-sm);
  }

  .editor-wrapper {
    margin-bottom: var(--spacing-md);
  }

  .comment-textarea {
    padding: var(--spacing-sm);
    min-height: 80px;
  }

  .editor-toolbar {
    flex-wrap: wrap;
  }

  .toolbar-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.85rem;
  }

  /* 代码编辑器适配 */
  .code-editor {
    margin: var(--spacing-sm) 0;
    padding: var(--spacing-sm);
  }

  .code-textarea {
    padding: var(--spacing-sm);
    min-height: 120px;
  }

  .code-editor-actions {
    gap: var(--spacing-sm);
  }

  .btn {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: 0.9rem;
  }

  /* 提交按钮适配 */
  .submit-comment-btn {
    padding: var(--spacing-sm);
    font-size: 0.95rem;
  }
}

/* 超小屏幕设备适配 */
@media (max-width: 400px) {
  .comments-section {
    margin-top: var(--spacing-sm);
  }

  .section-title {
    font-size: 1.1rem;
    padding: var(--spacing-sm);
  }

  .comment-text {
    font-size: 0.9rem;
  }

  .comment-actions {
    justify-content: space-between;
  }

  .action-btn {
    flex: 1;
    justify-content: center;
  }

  .toggle-replies-btn {
    width: 100%;
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.85rem;
  }

  .form-header {
    gap: var(--spacing-xs);
  }

  .input-field {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.9rem;
  }

  .anonymous-option {
    font-size: 0.85rem;
  }

  .tooltip {
    font-size: 0.8rem;
    padding: var(--spacing-sm);
  }
}
</style>
