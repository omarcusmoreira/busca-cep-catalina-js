var submitButton = document.querySelector('form button');
var zipCodeField = document.querySelector('form input');
var content = document.querySelector('main');

submitButton.addEventListener('click', run);



function run(event){
    event.preventDefault();
    var zipCode = zipCodeField.value;
    
    zipCode = zipCode.replace(" ", "");

    axios
    .get("https://viacep.com.br/ws/"+zipCode+"/json")
    .then(function (response) {
        
        if(response.data.erro){
            throw new Error ('CEP Inválido');
        }
        
        content.innerHTML ='';
        renderAdd(response.data.logradouro);
        renderAdd(response.data.bairro);
        renderAdd(response.data.localidade +'/'+ response.data.uf);
    })
    .catch(function(error){
        console.log(error)
        content.innerHTML ='';
        renderAdd("Ops, algo deu errado!")
    })


};

function renderAdd(add){
        
    var address = document.createElement('p');
    var text = document.createTextNode(add);

    address.appendChild(text);
    content.appendChild(address);
    zipCodeField.value = "";
}