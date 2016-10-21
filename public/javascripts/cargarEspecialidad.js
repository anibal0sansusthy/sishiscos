$(function(){
  
  var datosCargados = null;
   		$.ajax({
				url : 'http://localhost:3000/cargarEspecialidad',
				method : 'get',
			
				success : function(res){
					if(res){
            console.log(res);
            var options = $("#especialidadId");
            var index = 0;
            options.append($("<option />").val('').text('Seleccione especialidadId'));
            $.each(res, function() {
               options.append($("<option />").val(res[index].nombre).text(res[index].nombre));
               index++;
            });
        }},
        error : function(err) {
          conole.log('error');        
        }				
			});
	});