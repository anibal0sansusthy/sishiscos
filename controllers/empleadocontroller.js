var mysql = require('mysql');

var matricula='';
var cargo='';

module.exports = {
  indexemp : function(req, res, next){
		res.render('indexempleado', {title : 'Bienvenido al MODULO-EMPLEADO'});
	}, 
  getNuevoEmpleado : function(req, res, next){
        
		res.render('empleados/nuevoempleado');
	},
  
  postNuevoEmpleado : function(req, res, next){
    matricula=req.body.dropdownmatricula;
    cargo=req.body.dropdown;
    var idpersona=null;
    var idcargo=null;
    
    var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		db.query("SELECT id_persona FROM persona WHERE matricula= '"+matricula+"'", function(err, rows, fields){
    if(err) throw err;
    idpersona=rows;
    db.query("SELECT id FROM cargo WHERE nombre= '"+cargo+"'", function(err, rows, fields){
    if(err) throw err;
    idcargo=rows;
    var empleado = {
      id_persona : idpersona[0].id_persona,
      cargo_id : idcargo[0].id,       
    }   
    
    db.query('INSERT INTO empleado SET ?',empleado, function(err, rows, fields){
      if(err) throw err;
      db.end();

    });
    });
    
    });
    
    res.render('empleados/nuevoempleado', {info : 'Empleado creado correctamente'});
    
    
  }  ,
  getEmpleados : function(req, res, next){
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var empleados = null;
    var nempleado=null;

		db.query('select e.id_empleado,p.nombre,p.apaterno,p.amaterno,e.id_empleado,c.nombre,e.cargo_id from persona as p join empleado as e join cargo as c where e.id_persona=p.id_persona and e.cargo_id=c.id ORDER BY e.id_empleado', function(err, rows, fields){
			if(err) throw err;

			empleados = rows;
      
    db.query('select * from empleado', function(err, rows, fields){
			if(err) throw err;
      nempleado=rows;
			db.end();

			res.render('empleados/empleado', {empleados : empleados,nempleado:nempleado});
      //res.send(200, {empleados : empleados,nempleado:nempleado});
    });
		});		
	},
  getModficarEmpleado : function(req, res, next){
		var id_empleado = req.params.id_empleado;
    var empleado=null;
    var empleado1=null;
   
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		
    
		db.query('SELECT * FROM empleado WHERE id_empleado = ?', id_empleado, function(err, rows, fields){
			if(err) throw err;
      empleado = rows;
      console.log('todo de empleado es',empleado[0].persona_id);
    db.query("SELECT * FROM persona WHERE id_persona = '"+empleado[0].id_persona+"'", function(err, rows, fields){
			if(err) throw err;
      empleado1=rows;
      console.log('empleado1',empleado1);
      db.end();
      res.render('empleados/modificarempleado', {persona:empleado1,empleado:empleado});
     });  
    
    }); 
       
    
    
	},
  postModficarEmpleado : function(req, res, next){

		var ncargo = req.body.dropdown;
    var empleado = null;
		var config = require('.././database/config');
    var id=req.body.id_empleado;

		var db = mysql.createConnection(config);
		db.connect();
    db.query("SELECT id FROM cargo WHERE nombre= '"+ncargo+"'", function(err, rows, fields){
    if(err) throw err;
    empleado=rows;
    empleado = {
      cargo_id:empleado[0].id,
    }
    console.log('empleado esss',empleado);
    console.log('idempleado esss',id);
		db.query('UPDATE empleado SET ? WHERE ?', [empleado, {id_empleado : req.body.id_empleado}], function(err, rows, fields){
			if(err) throw err;
			db.end();
		});
    });
		res.redirect('/verempleado');

	},
  
  eliminarEmpleado : function(req, res, next){
		var id_empleado = req.body.id;
    
		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var respuesta = {res: false};
    console.log('el id es ',id_empleado);
		db.query('DELETE FROM empleado WHERE id_empleado = ?', id_empleado, function(err, rows, fields){
			if(err)throw err;

			db.end();
			respuesta.res = true;

			res.json(respuesta);
		});
	},
  
  cargarCargos : function(req, res, next) {
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    db.query('SELECT nombre FROM cargo', function(err, rows, fields){
			if(err)throw err;
      console.log('rows',rows);
      res.json(rows);
			db.end();     
		});
  },
  cargarMatriculaEmpleado : function(req, res, next) {
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    db.query('select p.matricula from persona p left join empleado e on p.id_persona=e.id_persona where e.id_persona is null', function(err, rows, fields){
			if(err)throw err;
      console.log('rows',rows);
      res.json(rows);
			db.end();     
		});
  }
}