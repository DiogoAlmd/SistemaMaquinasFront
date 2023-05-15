if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "../../auth/auth.html";
}

function moveParaArmario2(serial){
    createSituacaoSelectForms();
    createLocalSelectForms();

    let ContinuarEnviarArmario2 = document.getElementById('ContinuarEnviarArmario2');

    ContinuarEnviarArmario2.addEventListener("click", function(){
      let url = "http://localhost:11032/api/MaquinasNosClientes/MoverParaArmario2";
      let params = JSON.stringify({
          "serial": serial,
          "situacao": situacaoSelected,
          "local": localSelected
        });
        fazPostBody(url, params)    
    })
  }

  function moveParaDefeito(serial){
    let sim = document.getElementById('inputSim');
    let nao = document.getElementById('inputNao');
    let selectedOption = document.getElementById('inputLocalExterior');
  
    sim.addEventListener('click', function(){
        let url = "http://localhost:11032/api/MaquinasNosClientes/MoverParaDefeitoExterior";
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

  async function main() {
    try {
      const armario3 = await fetchData('http://localhost:11032/api/MaquinasNosClientes');
      $('#tabela').DataTable({
        data: armario3,
        columns: [
          { data: 'serial' },
          { data: 'modelo' },
          { data: 'cnpf' },
          { data: 'empresa' },
          { 
            data: 'data',
            render: function (data, type, row) {
                if (data && !isNaN(Date.parse(data))) {
                    var date = new Date(data);
                    return date.getFullYear() + '/' +
                           ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
                           ('0' + date.getDate()).slice(-2) + ' ' +
                           ('0' + date.getHours()).slice(-2) + ':' +
                           ('0' + date.getMinutes()).slice(-2) + ':' +
                           ('0' + date.getSeconds()).slice(-2);
                } else {
                    return '';
                }
            }
          },
          {
            data: null,
            render: function(data, type, row) {
              return `
              <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                ...
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalEnviarArmario2" id="botaoMoverArmario2" onclick="moveParaArmario2('${row.serial}')">Mover Para Armário 2</button></li>
                <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalEnviarDefeito" onclick="moveParaDefeito('${row.serial}')">Mover Para Defeito Exterior</button></li>
                </ul>
            </div>
              `;
            }
          }
        ]
      });
    } catch (error) {
        console.error(error);
    }
  }

  async function modelos() {
    const button = document.getElementById("botaoData");
    let url;
    
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao obter os dados da API');
      }
      return await response.json();
    };
  
    const getDataRange = () => {
      const dataAtual = new Date();
      const ultimoDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);
      const dataFinalPadrao = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), ultimoDiaDoMes.getDate());
      const dataInicialPadrao = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), '01');
      const dataInicialFormatada = dataInicialPadrao.toISOString().slice(0, 10);
      const dataFinalFormatada = dataFinalPadrao.toISOString().slice(0, 10);
      return {
        dataInicial: dataInicialFormatada,
        dataFinal: dataFinalFormatada
      }
    }
  
    const handleButtonClick = async () => {
      const dataInicial = document.getElementById("dataInicial").value;
      const dataFinal = document.getElementById("dataFinal").value;
  
      if (!dataInicial || !dataFinal) {
        const dataRange = getDataRange();
        url = `http://localhost:11032/api/MaquinasNosClientes/Modelos/${dataRange.dataInicial}/${dataRange.dataFinal}`;
      } else {
        
        const dataInicialPadrao = new Date(
          parseInt(dataInicial.split('/')[2]),
          parseInt(dataInicial.split('/')[1]) - 1,
          parseInt(dataInicial.split('/')[0])
        );
  
        const dataFinalPadrao = new Date(
          parseInt(dataFinal.split('/')[2]),
          parseInt(dataFinal.split('/')[1]) - 1,
          parseInt(dataFinal.split('/')[0])
        );
  
        if (dataFinalPadrao < dataInicialPadrao) {
          alert('A data final deve ser maior ou igual à data inicial.');
          return;
        }
  
        url = `http://localhost:11032/api/MaquinasNosClientes/Modelos/${dataInicial}/${dataFinal}`;
      }
  
      try {
        const data = await fetchData(url);
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
    };
  
    button.addEventListener("click", handleButtonClick);
  
    // Carrega os dados iniciais
    handleButtonClick();
  }

  async function modeloTotal() {
    try {
      const data = await fetchData('http://localhost:11032/api/MaquinasNosClientes/ModeloTotal');
      const d3Pro1 = document.getElementById('d3Pro1Total');
      const d3Pro2 = document.getElementById('d3Pro2Total');
      const d3ProRefurbished = document.getElementById('d3ProRefurbishedTotal');
      const d3Smart = document.getElementById('d3SmartTotal');
      const d3X = document.getElementById('d3XTotal');
      const total = document.getElementById('totalTotal');
  
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
    modeloTotal();
    main();
  });