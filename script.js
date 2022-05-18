const c = (el) => document.querySelector(el);

function limpa_formulário_cep() {
    
    c('#inputStreet').value("");
    c('#inputSector').value("");
    c('#inputCity').value("");
    c('#inputState').value("");
       
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    
    c('#inputStreet').value = (conteudo.logradouro);
    c('#inputSector').value=(conteudo.bairro);
    c('#inputCity').value=(conteudo.localidade);
    c('#inputState').value=(conteudo.uf);
    
    
} 
else {
    
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {


var cep = valor.replace(/\D/g, '');


if (cep != "") {

   
    var validacep = /^[0-9]{8}$/;

    if(validacep.test(cep)) {

        c('#inputStreet').value = "...";
        c('#inputSector').value="...";
        c('#inputCity').value="...";
        c('#inputState').value="...";
        
       

        
        var script = document.createElement('script');

        
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

       
        document.body.appendChild(script);

    }
    else {
        
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} 
else {
    
    limpa_formulário_cep();
}
};
