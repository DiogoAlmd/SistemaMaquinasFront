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

function desfazer(id, serial, origem, destino){
  let sim = document.getElementById('sim');
  let nao = document.getElementById('nao');

  // console.log(serial, origem, destino)

  sim.addEventListener('click', function(){
    let request = new XMLHttpRequest();
    url = 'http://localhost:11032/api/Historico/desfazer/'+ id + "/" + serial + "/" + origem + "/" + destino;
    request.open("POST", url);
    console.log(url)
    request.send();
    location.reload();
  });

  nao.addEventListener("click", function(){
    console.log("Desfazer cancelado!");
    location.reload();
  });
}


async function main() {
    try {
      const armario3 = await fetchData('http://localhost:11032/api/Historico');
      $('#tabela').DataTable({
        data: armario3,
        columns: [
          { data: 'id' },
          { data: 'serial' },
          { data: 'origem' },
          { data: 'destino' },
          { data: 'status' },
          { data: 'situacao' },
          { data: 'local' },
          { data: 'operadora' },
          { data: 'dataRetirada' },
          { data: 'maquinaPropriaDoCliente' },
          { data: 'motivo' },
          { data: 'caixa' },
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
          { data: 'cnpf' },
          { data: 'empresa'},
          { data: 'dataAlteracao' },
          {
            data: null,
            render: function(data, type, row) {
              return `
              <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                ...
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modalDesfazer" id="botaoDesfazer" onclick="desfazer('${row.id}','${row.serial}', '${row.origem}', '${row.destino}')">Desfazer</button></li>
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
  
  $(document).ready(function() {
    main();
  });