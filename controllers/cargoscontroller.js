var mysql = require('mysql');
//var dateFormat = require('dateformat');

//productos controller

module.exports = {

	//funciones del controlador 
  indexcar : function(req, res, next){
		res.render('indexcargo', {title : 'Bienvenido al MODULO-CARGO'});
	}, 

	getCargos : function(req, res, next){
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var cargos = null;

		db.query('SELECT * FROM cargo', function(err, rows, fields){
			if(err) throw err;

			cargos = rows;
			db.end();

			res.render('cargos/cargos', {cargos : cargos});
		});		
	},

	getNuevoCargo : function(req, res, next){
		res.render('cargos/nuevocargo');
	},

	postNuevoCargo : function(req, res, next){

		//var fechaactual = new Date();
		//var fecha = dateFormat(fechaactual, 'yyyy-mm-dd h:MM:ss');

		var cargo = {
			nombre : req.body.nombrecargo,
			responsabilidad : req.body.responsabilidadcargo,
		}

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO cargo SET ?', cargo, function(err, rows, fields){
			if(err) throw err;

			db.end();
		});

		res.render('cargos/nuevocargo', {info : 'Cargo creado correctamente'});
		//console.log(req.body);
	},

	eliminarCargo : function(req, res, next){
		var id_cargo = req.body.id;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var respuesta = {res: false};

		db.query('DELETE FROM cargo WHERE id = ?', id_cargo, function(err, rows, fields){
			if(err)throw err;

			db.end();
			respuesta.res = true;

			res.json(respuesta);
		});
	},

	getModificarCargo : function(req, res, next){
		var id_cargo = req.params.id_cargo;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var cargo = null;

		db.query('SELECT * FROM cargo WHERE id = ?', id_cargo, function(err, rows, fields){
			if(err) throw err;

			cargo = rows;
			db.end();

			res.render('cargos/modificarcargo', {cargo: cargo});
		});
	},

	postModificarCargo : function(req, res, next){

		var cargo = {
			nombre : req.body.nombrecargo,
			responsabilidad: req.body.responsabilidadcargo		
		};

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('UPDATE cargo SET ? WHERE ?', [cargo, {id : req.body.id_cargo}], function(err, rows, fields){
			if(err) throw err;
			db.end();
		});

		res.redirect('/vercargo');

	}
  
}