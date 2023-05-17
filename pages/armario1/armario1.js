if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "../../auth/auth.html";
}

function alterarCampo(serial) {
  Status = document.getElementById("Status").value;
  Local = document.getElementById("Local").value;
  Operadora = document.getElementById("Operadora").value;
  MaquinaPropriaDoCliente = document.getElementById("MaquinaPropriaDoCliente").value;
  Valor = document.getElementById("Valor");
  ContinuarAlterarCampo = document.getElementById("ContinuarAlterarCampo");

  divInput = document.getElementById("divInput");

  const selectElement = document.getElementById('campos');

    selectElement.addEventListener('change', function() {
    const selectedOption = selectElement.value;
    console.log(`Opção selecionada: ${selectedOption}`);
    
    if (divInput.hasChildNodes()) {
      divInput.removeChild(divInput.childNodes[0]);
    }

    if(selectedOption == Status){
      inputModal = document.createElement("select");
      
      const defaultOption = document.createElement('option');
      defaultOption.setAttribute('selected', 'true');
      defaultOption.setAttribute('hidden', 'true');
      defaultOption.textContent = 'Selecione uma opção...';
      inputModal.add(defaultOption);

      const option1 = document.createElement("option");
      option1.text = 'ATIVAÇÃO';
      option1.value = 'ATIVAÇÃO';
      inputModal.add(option1)

      const option2 = document.createElement("option");
      option2.text = 'TROCA';
      option2.value = 'TROCA';
      inputModal.add(option2);
    }
    else if(selectedOption == Local){
      inputModal = document.createElement("select");
      
      const defaultOption = document.createElement('option');
      defaultOption.setAttribute('selected', 'true');
      defaultOption.setAttribute('hidden', 'true');
      defaultOption.textContent = 'Selecione uma opção...';
      inputModal.add(defaultOption);

      const option1 = document.createElement("option");
      option1.text = 'D3';
      option1.value = 'D3';
      inputModal.add(option1)

      const option2 = document.createElement("option");
      option2.text = 'AB';
      option2.value = 'AB';
      inputModal.add(option2);
    }
    else if(selectedOption == Operadora){
      inputModal = document.createElement("select");
      
      const defaultOption = document.createElement('option');
      defaultOption.setAttribute('selected', 'true');
      defaultOption.setAttribute('hidden', 'true');
      defaultOption.textContent = 'Selecione uma opção...';
      inputModal.add(defaultOption);

      const option1 = document.createElement("option");
      option1.text = 'CLARO';
      option1.value = 'CLARO';
      inputModal.add(option1)

      const option2 = document.createElement("option");
      option2.text = 'VIVO';
      option2.value = 'VIVO';
      inputModal.add(option2);

      const option3 = document.createElement("option");
      option3.text = 'N.A';
      option3.value = 'N.A';
      inputModal.add(option3);
    }
    else if(selectedOption == MaquinaPropriaDoCliente){
      inputModal = document.createElement("select");
      
      const defaultOption = document.createElement('option');
      defaultOption.setAttribute('selected', 'true');
      defaultOption.setAttribute('hidden', 'true');
      defaultOption.textContent = 'Selecione uma opção...';
      inputModal.add(defaultOption);

      const option1 = document.createElement("option");
      option1.text = 'SIM';
      option1.value = 'SIM';
      inputModal.add(option1)

      const option2 = document.createElement("option");
      option2.text = 'NÃO';
      option2.value = 'NÃO';
      inputModal.add(option2);

    }
    divInput.appendChild(inputModal);


    ContinuarAlterarCampo.addEventListener("click", function(){
      const inputElement = document.getElementById('Valor');
      console.log(`Valor digitado: ${inputModal.value}`);
      if(selectedOption == Status){
        var urlBase = "http://localhost:11032/api/Armario1/AlterarCampo/" + serial + "/" + Status + "?valor=" + inputModal.value;
      }
      else if(selectedOption == Local){
        var urlBase = "http://localhost:11032/api/Armario1/AlterarCampo/" + serial + "/" + Local + "?valor=" + inputModal.value;
      }
      else if(selectedOption == Operadora){
        var urlBase = "http://localhost:11032/api/Armario1/AlterarCampo/" + serial + "/" + Operadora + "?valor=" + inputModal.value;
      }
      else if(selectedOption == MaquinaPropriaDoCliente){
        var urlBase = "http://localhost:11032/api/Armario1/AlterarCampo/" + serial + "/" + MaquinaPropriaDoCliente + "?valor=" + inputModal.value;
      }
      else if(selectedOption == Valor){
        var urlBase = "http://localhost:11032/api/Armario1/AlterarCampo/" + serial + "/" + Valor + "?valor=" + inputModal.value;
      }

      fazPost(urlBase);
    });
  });
}

