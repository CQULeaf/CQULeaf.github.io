document.addEventListener('DOMContentLoaded', function() {
    // 动态字符计数器
    document.querySelector('textarea').addEventListener('input', function(e) {
        const counter = e.target.parentElement.querySelector('.char-counter span');
        counter.textContent = e.target.value.length;
    });
  
  // 表单提交动画
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        const btn = this.querySelector('.submit-btn');
        btn.style.width = btn.offsetWidth + 'px';
        btn.querySelector('.btn-text').style.opacity = '0';
        btn.querySelector('.loading-dots').style.display = 'flex';
    });

    // 使用Jekyll的Liquid变量语法：
    const successMessage = "{{ site.data.messages.form_success }}";
  });