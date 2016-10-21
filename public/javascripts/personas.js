$(function(){


	//funcion ajax eliminar producto
	$('#tbl-personas #btn-eliminar').click(function(){				
    //e.preventDefault();
		var elemento = $(this);	
		var id = elemento.parent().parent().find('#id').text();
    //alert(id);
		var confirmar = confirm('Desea eliminar a la persona');
    //alert(id_cargo);

		if(confirmar){
			$.ajax({
				url : 'http://localhost:3000/eliminarpersona',
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