var mysql = require('mysql');
var dateFormat = require('dateformat');
//var dateFormat = require('dateformat');

//productos controller

module.exports = {

	//funciones del controlador 
  indexper : function(req, res, next){
		res.render('indexpersona', {title : 'Bienvenido al MODULO-PERSONA'});
	}, 

	getPersonas : function(req, res, next){
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var personas = null;

		db.query('SELECT * FROM persona', function(err, rows, fields){
			if(err) throw err;

			personas = rows;
			db.end();

			res.render('personas/personas', {personas : personas});
		});		
	},

	getNuevaPersona : function(req, res, next){
		res.render('personas/nuevopersona');
	},

	postNuevaPersona : function(req, res, next){

		//var fechaactual = new Date();
		//var fecha = dateFormat(fechaactual, 'yyyy-mm-dd h:MM:ss');

		var cargo = {
			nombre : req.body.nombrepersona,
			apaterno : req.body.apaternopersona,
      amaterno : req.body.amaternopersona,
      ci : req.body.cipersona,
      fecha_nac : req.body.fecha_nacpersona,
      matricula : req.body.matriculapersona, 
      
		}

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO persona SET ?', cargo, function(err, rows, fields){
			if(err) throw err;

			db.end();
		});

		res.render('personas/nuevopersona', {info : 'Persona creado correctamente'});
		
	},

	eliminarPersona : function(req, res, next){
		var id_persona = req.body.id;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var respuesta = {res: false};

		db.query('DELETE FROM persona WHERE id_persona = ?', id_persona, function(err, rows, fields){
			if(err)throw err;

			db.end();
			respuesta.res = true;

			res.json(respuesta);
		});
	},

	getModificarPersona : function(req, res, next){
		var id_persona = req.params.id_persona;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var persona = null;

		db.query('SELECT * FROM persona WHERE id_persona = ?', id_persona, function(err, rows, fields){
			if(err) throw err;

			persona = rows;
			db.end();

			res.render('personas/modificarpersona', {persona: persona});
		});
	},

	postModificarPersona : function(req, res, next){

		var persona = {
			nombre : req.body.nombrepersona,
			apaterno : req.body.apaternopersona,		
      amaterno : req.body.amaternopersona,
			ci : req.body.cipersona	,
      fecha_nac : req.body.fecha_nacpersona,
			matricula : req.body.matriculapersona		
    };

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('UPDATE persona SET ? WHERE ?', [persona, {id_persona : req.body.id_persona}], function(err, rows, fields){
			if(err) throw err;
			db.end();
		});

		res.redirect('/verpersona');

	}
 
}