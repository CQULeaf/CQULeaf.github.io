document.querySelectorAll('[data-copy-text]').forEach(function(button) {
  button.addEventListener('click', async function() {
    const status = button.parentElement.querySelector('[role="status"]');
    try {
      await navigator.clipboard.writeText(button.dataset.copyText);
      status.textContent = button.dataset.copySuccess;
    } catch (error) {
      status.textContent = button.dataset.copyError;
    }
  });
});
