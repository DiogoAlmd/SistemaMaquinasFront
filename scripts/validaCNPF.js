function validaCNPF(inputElement){
    let previousValue = '';
      
      inputElement.addEventListener('input', function(event) {
        const inputValue = event.target.value;
        let formattedValue = '';
        
        if (inputValue.length > 18) {
          event.target.value = previousValue;
          return;
        }
        
        // Remove any non-digits from the input value
        const cleanedValue = inputValue.replace(/\D/g, '');
        
        if (cleanedValue.length <= 11) {
          // Format the input value as a CPF
          formattedValue = cleanedValue.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, function(match, p1, p2, p3, p4) {
            let cpf = '';
            if (p1) cpf += p1;
            if (p2) cpf += `.${p2}`;
            if (p3) cpf += `.${p3}`;
            if (p4) cpf += `-${p4}`;
            return cpf;
          });
        } else {
          // Format the input value as a CNPJ
          formattedValue = cleanedValue.replace(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/, function(match, p1, p2, p3, p4, p5) {
            let cnpj = '';
            if (p1) cnpj += p1;
            if (p2) cnpj += `.${p2}`;
            if (p3) cnpj += `.${p3}`;
            if (p4) cnpj += `/${p4}`;
            if (p5) cnpj += `-${p5}`;
            return cnpj;
          });
        }
        
        previousValue = formattedValue;
        event.target.value = formattedValue;

        return event.target.value;
      });
}