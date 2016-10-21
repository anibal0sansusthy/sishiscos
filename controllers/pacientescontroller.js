var mysql = require('mysql');

var matricula='';
var cargo='';

module.exports = {
  
  indexpaciente : function(req, res, next){
		res.render('indexpaciente', {title : 'Bienvenido al MODULO-PACIENTE'});
	},
  getPacientes : function(req, res, next){
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var pacientes = null;
    var nmedicos=null;

		db.query('select a.id_asegurado,p.nombre,p.apaterno,p.amaterno,p.matricula,a.grado,a.fuerza,a.tipo_asegurado from persona as p join asegurado as a where a.id_persona=p.id_persona ORDER BY a.id_asegurado', function(err, rows, fields){
			if(err) throw err;

			pacientes = rows;
     
			db.end();

			res.render('pacientes/pacientes', {pacientes : pacientes});
      //res.send(200, {empleados : empleados,nempleado:nempleado});
    });
		//});		
	},
  
  getNuevoPacientes : function(req, res, next){
        
		res.render('pacientes/nuevopaciente');
	},
  
  postNuevoPacientes : function(req, res, next){
    matricula=req.body.dropdownmatricula;
   
    var idpersona=null;
    
    
    var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query("SELECT id_persona FROM persona WHERE matricula= '"+matricula+"'", function(err, rows, fields){
    if(err) throw err;
    idpersona=rows;

    var pacientes = {
      id_persona    : idpersona[0].id_persona,
      grado : req.body.dropdowngrado,
      fuerza : req.body.dropdownfuerza,
      tipo_asegurado : req.body.dropdowntipo,
     
    }   
    
    db.query('INSERT INTO asegurado SET ?',pacientes, function(err, rows, fields){
      if(err) throw err;
      db.end();

    });
    });    
    res.render('pacientes/nuevopaciente', {info : 'Paciente creado correctamente'});
    
    
  }, 
  
  eliminarPaciente : function(req, res, next){
		var id_asegurado = req.body.id;
    
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var respuesta = {res: false};
    
		db.query('DELETE FROM asegurado WHERE id_asegurado = ?', id_asegurado, function(err, rows, fields){
			if(err)throw err;

			db.end();
			respuesta.res = true;

			res.json(respuesta);
		});
	},
 
  
  getModificarPaciente : function(req, res, next){
    
		var id_asegurado = req.params.id_asegurado;
    var pacientes=null;
   	var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    console.log('el id_asegurado',req.body.id);
		db.query('select a.id_asegurado,p.nombre,p.apaterno,p.amaterno,p.matricula,a.grado,a.fuerza,a.tipo_asegurado from persona as p join asegurado as a where  a.id_persona =p.id_persona and a.id_asegurado=?', id_asegurado, function(err, rows, fields){
			if(err) throw err;
      pacientes = rows;
      db.end();
      res.render('pacientes/modificarpaciente', {pacientes:pacientes});
    }); 
	},
  postModificarPaciente : function(req, res, next){

		var paciente = {
			grado : req.body.dropdowngrado,
      fuerza : req.body.dropdownfuerza,
      tipo_asegurado : req.body.dropdowntipo,
      
    };

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query('UPDATE asegurado SET ? WHERE ?', [paciente, {id_asegurado : req.body.id_asegurado}], function(err, rows, fields){
			if(err) throw err;
			db.end();
		});

		res.redirect('/verpaciente');

	},
  cargarMatriculaPaciente : function(req, res, next) {
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    db.query('select p.matricula from persona p left join asegurado a on p.id_persona=a.id_persona where a.id_persona is null', function(err, rows, fields){
			if(err)throw err;
      console.log('rows',rows);
      res.json(rows);
			db.end();     
		});
  }
 
}