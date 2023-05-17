async function main() {
    try {
      const defeitos = await fetchData('http://localhost:11032/api/Devolucao');
      $('#tabela').DataTable({
        data: defeitos,
        columns: [
          { data: 'serial' },
          { data: 'modelo' },
          { data: 'caixa' },
          { data: 'data' }
        ]
      });
    } catch (error) {
        console.error(error);
    }
  }

  async function modelos() {
    try {
      const data = await fetchData('http://localhost:11032/api/Devolucao/Modelos');
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