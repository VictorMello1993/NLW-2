window.onload = () => {
  const html = document.querySelector('html');
  const checkbox = document.getElementById('checkbox');

  if(localStorage.getItem('background') === 'true'){
    html.classList.toggle('dark-mode')
    checkbox.checked = true;
  }

  checkbox.addEventListener('change', () => {
    html.classList.toggle('dark-mode')    
    localStorage.setItem('background', checkbox.checked)
  })
}



