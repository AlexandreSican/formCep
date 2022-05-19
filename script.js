//Variável fica para facilitar o acesso ao DOM
const c = (el) => document.querySelector(el);

//Função para limpar a parte do fomulário referente ao cep
function limpa_formulário_cep() {
    
    c('#inputStreet').value("");
    c('#inputSector').value("");
    c('#inputCity').value("");
    c('#inputState').value("");
       
}

//Callback que a api solicitar para realizar o retorno da requisição
function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    c('#inputStreet').value = (conteudo.logradouro);
    c('#inputSector').value=(conteudo.bairro);
    c('#inputCity').value=(conteudo.localidade);
    c('#inputState').value=(conteudo.uf);
    
    
} 
else {
    //Caso o cep não for encontrado o usuário será notificado
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

//Função para enviar a requisição a API viacep
function pesquisacep(valor) {


var cep = valor.replace(/\D/g, '');

//Verifica se o campo cep está preenchido
if (cep != "") {

   //Regular expression do cep somento com dígitos
    var validacep = /^[0-9]{8}$/;

    //Verificação do formato do cep
    if(validacep.test(cep)) {

        //Preenche os campos com '...' enquanto a requisição é feita
        c('#inputStreet').value = "...";
        c('#inputSector').value="...";
        c('#inputCity').value="...";
        c('#inputState').value="...";
        
       

        //Cria um elemento js
        var script = document.createElement('script');

        //Sincroniza o callback da requisição
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Carrega o conteúdo depois de inserir o script no documento
        document.body.appendChild(script);

    }
    else {
        //Alerta o usuário que o cep está inválido
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} 
else {
    //Limpa o formulário na parte referente ao cep
    limpa_formulário_cep();
}
};


//Evento que observa a mudança no combobox do CEP
c('.inputOption').addEventListener("change", function(){
    
    //Caso a pessoa não souber o CEP, isso irá habilitar que ela digite o próprio endereço e desabilitar o campo do CEP
    if(this.value === 'n'){

        c('#inputCep').setAttribute('disabled', 'disabled');
        c('#inputStreet').removeAttribute('disabled');
        c('#inputSector').removeAttribute('disabled');
        c('#inputCity').removeAttribute('disabled');
        c('#inputState').removeAttribute('disabled');
    }else{//Caso a pessoa souber o CEP, isso irá habilitar que ela digite o CEP e desabilitar os outros campos
        c('#inputCep').removeAttribute('disabled');
        c('#inputStreet').setAttribute('disabled', 'disabled');
        c('#inputSector').setAttribute('disabled', 'disabled');
        c('#inputCity').setAttribute('disabled', 'disabled');
        c('#inputState').setAttribute('disabled', 'disabled');
    }
});


//Evento que monitora o click no botão Enviar
c('.formButton button').addEventListener('click', (event)=>{
    event.preventDefault();

    //Declaração de variáveis para facilitar o acesso a elas
    let vName = c('#inputName').value;
    let vEmail = c('#inputEmail').value;
    let vStreet = c('#inputStreet').value;
    let vSector = c('#inputSector').value;
    let vCity = c('#inputCity').value;
    let vState = c('#inputState').value;
    let vNumber = c('#inputNumber').value;
    let vComplement = c('#inputComplement').value;

    //Verifica se todas informações foram preencidas
    if(
        vName !== '' &&
        vEmail !== '' &&
        vStreet !== '' &&
        vCity !== '' &&
        vState !== '' &&
        vSector !== '' 
        
        
    ){
       //Caso todas informações forem preencidas, cria um json com as mesmas
        let jsonForm = {
            name: vName,
            email: vEmail,
            adress: {
                street: vStreet,
                sector: vSector,
                city: vCity,
                state: vState,
                number: vNumber,
                complement: vComplement
            }

        }

        
        //Print no console o json
        console.log(jsonForm);

        limpa_formulário_todo();

    }else{ //Caso contrário o usuário será avisado que há algum campo sem valor
        c('.errorWarning').style.display = 'block';
        c('.errorWarning').innerHTML = `Preencha todos os campos`;
        
        //Apenas um timeOut para o aviso sumir
        setTimeout(()=>{
            c('.errorWarning').style.display = 'none';
        }, 2000)
    }
});

function limpa_formulário_todo() {
    
    c('#inputName').value = '';
    c('#inputEmail').value = '';
    c('#inputCep').value = '';
    c('#inputStreet').value = '';
    c('#inputSector').value = '';
    c('#inputCity').value = '';
    c('#inputState').value = '';
    c('#inputNumber').value = '';
    c('#inputComplement').value = '';
       
}