function moveParaDefeito(serial){
  createCaixaSelectForms();
  let sim = document.getElementById('inputSim');
  let nao = document.getElementById('inputNao');
  let selectedOption = document.getElementById('inputMotivo');
  let selectedOptionCaixa = document.getElementById('inputCaixa');
  let motivo = '';
  let caixa = '';

  selectedOption.addEventListener('change',function(){
    motivo = selectedOption.value
  });

  selectedOptionCaixa.addEventListener('change', function(){
    caixa = selectedOptionCaixa.value
  });
  sim.addEventListener('click', function(){
      let url = "http://localhost:11032/api/Armario1/MoverParaDefeito";
      let params = JSON.stringify({
          "serial": serial,
          "caixa": caixa,
          "motivo": motivo
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
  let btnEnviarParaClienteNao = document.getElementById("btnEnviarParaClienteNao");

  btnEnviarParaClienteSim.addEventListener('click', function(){
    let request = new XMLHttpRequest();
    let url = "http://localhost:11032/api/Armario1";
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

function moverParaEE(serial){
  let botaoSim = document.getElementById("botaoSim");
  let selectLocalEstrangeiro = document.getElementById("selectLocalEstrangeiro");

  botaoSim.addEventListener("click", function(){
    let url = "http://localhost:11032/api/Armario1/MoverParaEstoqueEstrangeiro";
      let params = JSON.stringify({
          "serial": serial,
          "local": selectLocalEstrangeiro.value
      });
      fazPostBody(url, params)
  });
}

async function main() {
  try {
    const armario3 = await fetchData('http://localhost:11032/api/Armario1');
    $('#tabela').DataTable({
      data: armario3,
      columns: [
        { data: 'serial' },
        { data: 'modelo' },
        { data: 'status' },
        { data: 'situacao' },
        { data: 'local' },
        { data: 'operadora' },
        { data: 'maquinaPropriaDoCliente' },
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
              <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalEnviarDefeito" onclick="moveParaDefeito('${row.serial}')">Mover Para Defeito</button></li>
              <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalAlterarCampo" id="botaoAlterarCampo" onclick="alterarCampo('${row.serial}')">Alterar Campo</button></li>
              <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalMoverParaEE" id="moverParaEE" onclick="moverParaEE('${row.serial}')">Mover Para Estoque Exterior</button></li>
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
    const data = await fetchData('http://localhost:11032/api/Armario1/Modelos');
    const d3Pro1 = document.getElementById('d3Pro1');
    const d3Pro2 = document.getElementById('d3Pro2');
    const d3ProRefurbished = document.getElementById('d3ProRefurbished');
    const d3Smart = document.getElementById('d3Smart');
    const d3X = document.getElementById('d3X');
    const total = document.getElementById('total');

    d3Pro1.innerHTML = data[0].d3Pro1;
    d3Pro2.innerHTML = data[0].d3Pro2;
    d3ProRefurbished.innerHTML = data[0].d3ProRefurbished;
    d3Smart.innerHTML = data[0].d3Smart;
    d3X.innerHTML = data[0].d3X;
    total.innerHTML = data[0].total;
  } catch (error) {
    console.error(error);
  }
}

$(document).ready(function() {
  modelos();
  main();
});