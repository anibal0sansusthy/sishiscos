var mysql = require('mysql');
var bcrypt = require('bcryptjs');
//var dateFormat = require('dateformat');

//productos controller

module.exports = {

	//funciones del controlador 
  indexuser : function(req, res, next){
		res.render('indexusuario', {title : 'Bienvenido al MODULO-USUARIO'});
    
    res.redirect('http://reportes', {title : 'Bienvenido al MODULO-USUARIO'});
	}, 
  

	getUsuario : function(req, res, next){
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var usuarios = null;

		db.query('SELECT * FROM usuario', function(err, rows, fields){
			if(err) throw err;

			usuarios = rows;
			db.end();

			res.render('usuarios/usuario', {usuarios : usuarios});
		});		
	},

	getNuevoUsuario : function(req, res, next){
		res.render('usuarios/nuevousuario');
	},

	postNuevoUsuario : function(req, res, next){

		//var fechaactual = new Date();
		//var fecha = dateFormat(fechaactual, 'yyyy-mm-dd h:MM:ss');
    var matricula=req.body.dropdownmatricula;
    var persona_id=null;
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(req.body.password, salt);

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();
    console.log('matricula drop',matricula);
    db.query('select e.id_empleado from persona as p join empleado as e where e.id_persona=p.id_persona and p.matricula= ?',matricula, function(err, rows, fields){
			if(err) throw err;
      empleado_id=rows;
      console.log('id obtenido ',empleado_id);
      
    var usuario = {
			nombreusuario : req.body.nombreusuario,
			contrasenausuario : password,
      empleado_id_empleado : empleado_id[0].id_empleado,
            
		}  
    console.log('el usuario a llenar ',usuario);
		db.query('INSERT INTO usuario SET ?', usuario, function(err, rows, fields){
			if(err) throw err;

			db.end();
       
       
      res.render('usuarios/nuevousuario', {info : 'Usuario creado correctamente'});
		});
    });

		
		
	},

	eliminarUsuario : function(req, res, next){
		var id_usuario = req.body.id;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var respuesta = {res: false};

		db.query('DELETE FROM usuario WHERE id_usuario = ?', id_usuario, function(err, rows, fields){
			if(err)throw err;

			db.end();
			respuesta.res = true;

			res.json(respuesta);
		});
	},
  cargarMatriculaUsuario : function(req, res, next) {
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    db.query('select p.matricula from persona p join empleado e on p.id_persona=e.id_persona left join usuario u on e.id_empleado=u.empleado_id_empleado where u.empleado_id_empleado is null', function(err, rows, fields){
			if(err)throw err;
      console.log('rows',rows);
      res.json(rows);
			db.end();     
		});
  },
/*
	getModificarUsuario : function(req, res, next){
		var id_usuario = req.params.id_usuario;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var persona = null;

		db.query('SELECT * FROM usuario WHERE id_usuario = ?', id_usuario, function(err, rows, fields){
			if(err) throw err;

			persona = rows;
			db.end();

			res.render('personas/modificarpersona', {persona: persona});
		});
	},

	postModificarPersona : function(req, res, next){

		var persona = {
			nombrepersona : req.body.nombrepersona,
			apaternopersona : req.body.apaternopersona,		
      amaternopersona : req.body.amaternopersona,
			cipersona : req.body.cipersona	,
      fecha_nacpersona : req.body.fecha_nacpersona,
			matriculapersona : req.body.matriculapersona		
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
 */
}