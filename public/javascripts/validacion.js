$(function(){
	$('.form-nuevocargo ').form({
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

$(function(){
	$('.form-nuevoespecialidad form').form({
		nombre : {
			identifier : 'nombreespecialidad',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese un nombre'
				}
			]
		},

		responsabilidad : {
			identifier : 'descripcionespecialidad',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese la descripcion'
				},
				
			]
		},

		
	});
});

$(function(){
	$('.form-iniciosesion form').form({
		usuario : {
			identifier : 'username',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese una cuenta'
				}
			]
		},

		contraseña : {
			identifier : 'password',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese la contraseña'
				},
				
			]
		},

		
	});
});

$(function(){
	$('.form-nuevopersona form').form({
		nombre : {
			identifier : 'nombrepersona',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese un nombre'
				}
			]
		},

		apaterno : {
			identifier : 'apaternopersona',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese la apaterno'
				},
				
			]
		},
    
    amaterno : {
			identifier : 'amaternopersona',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese la amaterno'
				},
				
			]
		},
    
    cipersona : {
			identifier : 'cipersona',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese el ci'
				},
				
			]
		},
		
    fecha_nacpersona : {
			identifier : 'fecha_nacpersona',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese la fecha de nacimiento'
				},
				
			]
		},
    
    matriculapersona : {
			identifier : 'matriculapersona',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese la matricula'
				},
				
			]
		},
	});
});

$(function(){
	$('.form-nuevoempleado form').form({
		dropdownmatricula : {
			identifier : 'dropdownmatricula',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese matricula'
				}
			]
		},

		dropdown : {
			identifier : 'dropdown',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese el cargo'
				},
				
			]
		},
    
    
	});
});

$(function(){
	$('.form-nuevousuario form').form({
		nombreusuario : {
			identifier : 'nombreusuario',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese la cuenta'
				}
			]
		},

		contrasenausuario : {
			identifier : 'contrasenausuario',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese la contraseña'
				},
				
			]
		},
    
    dropdownmatricula : {
			identifier : 'dropdownmatricula',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese la matricula'
				},
				
			]
		},
    
	});
});

$(function(){
	$('.form-nuevomedico form').form({
		dropdownmatricula : {
			identifier : 'dropdownmatricula',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese la matricula'
				}
			]
		},

		dropdownespecialidad : {
			identifier : 'dropdownespecialidad',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese la especialidad'
				},
				
			]
		},
    
    
    
	});
});

$(function(){
	$('.form-nuevoasegurado form').form({
		dropdownmatricula : {
			identifier : 'dropdownmatricula',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese la matricula'
				}
			]
		},

		dropdowngrado : {
			identifier : 'dropdowngrado',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese el grado'
				},
				
			]
		},
    
    dropdownfuerza : {
			identifier : 'dropdownfuerza',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese la fuerza'
				},
				
			]
		},
    
    dropdowntipo : {
			identifier : 'dropdowntipo',
			rules : [
				{
					type: 'empty',
					prompt : 'Por favor ingrese el tipo asegurado'
				},
				
			]
		},
    
	});
});

$(function(){
	$('.form-iniciohistoria form').form({
		medicoMatricula : {
			identifier : 'medicoMatricula',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese la matricula'
				}
			]
		},

		
	});
});

$(function(){
	$('.form-nuevohistoria form').form({
		pesohistoria : {
			identifier : 'pesohistoria',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese el peso'
				}
			]
		},

		tallahistoria : {
			identifier : 'tallahistoria',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese la talla'
				}
			]
		},
    
    temperaturahistoria : {
			identifier : 'temperaturahistoria',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese la temperatura'
				}
			]
		},
    sintomashistoria : {
			identifier : 'sintomashistoria',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese los sintomas'
				}
			]
		},
    
    tratamientohistoria : {
			identifier : 'tratamientohistoria',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese el tratamiento'
				}
			]
		},
    
    precionhistoria : {
			identifier : 'precionhistoria',
			rules : [
				{
					type : 'empty',
					prompt : 'Por favor ingrese la presion arterial'
				}
			]
		},
    
	});
});
