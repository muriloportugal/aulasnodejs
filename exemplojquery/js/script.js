$(document).ready(function(){
    loadTable();
    $('#divListagem').hide();

    $('#btnListar,#btnCadastrar').click(()=>{
        $('#divCadastro,#divListagem').toggle();
    });


    $('form').submit((event)=>{
        event.preventDefault(); 
        //Verifica se os campos nome e idade estão preenchidos.
        if($('input[name="nome"]').val() === ''||
        $('input[name="idade"]').val() === ''){
            $('.alert-danger').show(1000,()=>{
                setTimeout(() => {
                    $('.alert-danger').hide(1000);
                }, 2000);
            });
            return;
        }

        //Se utiliza event.currentTarget no lugar de this pq estamos utilizando uma arrow function
        const data = $(event.currentTarget).serializeArray();

        updateDatabase(data,loadTable);
        $('#divListagem,#divCadastro').toggle();
        
    });

    $('table').on('click','a[class="btn btn-xs btn-danger"]',(event)=>{
        if(confirm('Tem certeza que deseja excluir este cliente?')){
            //Se utiliza event.currentTarget no lugar de this pq estamos utilizando uma arrow function
            const input = $(event.currentTarget);
            const id = input.attr('data-id');
            deleteCustomer(id,()=>{
                input.closest('tr').remove();
            });
        }
        return false;
    });

    $('#divListagem,.alert').hide();
});

const webApiDomain = 'http://localhost:3000';

function updateDatabase(data,callback){
    const json = {};
    data.forEach(item => json[item['name']]=item['value']);
    $.post(webApiDomain+'/clientes',json,(response)=>{
        $('.alert-success').html('<strong>Sucesso!</strong> Cliente cadastrado com sucesso!');
        $('.alert-success').show(1000,()=>{
            setTimeout(()=>{
                $('.alert-success').hide(1000);
            },2000);
        });
        callback(data);
    });
}

function loadTable(){
    const tbody = $('table > tbody');
    tbody.empty();
    $.getJSON(webApiDomain+'/clientes',(data)=>{
        data.forEach(item => {
            let linha = '<td>'+item.nome+'</td><td>'+item.idade+'</td><td>'+item.uf+'</td>';
            tbody.append('<tr>'+linha+'<td><a href="#" class="btn btn-xs btn-danger" data-id="'+item._id+'"> <span class="glyphicon glyphicon-remove"></span></a></td></tr>');
        })
    });
}

function deleteCustomer(id,callback){
    $.ajax({
        url:webApiDomain+'/clientes/'+id,
        method:'DELETE',
        success: (result)=>{
            $('.alert-success').html('<strong>Sucesso!</strong> Cliente removido com sucesso!');
            $('.alert-success').show(1000,()=>{
                setTimeout(() => {
                    $('.alert-success').hide(1000);
                }, 2000);
            });
            callback();
        }
    });
}