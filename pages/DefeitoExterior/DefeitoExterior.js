if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "../../auth/auth.html";
}

function moveParaArmario2(serial){
    createSituacaoSelectForms();
    createLocalSelectForms();

    let ContinuarEnviarArmario2 = document.getElementById('ContinuarEnviarArmario2');

    ContinuarEnviarArmario2.addEventListener("click", function(){    
      let url = "http://localhost:11032/api/DefeitoExterior/MoverParaArmario2";
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
      const armario3 = await fetchData('http://localhost:11032/api/DefeitoExterior');
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
      const data = await fetchData('http://localhost:11032/api/DefeitoExterior/Modelos');
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