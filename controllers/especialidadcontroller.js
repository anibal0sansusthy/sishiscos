var mysql = require('mysql');
//var dateFormat = require('dateformat');

//productos controller

module.exports = {

	//funciones del controlador 
  indexesp : function(req, res, next){
		res.render('indexespecialidad', {title : 'Bienvenido al MODULO-ESPECIALIDAD'});
	}, 

	getEspecialidad : function(req, res, next){
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var especialidad = null;

		db.query('SELECT * FROM especialidad', function(err, rows, fields){
			if(err) throw err;

			especialidad = rows;
			db.end();

			res.render('especialidades/especialidad', {especialidad : especialidad});
		});		
	},

	getNuevaEspecialidad : function(req, res, next){
		res.render('especialidades/nuevoespecialidad');
	},

	postNuevaEspecialidad : function(req, res, next){

		//var fechaactual = new Date();
		//var fecha = dateFormat(fechaactual, 'yyyy-mm-dd h:MM:ss');

		var especialidad = {
			nombre : req.body.nombreespecialidad,
			descripcion : req.body.descripcionespecialidad,
           
		}

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO especialidad SET ?', especialidad, function(err, rows, fields){
			if(err) throw err;

			db.end();
		});

		res.render('especialidades/nuevoespecialidad', {info : 'Especialidad creada correctamente'});
		
	},

	eliminarEspecialidad : function(req, res, next){
		var id_especialidad = req.body.id;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var respuesta = {res: false};

		db.query('DELETE FROM especialidad WHERE id_especialidad = ?', id_especialidad, function(err, rows, fields){
			if(err)throw err;

			db.end();
			respuesta.res = true;

			res.json(respuesta);
		});
	},

	getModificarEspecialidad : function(req, res, next){
		var id_especialidad = req.params.id_especialidad;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var especialidad = null;

		db.query('SELECT * FROM especialidad WHERE id_especialidad = ?', id_especialidad, function(err, rows, fields){
			if(err) throw err;

			especialidad = rows;
			db.end();

			res.render('especialidades/modificarespecialidad', {especialidad: especialidad});
		});
	},

	postModificarEspecialidad : function(req, res, next){

		var especialidad = {
			nombre : req.body.nombreespecialidad,
			descripcion : req.body.descripcionespecialidad,	
    };

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('UPDATE especialidad SET ? WHERE ?', [especialidad, {id_especialidad : req.body.id_especialidad}], function(err, rows, fields){
			if(err) throw err;
			db.end();
		});

		res.redirect('/verespecialidad');

	}
 
}