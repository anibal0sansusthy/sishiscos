var mysql = require('mysql');
var dateFormat = require('dateformat');
  matriculaAsegurado  =  " ";
  matriculaAsegurado1  =  " ";
  fechacomparar = " ";
  idreserva = " ";
module.exports = {
  inicio : function(req, res, next){
      res.render('historias/iniciohistorias');
      
    },
  postInicioHistoria: function(req, res, next) {
         
    matriculaMedico = req.body.medicoMatricula;
    
		var idasegurados;
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
    db.connect();
    console.log('la matricula es medico ',matriculaMedico);
    var fechaactual = new Date();
		fechacomparar = dateFormat(fechaactual, 'yyyy-mm-dd');
    console.log('fecha confirmadaaaaaaa',fechacomparar);
    db.query("select r.nro,p.apaterno,p.matricula from historial_clinico hi right join reserva r on hi.reserva_id=r.id_reserva join asegurado s on r.id_asegurado = s.id_asegurado join persona p on s.id_persona = p.id_persona left outer join horario h on r.id_horario = h.id_horario join medico m on h.id_medico = m.id_medico join persona p2 on m.id_persona = p2.id_persona where hi.reserva_id is null  and h.fecha='"+fechacomparar+"' and r.confirmada='CONFIRMADA' and p2.matricula='"+matriculaMedico+"' order by r.nro", function(err, rows, fields){
    //db.query("select r.nro,p.apaterno,p.matricula from historial_clinico hi right join reserva r on hi.reserva_id=r.id_reserva join asegurado s on r.id_asegurado = s.id_asegurado join persona p on s.id_persona = p.id_persona left outer join horario h on r.id_horario = h.id_horario join medico m on h.id_medico = m.id_medico join persona p2 on m.id_persona = p2.id_persona where hi.reserva_id is null and  p2.matricula ='"+matriculaMedico+"' and r.fecha_confirmada='"+fechacomparar+"' order by r.nro", function(err, rows, fields){
      if(err) throw err;
      idasegurados=rows;
      console.log('es el elele',idasegurados)
      res.render('historias/MostrarHistorias', {idasegurados : idasegurados});
      db.end();
      });   
	}, 
  postInicioHistoria1: function(req, res, next) {
         
    //matriculaMedico = req.body.medicoMatricula;
    
		var idasegurados;
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
    db.connect();
    console.log('la matricula es medicooo ',matriculaMedico);
    var fechaactual = new Date();
		fechacomparar = dateFormat(fechaactual, 'yyyy-mm-dd');
    console.log('fecha confirmada es aaaaa',fechacomparar);
    db.query("select r.nro,p.apaterno,p.matricula from historial_clinico hi right join reserva r on hi.reserva_id=r.id_reserva join asegurado s on r.id_asegurado = s.id_asegurado join persona p on s.id_persona = p.id_persona left outer join horario h on r.id_horario = h.id_horario join medico m on h.id_medico = m.id_medico join persona p2 on m.id_persona = p2.id_persona where hi.reserva_id is null  and h.fecha='"+fechacomparar+"' and r.confirmada='CONFIRMADA' and p2.matricula='"+matriculaMedico+"' order by r.nro", function(err, rows, fields){
    //db.query("select r.nro,p.apaterno,p.matricula from historial_clinico hi right join reserva r on hi.reserva_id=r.id_reserva join asegurado s on r.id_asegurado = s.id_asegurado join persona p on s.id_persona = p.id_persona left outer join horario h on r.id_horario = h.id_horario join medico m on h.id_medico = m.id_medico join persona p2 on m.id_persona = p2.id_persona where hi.reserva_id is null and  p2.matricula ='"+matriculaMedico+"' and r.fecha_confirmada='"+fechacomparar+"' order by r.nro", function(err, rows, fields){
      if(err) throw err;
      idasegurados=rows;
      console.log(idasegurados)
      res.render('historias/MostrarHistorias', {idasegurados : idasegurados});
      db.end();
      });   
	}, 
  getNuevoHistoria: function(req, res, next) {
          var config = require('.././database/config');
          var db = mysql.createConnection(config);
          var idhistoria;
          var nombres;
          var datos;
          matriculaAsegurado1 = req.params.matricula;
          db.connect();
          console.log('la matricula essss ',matriculaAsegurado1);
          db.query("SELECT nombre,apaterno,amaterno from persona where matricula='" + matriculaAsegurado1 + "'", function(err, rows, fields){
          if(err) throw err;
          nombres=rows;
          console.log(nombres);
          
          db.query("SELECT h.id from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id where p.matricula='" + matriculaAsegurado1 + "'and r.fecha_confirmada ='"+fechacomparar+"'", function(err, rows, fields){
          if(err) throw err;
          idhistoria=rows;
          console.log('el valor de idhistorias antes db ',idhistoria.length);
           
          console.log('el valor de idhistorias despues db ',idhistoria.length);
          if(idhistoria.length===0){
            res.render('historias/crearhistorias',{nombres:nombres});  
          }
          else{
            res.render('indexerrorhistoria');  
          }
          db.end();
          });
          });
          
          
					
          //console.log('matricula del post es',matriculaAsegurado);
	}, 
  getNuevoHistoria1: function(req, res, next) {
          var config = require('.././database/config');
          var db = mysql.createConnection(config);
          var idhistoria;
          var nombres;
          //matriculaAsegurado = req.params.matricula;
          db.connect();
          console.log('la matricula essss ',matriculaAsegurado1);
          db.query("SELECT nombre,apaterno,amaterno from persona where matricula='" + matriculaAsegurado1 + "'", function(err, rows, fields){
          if(err) throw err;
          nombres=rows;
          console.log(nombres);
          db.query("SELECT h.id from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id where p.matricula='" + matriculaAsegurado1 + "'and r.fecha_confirmada ='"+fechacomparar+"'", function(err, rows, fields){
          if(err) throw err;
          idhistoria=rows;
          console.log('el valor de idhistorias antes db ',idhistoria.length);
           
          console.log('el valor de idhistorias despues db ',idhistoria.length);
          if(idhistoria.length===0){
            res.render('historias/crearhistorias',{nombres:nombres});  
          }
          else{
            res.render('indexerrorhistoria');  
          }
          db.end();
          });
          });
          
          
					
          //console.log('matricula del post es',matriculaAsegurado);
	}, 
   postRegistrarHistoria: function(req, res, next) {
		var config = require('.././database/config');
		var db = mysql.createConnection(config);
    var idreserva;
    var id=null;
    var diagnostico=req.body.diagnosticohistoria;
    //var matriculaAsegurado =null;
    var idenfermedad = req.body.dropdownenfermedad;
		db.connect();
      console.log(req.body);
      console.log('matricula POSTASEGURADO',matriculaAsegurado1);
      console.log('FECHA POSTASEGURADO',fechacomparar);		  
      db.query("SELECT r.id_reserva from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join horario ho on r.id_horario=ho.id_horario where p.matricula='"+matriculaAsegurado1+"'and ho.fecha = '"+fechacomparar+"'", function(err, rows, fields){
      if(err) throw err;
      idreserva = rows;
      //console.log('el id obtenido es',idreserva[0].id_reserva);
      
      if(idenfermedad===undefined){idenfermedad=1} 
      
      if(diagnostico===undefined){diagnostico=req.body.dropdownenfermedad}
      else{diagnostico=req.body.diagnosticohistoria}
      nuevoHistoria = {
        reserva_id : idreserva[0].id_reserva,
        peso: req.body.pesohistoria,
        talla: req.body.tallahistoria,
        temperatura: req.body.temperaturahistoria,
        sintomas: req.body.sintomashistoria,
        diagnostico: diagnostico,
        tratamiento: req.body.tratamientohistoria,
        presion_arterial: req.body.precionhistoria,
        enfermedad_id : idenfermedad,
       
       
      }
      console.log('valores de nuevo historial');
      console.log(nuevoHistoria);
      console.log('el valor de id reserva es',idreserva[0].id_reserva);
      //});
      db.query("SELECT id FROM historial_clinico WHERE reserva_id= '" +idreserva[0].id_reserva + "'", function(err, rows, fields){
         if(err) throw err;
          id=rows;
         });  
      
        db.query("INSERT INTO historial_clinico SET ?", nuevoHistoria, function(err, rows, fields){
         if(err) throw err;
        });   
        db.end();
        res.render('indexregistroexitoso', {info : 'Historia creado correctamente'});
      
      
      });
				
  },  
  postRegistrarHistoria1: function(req, res, next) {
		var config = require('.././database/config');
		var db = mysql.createConnection(config);
    var idreserva;
    var id=null;
    //var matriculaAsegurado =null;
    var idenfermedad = req.body.dropdownenfermedad;
		db.connect();
      console.log(req.body);
      console.log('matricula POSTASEGURADO',matriculaAsegurado1);
      console.log('FECHA POSTASEGURADO',fechacomparar);		  
      db.query("SELECT r.id_reserva from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join horario ho on r.id_horario=ho.id_horario where p.matricula='"+matriculaAsegurado1+"'and ho.fecha = '"+fechacomparar+"'", function(err, rows, fields){
      if(err) throw err;
      idreserva = rows;
      console.log('el id obtenido es',idreserva[0].id_reserva);
      
      if(idenfermedad===undefined){idenfermedad=1} 
      nuevoHistoria = {
        reserva_id : idreserva[0].id_reserva,
        peso: req.body.pesohistoria,
        talla: req.body.tallahistoria,
        temperatura: req.body.temperaturahistoria,
        sintomas: req.body.sintomashistoria,
        diagnostico: req.body.diagnosticohistoria,
        tratamiento: req.body.tratamientohistoria,
        presion_arterial: req.body.precionhistoria,
        enfermedad_id : idenfermedad,
       
       
      }
      console.log('valores de nuevo historial');
      console.log(nuevoHistoria);
      console.log('el valor de id reserva es',idreserva[0].id_reserva);
      //});
      db.query("SELECT id FROM historial_clinico WHERE reserva_id= '" +idreserva[0].id_reserva + "'", function(err, rows, fields){
         if(err) throw err;
          id=rows;
         });  
      
        db.query("INSERT INTO historial_clinico SET ?", nuevoHistoria, function(err, rows, fields){
         if(err) throw err;
        });   
        db.end();
        res.render('indexregistroexitoso', {info : 'Historia creado correctamente'});
      
      
      });
				
  },  
  getVerHistoria: function(req, res, next) {
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
    var idpersonas = null;
    //var matriculaAsegurado =null;
    db.connect();
    var verhistorias=null;
    console.log('la matricula del ver historia ',matriculaAsegurado1);
    db.query("SELECT h.id,r.fecha_confirmada, h.diagnostico,p2.apaterno from historial_clinico h join reserva r on h.reserva_id=r.id_reserva join asegurado a on r.id_asegurado=a.id_asegurado join persona p on a.id_persona=p.id_persona left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join persona p2 on m.id_persona=p2.id_persona where p.matricula= '" + matriculaAsegurado1 + "'", function(err, rows, fields){
      if(err) throw err;
      verhistorias=rows;  
      console.log('esta es la historia',verhistorias);
      db.end();
      res.render('historias/verhistorias', {verhistorias : verhistorias});
    });    
       
  },
  getMirarHistorial: function(req, res, next) {
    var id = req.params.id;

		var config = require('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		//var producto = null;

		db.query('SELECT * FROM historial_clinico WHERE id = ?', id, function(err, rows, fields){
			if(err) throw err;

			verhistorias = rows;
			db.end();

			res.render('historias/historias',{verhistorias: verhistorias});
		});
    
  
  
  },
  postVerdiagnosticar: function(req, res, next) {
  var sintomas=req.body.sintomashistoria;
  sintomas=sintomas.split(" ");
  var sintomatabla;
  var sinenf;
  var sint;
  var cont;
  var ncont=0;
  var cont1;
  var id;
  var nombenfermedad;
  console.log('sintoma es ',sintomas);
  var config = require('.././database/config');
	var db = mysql.createConnection(config);
  var arr=[];
  var narr=0;
  var sintomatabla1;
  var sinenf1;
  var sint1;
  var acum;
  var acum1;
  var probabilidad;
  var probabilidad1;
  var encontrado;
  for(var i=1;i<=8;i=i+2){
    db.query('SELECT sintomas1 FROM enfermedad WHERE id_enfermedad = ?', i, function(err, rows, fields){
			if(err) throw err;
    sintomatabla=rows;
    console.log('sintoma tabla es ',sintomatabla);
    sinenf=JSON.stringify(sintomatabla);
    sint=sinenf.split(" ");
    console.log('sintoma tabla split ',sint);
    acum=1;
    
    for(var j=0;j<sintomas.length;j++){
      cont=0;
      for(var k=0;k<sint.length;k++){
        console.log('palabra sint',sint[j]);
        console.log('palabra sintomas',sintomas[k]);
        var a = JSON.stringify (sint[j]);
        console.log('a es ',a);        
        var b = JSON.stringify (sintomas[k]);
        console.log('b es ',b); 
       
        if(a===b ){
          cont++;
          console.log('el cont es',cont);
          console.log('son iguales');
        }  
        else{
          ncont++;
          console.log('no son iguales');
          
          
        }
        
      }
      console.log('el contador es ',cont);
      if(cont>0){
        acum=acum*(cont/sint.length);
        console.log('acum ',acum);
      }
     
    }
     });
     console.log('el valor de i donde entra ',i+1);
    db.query('SELECT sintomas1 FROM enfermedad WHERE id_enfermedad = ?', i+1, function(err, rows, fields){
			if(err) throw err;
      sintomatabla1=rows;
      sinenf1=JSON.stringify(sintomatabla1);
      sint1=sinenf1.split(" ");
    cont1=0;
    acum1=1;
    for(var j=0;j<sint1.length;j++){
      for(var k=0;k<sintomas.length;k++){
        console.log('palabra sint1',sint1[j]);
        console.log('palabra sintomas',sintomas[k]);
        var a = JSON.stringify (sint1[j]);
        console.log('a1 es ',a);        
        var b = JSON.stringify (sintomas[k]);
        console.log('b1 es ',b); 
        if(a===b ){
          cont1++;
          console.log('el cont es',cont);
          console.log('son iguales');
        }  
        else{
          ncont++;
          console.log('no son iguales');
          
          
        }
        
      }
      if(cont1>0){
        acum1=acum1*(cont1/sint1.length);
        console.log('acum1 ',acum1);
      }
    }
    console.log('el general es acum ',acum);
    console.log('el general es acum1 ',acum1);
    probabilidad=(acum/(acum+acum1));
    console.log('probabilidad ',probabilidad);
    probabilidad1=(acum1/(acum1+acum));
    console.log('probabilidad1 ',probabilidad1);
     
    if(probabilidad>0.5)
    {
      arr[narr]=i;
      narr++;
      console.log('probabilidad es mayor ');
      console.log('arr es ',arr);
      var config = require('.././database/config');
      var db = mysql.createConnection(config);
      db.query('SELECT nombreenfermedad FROM enfermedad WHERE id_enfermedad = ?',i, function(err, rows, fields){
      if(err) throw err;
      enfermedadnombre=rows;
      console.log('nombre enfermedad es ', enfermedadnombre);
      res.send(200,{enfermedades: enfermedadnombre});  
      console.log('las enfermedades para mostrar es ',enfermedadnombre);
      });
    }
    else
    {
      if(probabilidad1>0.5)
        {
          arr[narr]=i+1;
          narr++;
          console.log('probabilidad1 es mayor ');
          console.log('arr es ',i+1);
           var config = require('.././database/config');
           var db = mysql.createConnection(config);
          db.query('SELECT nombreenfermedad FROM enfermedad WHERE id_enfermedad = ?',i+1, function(err, rows, fields){
          if(err) throw err;
          enfermedadnombre=rows;
          console.log('nombre enfermedad es ', enfermedadnombre);
          res.send(200,{enfermedades: enfermedadnombre});  
          console.log('las enfermedades para mostrar es ',enfermedadnombre);  
          });
          
        }
      else
        {
          encontrado=200;
          console.log('ninguno ');
        }
       
    }
          
      });
    
     
  }
 
  
  
    
   db.end();
 
  
  
  },
    postVerdiagnosticar1: function(req, res, next) {
   
    var enfermedades=null;
    var config = require('.././database/config');
    var sintomas=req.body.sintomashistoria;
    var listSintomas = sintomas.split(' ');
    var totalSintomas = listSintomas.length;
    var porcentaje = totalSintomas * 0.8;
    var totalPalabras = Math.round(porcentaje);
    console.log('total palabras',totalPalabras);
    var cadenaParaComparar = '';
    
    for(var i = 0; i < totalPalabras; i++) {
      cadenaParaComparar += "sintomas1 LIKE '%" + listSintomas[i] + "%' and ";
    }
    var queryLike = cadenaParaComparar.substring(0, cadenaParaComparar.length - 4);
    
    var con=0;
		var db = mysql.createConnection(config);
    

      db.connect();     
      db.query('SELECT id_enfermedad, nombreenfermedad, sintomas1 FROM enfermedad WHERE '+ queryLike, function(err, rows, fields){
       if(err) throw err;
       enfermedades=rows;
       db.end();
       
       res.send(200,{enfermedades: enfermedades}); 
    });    
   },
  
}