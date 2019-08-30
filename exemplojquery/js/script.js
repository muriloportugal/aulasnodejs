$(document).ready(function(){
    $('#divListagem').hide();

    $('#btnListar,#btnCadastrar').click(()=>{
        $('#divCadastro,#divListagem').toggle();
    });


    $('form').submit((event)=>{
        //Se utiliza event.currentTarget no lugar de this pq estamos utilizando uma arrow function
        const data = $(event.currentTarget).serializeArray();

        let linha = '';
        data.forEach(item => linha +='<td>'+item.value+'</td>');
        if($('table > tbody > tr > td').length ===1) //Se tem apenas uma TD, é a default
            $('table > tbody').empty();
        
            $('table > tbody').append('<tr>'+linha+'<td><input type="button" value="X"/></td></tr>');
            $('#divCadastro,#divListagem').toggle();
            event.preventDefault();
    });

    $('table').on('click','input[value="X"]',(event)=>{
        if(confirm('Tem certeza que deseja excluir este cliente?'))
        //Se utiliza event.currentTarget no lugar de this pq estamos utilizando uma arrow function
            $(event.currentTarget).closest('tr').remove()
    });
});