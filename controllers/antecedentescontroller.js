var mysql = require('mysql');
//var dateFormat = require('dateformat');

//productos controller

module.exports = {

	//funciones del controlador 
  indexant : function(req, res, next){
		res.render('indexantecedente');
	}, 

	/*getAntecedentes : function(req, res, next){
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var antecedentes = null;

		db.query('SELECT * FROM antecedentes_clinicos', function(err, rows, fields){
			if(err) throw err;

			antecedentes = rows;
			db.end();

			res.render('antecedentes/antecedentes', {antecedentes : antecedentes});
		});		
	},
*/
	getNuevoAntecedente : function(req, res, next){
		res.render('antecedentes/nuevoantecedente');
	},

	postCrearAntecedente : function(req, res, next){
    console.log('ingreso');
		
    var ant;
   
    ant = {
			diabetes : req.body.dropdowndiabetes,
      
      obecidad : req.body.dropdownobecidad,
      enf_cardiaca : req.body.dropdowncardo,
      epilepcia : req.body.dropdownepi,
      alergias: req.body.alergias,
      tabaquismo : req.body.dropdowntab,
      
      alcoholismo : req.body.dropdownalcohol,
      fracturas : req.body.fracturas,
			operaciones : req.body.cirugias,
      hospitalizaciones : req.body.hospitalizaciones,
      matricula : req.body.matriculaP,
      matriculaM : req.body.matriculaM,
		}
    
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();
    
    
		db.query('INSERT INTO antecedentes_clinicos SET ?', ant, function(err, rows, fields){
			if(err) throw err;
      console.log('es rows',rows);
      
    
      db.end();
      
		});
    res.render('indexregistroexitoso1', {info : 'Antecedente Clinico registrado'});
		
	
	},
  getBuscarAntecedente : function(req, res, next){
		res.render('antecedentes/iniciobuscar');
	},
  
  postBuscarAntecedente:function(req, res, next){
    console.log('entroooooo');
    var mat = req.body.pacienteMatricula;
    console.log('verrrr');
    var datos;
    console.log('el datos ',mat);
   var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

    console.log('el datos ',mat);
		db.query("Select * from antecedentes_clinicos where matricula='"+mat+"'",  function(err, rows, fields){
			if(err) throw err;
      datos=rows;
      console.log('es esto',datos);
      res.render('antecedentes/antecedente', {antecedente : datos});
      db.end();
      
		});
    
  },
  
  
  
  
  
/*
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
/*
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

	}*/
  
}