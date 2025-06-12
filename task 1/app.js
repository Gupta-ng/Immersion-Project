const addBtn = document.getElementById('addBtn');
const progressContainer = document.getElementById('progressContainer');

addBtn.addEventListener('click', () => {
  
  const barBg = document.createElement('div');
  barBg.className = 'progress-bar-bg';

  const barFill = document.createElement('div');
  barFill.className = 'progress-bar-fill';

  barBg.appendChild(barFill);
  progressContainer.appendChild(barBg);

  
  let start = null;
  const duration = 2000; 

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const percent = Math.min(elapsed / duration, 1);
    barFill.style.width = (percent * 100) + '%';

    if (percent < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
});
