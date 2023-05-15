if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "../../auth/auth.html";
  }

  function moveParaDefeito(serial){
  let sim = document.getElementById('inputSim');
  let nao = document.getElementById('inputNao');
  let selectedOption = document.getElementById('inputLocalExterior');

  sim.addEventListener('click', function(){
      let url = "http://localhost:11032/api/EstoqueExterior/MoverParaDefeitoExterior";
      let params = JSON.stringify({
          "serial": serial,
          "local": selectedOption.value
      });
      fazPostBody(url, params)
  });

  nao.addEventListener("click", function(){
    console.log("Mover para Armario 1 cancelado!");
    location.reload();
  });
  };

  function moverParaCliente(serial){
    let inputCNPF = document.getElementById("inputCNPF");
    let inputEmpresa = document.getElementById("inputEmpresa");
  
    validaCNPF(inputCNPF);
    let btnEnviarParaClienteSim = document.getElementById("btnEnviarParaClienteSim");
  
    btnEnviarParaClienteSim.addEventListener('click', function(){
      let request = new XMLHttpRequest();
      let url = "http://localhost:11032/api/EstoqueExterior";
      let params = JSON.stringify({
          "serial": serial,
          "cnpf": inputCNPF.value,
          "empresa": inputEmpresa.value
      });
      request.open("POST", url, true);
      request.setRequestHeader("Content-type", "application/json");
      request.onreadystatechange = function() {
          if (request.readyState === 4 && request.status === 200) {
              location.reload();
          }
      };
      request.send(params);
    });
  }

  function moveParaArmario2(serial){
    createSituacaoSelectForms();
    createLocalSelectForms();

    let ContinuarEnviarArmario2 = document.getElementById('ContinuarEnviarArmario2');

    ContinuarEnviarArmario2.addEventListener("click", function(){    
      let url = "http://localhost:11032/api/EstoqueExterior/MoverParaArmario2";
      let params = JSON.stringify({
          "serial": serial,
          "situacao": situacaoSelected,
          "local": localSelected
        });
        fazPostBody(url, params)    
    })
  }
  
  async function main() {
    try {
      const armario3 = await fetchData('http://localhost:11032/api/EstoqueExterior');
      $('#tabela').DataTable({
        data: armario3,
        columns: [
          { data: 'serial' },
          { data: 'modelo' },
          { data: 'local' },
          {
            data: null,
            render: function(data, type, row) {
              return `
              <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                ...
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalEnviarParaCliente" id="botaoMoverParaCliente" onclick="moverParaCliente('${row.serial}')">Mover para Cliente</button></li>
                <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalEnviarDefeito" onclick="moveParaDefeito('${row.serial}')">Mover Para Defeito Exterior</button></li>
                <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalEnviarArmario2" onclick="moveParaArmario2('${row.serial}')">Enviar Para Armario 2</button></li>
              </ul>
            </div>
              `;
            }
          }
        ]
      });
    } 
    catch (error) {
      console.error(error);
    }
  }
  
  async function modelos() {
    try {
      const data = await fetchData('http://localhost:11032/api/EstoqueExterior/Modelos');
      const rioPreto = document.getElementById('rioPreto');
      const campoGrande = document.getElementById('campoGrande');
      const rioDeJaneiro = document.getElementById('RioDeJaneiro');
      const cxPatrick = document.getElementById('cxPatrick');
      const decio = document.getElementById('decio');
      const evento3A = document.getElementById('evento3a');
      const total = document.getElementById('total');
  
      rioPreto.innerHTML = data[0].rioPreto;
      campoGrande.innerHTML = data[0].campoGrande;
      rioDeJaneiro.innerHTML = data[0].rioDeJaneiro;
      cxPatrick.innerHTML = data[0].cxPatrick;
      decio.innerHTML = data[0].decio;
      evento3A.innerHTML = data[0].evento3A;
      total.innerHTML = data[0].total;
    } catch (error) {
      console.error(error);
    }
  }
  
  $(document).ready(function() {
    modelos();
    main();
  });