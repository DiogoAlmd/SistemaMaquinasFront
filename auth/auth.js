async function entrar(){
  let user = document.getElementById("usuario").value;
  let password = document.getElementById("senha").value;

  let url = 'http://localhost:11032/api/Users/ObterDados/' + user + '/' + password;
  const userValid = await fetchData(url)

  if (userValid[0].isValid == 1) {
    window.location.href = '../index.html';

    const mathRandom = Math.random().toString(16).substr(2);
    const token = mathRandom + mathRandom;

    localStorage.setItem('token', token);

  } else {
    const userLabel = document.getElementById('userLabel');
    const usuario = document.getElementById('usuario');
    const senhaLabel = document.getElementById('senhaLabel');
    const senha = document.getElementById('senha');
    const msgError = document.getElementById('msgError');

    userLabel.setAttribute('style', 'color: red');
    usuario.setAttribute('style', 'border-color: red');
    senhaLabel.setAttribute('style', 'color: red');
    senha.setAttribute('style', 'border-color: red');
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = 'Usuário ou senha incorretos';
    usuario.focus();
  }
}

let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})