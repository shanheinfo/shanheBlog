import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import cpp from 'highlight.js/lib/languages/cpp'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import sql from 'highlight.js/lib/languages/sql'
import bash from 'highlight.js/lib/languages/bash'
import markdown from 'highlight.js/lib/languages/markdown'

// 注册需要的语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('java', java)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('markdown', markdown)

// 代码高亮函数
export function highlightCode(code, language) {
  if (language && hljs.getLanguage(language)) {
    try {
      return hljs.highlight(code, { language }).value
    } catch (err) {
      console.error('Highlight error:', err)
    }
  }

  try {
    return hljs.highlightAuto(code).value
  } catch (err) {
    console.error('Highlight error:', err)
    return code
  }
}

// 渲染评论内容（包含代码块）
export function renderComment(content) {
  // 使用正则表达式匹配代码块
  return content.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, lang, code) => {
    const highlighted = highlightCode(code.trim(), lang)
    return `<pre><code class="hljs ${lang || ''}">${highlighted}</code></pre>`
  })
}

export default hljs 