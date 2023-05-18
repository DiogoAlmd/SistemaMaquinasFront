if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "../../auth/auth.html";
}

function fetchData(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Failed to fetch data: ${xhr.statusText}`));
        }
      };
      xhr.onerror = () => reject(new Error('Failed to fetch data'));
      xhr.send();
    });
  }

  function alterarMotivo(serial){
    let botaoSim = document.getElementById("botaoSimMotivo");
    let selectNovoMotivo = document.getElementById("selectCaixaDevolucao");

    selectNovoMotivo.addEventListener("change", function(){
      botaoSim.addEventListener("click", function(){
        let url = "http://localhost:11032/api/Defeitos/AlterarMotivo";
        let params = JSON.stringify({
            "serial": serial,
            "novoMotivo": selectNovoMotivo.value
        });

        fazPut(url, params)
      });
    });
  };

  function moverParaDevolucao(serial){
    let botaoSim = document.getElementById("botaoSimDevolucao");
    let selectCaixa = document.getElementById("selectCaixa");

    selectCaixa.addEventListener("change", function(){
      botaoSim.addEventListener("click", function(){
        let url = "http://localhost:11032/api/Defeitos/MoverParaDevolucao";
        let params = JSON.stringify({
            "serial": serial,
            "caixa": selectCaixa.value
        });
        fazPostBody(url, params)
      });
    });
  }

  async function main() {
    try {
      const defeitos = await fetchData('http://localhost:11032/api/Defeitos');
      $('#tabela').DataTable({
        data: defeitos,
        columns: [
          { data: 'serial' },
          { data: 'modelo' },
          { data: 'caixa' },
          { data: 'motivo'},
          { 
            data: 'data',
            render: function (data, type, row) {
                if (data && !isNaN(Date.parse(data))) {
                    var date = new Date(data);
                    return date.getFullYear() + '/' +
                           ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
                           ('0' + date.getDate()).slice(-2);
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
                  <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalAlterarMotivo" id="alterarMotivo" onclick="alterarMotivo('${row.serial}')">Alterar Motivo</button></li>
                  <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalMoverParaDevolucao" id="moverParaDevolucao" onclick="moverParaDevolucao('${row.serial}')">Mover Para Devolução</button></li>
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

  async function motivosNum(){
    try{
      const data = await fetchData('http://localhost:11032/api/Defeitos/Motivos');
      const pedTamperedNum = document.getElementById('pedTamperedNum');
      const erroNaLeituraDoCartaoNum = document.getElementById('erroNaLeituraDoCartaoNum');
      const touchNum = document.getElementById('touchNum');
      const conectorComDefeitoNum = document.getElementById('conectorComDefeitoNum');
      const conectividadeDeChipsNum = document.getElementById('conectividadeDeChipsNum');
      const esteticaNum = document.getElementById('esteticaNum');
      const defeitoDeImpressaoNum = document.getElementById('defeitoDeImpressaoNum');
      const tecladoValue = document.getElementById('tecladoValue');
      const telaQuebradaValue = document.getElementById('telaQuebradaValue');
      const total = document.getElementById('total');

      pedTamperedNum.innerHTML = data[0].pedTampered;
      erroNaLeituraDoCartaoNum.innerHTML = data[0].erroNaLeituraDoCartao;
      touchNum.innerHTML = data[0].touch;
      conectorComDefeitoNum.innerHTML = data[0].conectorComDefeito;
      conectividadeDeChipsNum.innerHTML = data[0].conectividadeDeChips;
      esteticaNum.innerHTML = data[0].estetica;
      defeitoDeImpressaoNum.innerHTML = data[0].defeitoDeImpressao;
      tecladoValue.innerHTML = data[0].teclado;
      telaQuebradaValue.innerHTML = data[0].telaQuebrada;
      total.innerHTML = data[0].total;
      console.log(teclado);
    }catch(error){
      console.log(error);
    }
  }

  $(document).ready(function() {
    motivosNum();
    main();
  });