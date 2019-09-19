function alertar(mensagem){
    $('.alert-success').html('<strong>Sucesso! </strong>'+mensagem);
    $('.alert-success').show(1000,()=>{
        setTimeout(() => {
            $('.alert-success').hide(1000)
        }, 2000);
    });
}

if(location.href.indexOf('delete=true')!=-1){
    alertar('Cliente excluído com sucesso!');
}else if(location.href.indexOf('edit=true')!=-1){
    alertar('Cliente editado com sucesso!');
}else if(location.href.indexOf('new=true')!=-1){
    alertar('Cliente cadastrado com sucesso!');
}else{
    $('.alert-success').hide();
}
