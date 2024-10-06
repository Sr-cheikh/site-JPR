document.getElementById('emailForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const emailInput = document.getElementById('email');
  const errorMessage = document.getElementById('error-message');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailInput.value)) {
    errorMessage.textContent = 'Por favor, insira um e-mail válido.';
    return;
  }

  // Verificação de e-mail usando um serviço de verificação de e-mail
  fetch(`https://api.emailverifyapi.com/v3/lookups/json?key=df1fb20c-ae43-41f0-9a69-3de323272399&email=${emailInput.value}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'valid') {
        errorMessage.textContent = '';
        alert('E-mail enviado com sucesso!');
        document.getElementById('emailForm').submit();
      } else {
        errorMessage.textContent = 'Por favor, insira um e-mail existente.';
      }
    })
    .catch(error => {
      errorMessage.textContent = 'Erro ao verificar o e-mail. Tente novamente mais tarde.';
    });
});
