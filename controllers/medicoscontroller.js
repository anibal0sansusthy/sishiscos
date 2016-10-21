var mysql = require('mysql');

var matricula='';
var cargo='';

module.exports = {
  indexmed : function(req, res, next){
		res.render('indexmedico', {title : 'Bienvenido al MODULO-MEDICO'});
	}, 
  getMedicos : function(req, res, next){
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var medicos = null;
    var nmedicos=null;

		db.query('select m.id_medico,p.nombre,p.apaterno,p.amaterno,es.nombre from persona as p join especialidad as es join medico as m where m.id_persona=p.id_persona and m.id_especialidad=es.id_especialidad ORDER BY m.id_medico', function(err, rows, fields){
			if(err) throw err;

			medicos = rows;
     
			db.end();

			res.render('medicos/medicos', {medicos : medicos});
      //res.send(200, {empleados : empleados,nempleado:nempleado});
    });
		//});		
	},
  
  getNuevoMedico : function(req, res, next){
        
		res.render('medicos/nuevomedico');
	},
  
  postNuevoMedico : function(req, res, next){
    matricula=req.body.dropdownmatricula;
    especialidad=req.body.dropdownespecialidad;
    var idpersona=null;
    var idespecialidad=null;
    
    var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query("SELECT id_persona FROM persona WHERE matricula= '"+matricula+"'", function(err, rows, fields){
    if(err) throw err;
    idpersona=rows;
    db.query("SELECT id_especialidad FROM especialidad WHERE nombre= '"+especialidad+"'", function(err, rows, fields){
    if(err) throw err;
    idespecialidad=rows;
    var medico = {
      id_persona : idpersona[0].id_persona,
      id_especialidad : idespecialidad[0].id_especialidad,       
    }   
    
    db.query('INSERT INTO medico SET ?',medico, function(err, rows, fields){
      if(err) throw err;
      db.end();

    });
    });
    
    });
    
    res.render('medicos/nuevomedico', {info : 'Medico creado correctamente'});
    
    
  }, 
  eliminarMedico : function(req, res, next){
		var id_medico = req.body.id;
    
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var respuesta = {res: false};
    
		db.query('DELETE FROM medico WHERE id_medico = ?', id_medico, function(err, rows, fields){
			if(err)throw err;

			db.end();
			respuesta.res = true;

			res.json(respuesta);
		});
	},
 
  
  getModficarMedico : function(req, res, next){
		var id_medico = req.params.id_medico;
    var medicos=null;
    //var empleado1=null;
   
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		
    
		db.query('select m.id_medico,p.nombre,p.apaterno,p.amaterno,es.nombre from persona as p join especialidad as es join medico as m where p.id_persona=m.id_persona and es.id_especialidad=m.id_especialidad and m.id_medico= ?', id_medico, function(err, rows, fields){
			if(err) throw err;
      medico = rows;
      
    
      db.end();
      res.render('medicos/modificarmedico', {medicos:medicos});
      
    
    }); 
       
    
    
	},
  postModficarMedico : function(req, res, next){

		var nespecialidad = req.body.dropdown;
    var medico = null;
    var especialidad=null;
		var config = require('.././database/config');
    var especialidad_id;
    var id=req.body.id_medico;
		var db = mysql.createConnection(config);
		db.connect();
    console.log('nomb especialid',nespecialidad);
    db.query("SELECT id_especialidad FROM especialidad WHERE nombre= '"+nespecialidad+"'", function(err, rows, fields){
    if(err) throw err;
    especialidad=rows;
    console.log('id obtenido',especialidad);  
    console.log('id capturado',id);  
		//db.query('UPDATE medico SET especialidad_id=? WHERE id_medico=?', [especialidad, {id_medico : req.body.id_medico}], function(err, rows, fields){
    db.query("UPDATE medico SET id_especialidad='"+especialidad[0].id_especialidad+"' WHERE id_medico= '"+id+"'", function(err, rows, fields){
      if(err) throw err;
			db.end();
		});
    });
		res.redirect('/vermedico');

	},
  
  cargarEspecialidad : function(req, res, next) {
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    db.query('SELECT nombre FROM especialidad', function(err, rows, fields){
			if(err)throw err;
      console.log('rows',rows);
      res.json(rows);
			db.end();     
		});
  },
  cargarMatricula : function(req, res, next) {
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    db.query('select p.id_persona,p.matricula from empleado e join  persona p on e.id_persona=p.id_persona left join medico m on p.id_persona=m.id_persona where m.id_persona is null and e.cargo_id=2', function(err, rows, fields){
			if(err)throw err;
      console.log('rows',rows);
      res.json(rows);
			db.end();     
		});
  }
  
  
}