$(function(){
	$('.form-nuevocargo form ').form({
		nombre : {
			identifier : 'nombrecargo',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese un nombre'
				}
			]
		},

		responsabilidad : {
			identifier : 'responsabilidadcargo',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese la responsabilidad'
				},
				
			]
		},

		
	});
});

