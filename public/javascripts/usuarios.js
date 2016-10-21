$(function(){


	//funcion ajax eliminar producto
	$('#tbl-usuarios #btn-eliminar').click(function(){				
    //e.preventDefault();
		var elemento = $(this);	
		var id = elemento.parent().parent().find('#id').text();
    //alert(id);
		var confirmar = confirm('Desea eliminar al usuario');
    //alert(id_cargo);

		if(confirmar){
			$.ajax({
				url : 'http://localhost:3000/eliminarusuario',
				method : 'post',
				data : {id : id},
				success : function(res){
					if(res.res){
						elemento.parent().parent().remove();
					}
				}
			});
		}		
		
	});


});