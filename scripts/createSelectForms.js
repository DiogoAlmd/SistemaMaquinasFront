function createModeloSelectForms(){
    modeloSelected = '';

    dx = document.getElementById('DX');
    pro1amarela = document.getElementById('PRO_1_AMARELA');
    pro1preta = document.getElementById('PRO_1_PRETA');
    pro2 = document.getElementById('PRO_2');
    profit = document.getElementById('PROFIT');

    const selectedOptionModelo = document.getElementById('InputModelo');

    selectedOptionModelo.addEventListener("change", function(){
        if(selectedOptionModelo.value == dx.value){
            modeloSelected = dx.value;
          }
          else if(selectedOptionModelo.value == pro1amarela.value){
            modeloSelected = pro1amarela.value;
          }
          else if(selectedOptionModelo.value == pro1preta.value){
            modeloSelected = pro1preta.value;
          }
          else if(selectedOptionModelo.value == pro2.value){
            modeloSelected = pro2.value;
          }
          else if(selectedOptionModelo.value == profit.value){
            modeloSelected = profit.value;
          }

          return modeloSelected;
    });
}

function createSituacaoSelectForms(){
    let RealizarTestes = document.getElementById('RealizarTestes').value;
    let LimparEAdesivar = document.getElementById('LimparEAdesivar').value;
    const selectedOption = document.getElementById('situacao');
    situacaoSelected = ''

    selectedOption.addEventListener("click", function(){
        if(selectedOption.value == RealizarTestes){
            situacaoSelected = RealizarTestes
        }
        else if(selectedOption.value == LimparEAdesivar){
            situacaoSelected = LimparEAdesivar
        }
      })
      return situacaoSelected;
}

function createLocalSelectForms(){
    let d3 = document.getElementById("D3").value;
    let ab = document.getElementById("AB").value;
    const selectedOption = document.getElementById('InputLocal');
    localSelected = '';

    selectedOption.addEventListener("click", function(){
        if(selectedOption.value == d3){
            localSelected = d3;
        }
        else if(selectedOption.value == ab){
            localSelected = ab;
        }
      })
      return localSelected;

}

function createOperadoraSelectForms(){
    let claro = document.getElementById("claro").value;
    let vivo = document.getElementById("vivo").value;
    let na = document.getElementById("na").value;
    const selectedOption = document.getElementById('InputOperadora');
    operadoraSelected = '';

    selectedOption.addEventListener("click", function(){
        if(selectedOption.value == claro){
            operadoraSelected = claro;
        }
        else if(selectedOption.value == vivo){
            operadoraSelected = vivo;
        }
        else if(selectedOption.value == na){
            operadoraSelected = na;
        }
      })
    return operadoraSelected;
}

function createArmarioSelectForms(){
    let arm1 = document.getElementById("arm1").value;
    let arm2 = document.getElementById("arm2").value;
    let arm3 = document.getElementById("arm3").value;
    const selectedOption = document.getElementById('InputArmario');
    armarioSelected = '';

    selectedOption.addEventListener("click", function(){
        if(selectedOption.value == arm1){
            armarioSelected = arm1;
        }
        else if(selectedOption.value == arm2){
            armarioSelected = arm2;
        }
        else if(selectedOption.value == arm3){
            armarioSelected = arm3;
        }
      })
    return armarioSelected;

}

function createStatusSelectForms(){
    let ativa = document.getElementById("ativa").value;
    let inativa = document.getElementById("inativa").value;
    const selectedOption = document.getElementById('inputStatus');
    statusSelected = '';

    selectedOption.addEventListener("click", function(){
        if(selectedOption.value == ativa){
            statusSelected = ativa;
        }
        else if(selectedOption.value == inativa){
            statusSelected = inativa;
        }
      })
      return statusSelected;
}

function createCaixaSelectForms(){
    let cx1 = document.getElementById("cx1").value;
    let cx2 = document.getElementById("cx2").value;
    let cx3 = document.getElementById("cx3").value;
    const selectedOption = document.getElementById('inputCaixa');
    caixaSelected = '';

    selectedOption.addEventListener("click", function(){
        if(selectedOption.value == cx1){
            caixaSelected = cx1;
        }
        else if(selectedOption.value == cx2){
            caixaSelected = cx2;
        }
        else if(selectedOption.value == cx3){
            caixaSelected = cx3;
        }
      })
    return caixaSelected;
}