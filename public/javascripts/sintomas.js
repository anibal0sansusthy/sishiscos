$(function(){


	//funcion ajax eliminar producto
	$('#sintomasBoton').click(function(){				
    var idSeleccionado;
    var sintomasIngresados = $('#sintomashistoriaId').val();
		
			$.ajax({
				url : 'http://localhost:3000/clasificador',
				method : 'post',
				data : {sintomashistoria : sintomasIngresados},
				success : function(res){
            
            var enfermedades = $("#enfermedadesId");
            var diagnostico= $("#diagnosticohistoriaId");
            var index = 0;
            enfermedades.empty();
             enfermedades.append($("<option />").val('').text('Seleccione enfermedad'));
            $.each(res.enfermedades, function() {
               enfermedades.append($("<option />").val(res.enfermedades[index].id_enfermedad).text(res.enfermedades[index].nombreenfermedad));
               index++;
            });
            
           /* var enfermedadSeleccionado;
            var idSeleccionado;
            
            $('#enfermedadesId').change(function() {
              enfermedadSeleccionado = $('#enfermedadesId').find(":selected").text();  
              for (var i = 0; i < res.enfermedades.length ; i++) {
              if (res.enfermedades[i].nombreenfermedad === enfermedadSeleccionado) {
                  idSeleccionado = res.enfermedades[i].id_enfermedad;
              }
              console.log('id', idSeleccionado);
            }
            });*/
				}
			});	
	
  
  $.ajax({
				url : 'http://localhost:3000/registro',
				method : 'post',
				data : {idSeleccionado : idSeleccionado},
				success : function(res){
            
            var enfermedades = $("#enfermedadesId");
            var index = 0;
            enfermedades.empty();
             enfermedades.append($("<option />").val('').text('Seleccione enfermedad'));
            $.each(res.enfermedades, function() {
               enfermedades.append($("<option />").val(res.enfermedades[index].id_enfermedad).text(res.enfermedades[index].nombreenfermedad));
               index++;
            });
            
            /*var enfermedadSeleccionado;
            var idSeleccionado;
            
            $('#enfermedadesId').change(function() {
              enfermedadSeleccionado = $('#enfermedadesId').find(":selected").text();  
              for (var i = 0; i < res.enfermedades.length ; i++) {
              if (res.enfermedades[i].nombreenfermedad === enfermedadSeleccionado) {
                  idSeleccionado = res.enfermedades[i].id_enfermedad;
              }
              console.log('id', idSeleccionado);
            }
            });*/
				}
			});	

      
	});
});