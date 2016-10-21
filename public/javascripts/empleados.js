$(function(){


	//funcion ajax eliminar producto
	$('#tbl-empleados #btn-eliminar').click(function(){				
    //e.preventDefault();
		var elemento = $(this);	
		var id = elemento.parent().parent().find('#id').text();
    //alert(id);
		var confirmar = confirm('Desea eliminar al empleado');
    //alert(id_cargo);

		if(confirmar){
			$.ajax({
				url : 'http://localhost:3000/eliminarempleado',
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