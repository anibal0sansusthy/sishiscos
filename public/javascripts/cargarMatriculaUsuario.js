$(function(){
  
  var datosCargados = null;
   		$.ajax({
				url : 'http://localhost:3000/cargarMatriculaUsuario',
				method : 'get',
			
				success : function(res){
					if(res){
            console.log(res);
            var options = $("#matriculaid");
            var index = 0;
            options.append($("<option />").val('').text('Seleccione matricula'));
            $.each(res, function() {
               options.append($("<option />").val(res[index].matricula).text(res[index].matricula));
               index++;
            });
        }},
        error : function(err) {
          conole.log('error');        
        }				
			});
	});