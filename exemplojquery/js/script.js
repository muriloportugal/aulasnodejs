$(document).ready(function(){
    loadTable();
    $('#divListagem').hide();

    $('#btnListar,#btnCadastrar').click(()=>{
        $('#divCadastro,#divListagem').toggle();
    });


    $('form').submit((event)=>{
        //Se utiliza event.currentTarget no lugar de this pq estamos utilizando uma arrow function
        const data = $(event.currentTarget).serializeArray();

        updateDatabase(data,loadTable);
        $('#divListagem,#divCadastro').toggle();
        event.preventDefault();
    });

    $('table').on('click','input[value="X"]',(event)=>{
        if(confirm('Tem certeza que deseja excluir este cliente?')){
            //Se utiliza event.currentTarget no lugar de this pq estamos utilizando uma arrow function
            const input = $(event.currentTarget);
            const id = input.attr('data-id');
            deleteCustomer(id,()=>{
                input.closest('tr').remove();
            });
        }
    });
});

const webApiDomain = 'http://localhost:3000';

function updateDatabase(data,callback){
    const json = {};
    data.forEach(item => json[item['name']]=item['value']);
    $.post(webApiDomain+'/clientes',json,(response)=>{
        alert('Cliente cadastrado com sucesso!');
        callback(data);
    });
}

function loadTable(){
    const tbody = $('table > tbody');
    tbody.empty();
    $.getJSON(webApiDomain+'/clientes',(data)=>{
        data.forEach(item => {
            let linha = '<td>'+item.nome+'</td><td>'+item.idade+'</td><td>'+item.uf+'</td>';
            tbody.append('<tr>'+linha+'<td><input type="button" value="X" data-id="'+item._id+'"/></td></tr>');
        })
    });
}

function deleteCustomer(id,callback){
    $.ajax({
        url:webApiDomain+'/clientes/'+id,
        method:'DELETE',
        success: (result)=>{
            alert('Cliente excluído com sucesso!');
            callback();
        }
    });
}