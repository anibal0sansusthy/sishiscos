var mysql = require('mysql');
var dateFormat = require('dateformat');
  fechainicio=" ";
  fechafin=" ";
  fechainicioEs=" ";
  fechafinEs=" ";
  valorunidad=[];
//var dateFormat = require('dateformat');

//productos controller

module.exports = {
  indexreportetabla : function(req, res, next){
		res.render('indexreportetabla', {title : 'Bienvenido Reportes en Tablas'});
	}, 
  indexreportegrafico : function(req, res, next){
		res.render('indexreportegrafico', {title : 'Bienvenido Reportes Grafico'});
	}, 
	
	inicioedades : function(req, res, next){
		res.render('reportes/edades');
	},
  
	postCrearEdades : function(req, res, next){

    fechainicio=req.body.fechainicio;
    fechafin=req.body.fechafin;
    console.log('fecha inicio',fechainicio);
    console.log('fecha fin',fechafin);
    
    var totalatendidos;
    var edadninoinicio=1;
    var edadninofin=18;
    var edadadultoinicio=19;
    var edadadultofin=40;
    var edadancianoinicio=41;
    var edadancianofin=100;
    var nronino;
    var nroadulto;
    var nromayor;
    var porcentajenino;
    var porcentajeadulto;
    var porcentajemayor;
    var reporteedades;
		var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    
		db.query("select count(*)as cantidadt from edades1 p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id join reserva re on h.reserva_id=re.id_reserva join horario ho on re.id_horario=ho.id_horario where ho.fecha<='"+fechafin+"' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
			if(err) throw err;
      totalatendidos=rows;
      
      console.log('total atendidos',totalatendidos[0].cantidadt);
     db.query("select count(*) as cantidadn from edades1 p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id join reserva re on h.reserva_id=re.id_reserva join horario ho on re.id_horario=ho.id_horario where p.anos<='" + edadninofin + "'and p.anos>='" + edadninoinicio + "'and ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
			if(err) throw err; 
      nronino=rows;
      console.log('nro niños',nronino[0].cantidadn);
     db.query("select count(*) as cantidada from edades1 p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id join reserva re on h.reserva_id=re.id_reserva join horario ho on re.id_horario=ho.id_horario where p.anos<='" + edadadultofin + "'and p.anos>='" + edadadultoinicio + "'and ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
			if(err) throw err; 
      nroadulto=rows; 
      console.log('nro adulto',nroadulto[0].cantidada);
      db.query("select count(*) as cantidadm from edades1 p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id join reserva re on h.reserva_id=re.id_reserva join horario ho on re.id_horario=ho.id_horario where p.anos<='" + edadancianofin + "'and p.anos>='" + edadancianoinicio + "'and ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
			if(err) throw err; 
      nromayor=rows; 
      console.log('nro mayor',nromayor[0].cantidadm);
      //var nn=integerValue(totalatendidos);
     
      porcentajenino=Math.round((nronino[0].cantidadn*100)/totalatendidos[0].cantidadt);
      console.log('%niños',porcentajenino);
      porcentajeadulto=Math.round((nroadulto[0].cantidada*100)/totalatendidos[0].cantidadt);
      console.log('%adulto',porcentajeadulto);
      porcentajemayor=Math.round((nromayor[0].cantidadm*100)/totalatendidos[0].cantidadt);
      console.log('%mayor',porcentajemayor);
      
      reporteedades={
        fechainicio:fechainicio,
        fechafin:fechafin,
        nino:nronino[0].cantidadn,
        adulto:nroadulto[0].cantidada,
        mayor:nromayor[0].cantidadm,
        total:totalatendidos[0].cantidadt,
        porcentajenino,
        porcentajeadulto,
        porcentajemayor,
      }
      console.log('valor reporte edades');
      console.log(reporteedades);
      res.render('reportes/mostraredades', {reporteedades : reporteedades});
      //res.render('reportes/edades', {reporteedades : 2});
			db.end();
      });
      });
      });
		});

		
		
    //res.send(200);
	},
  inicioespecialidad : function(req, res, next){
		res.render('reportes/especialidades');
	},
  postCrearEspecialidades : function(req, res, next){
    fechainicioEs=req.body.fechainicio;
    fechafinEs=req.body.fechafin;
    
    var especialidades=req.body.dropdownespecialidad;
    var respuesta;
    var total;
    var porcentaje;
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    
		
        
        db.query("select count(*) as cantidad from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='" + especialidades + "' and ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
        if(err) throw err;
        respuesta=rows;
        console.log('res es',respuesta[0].cantidad);
        db.query("select count(*)as cantidadt from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id join reserva re on h.reserva_id=re.id_reserva join horario ho on re.id_horario=ho.id_horario  where ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
        if(err) throw err;
        total=rows;
        console.log('total atendidos',total[0].cantidadt);
        porcentaje=Math.round((respuesta[0].cantidad*100)/total[0].cantidadt);
        var enviar={
          cantidad:respuesta[0].cantidad,
          fechainicio,
          fechafin,
          especialidades,
          total:total[0].cantidadt,
          porcentaje,
          }
      
      res.render('reportes/mostrarespecialidades', {enviar : enviar});
      //res.render('reportes/edades', {reporteedades : 2});
			db.end();
      });
      });
  
  },
   iniciofuerza : function(req, res, next){
		res.render('reportes/fuerza');
	},
  postCrearFuerza : function(req, res, next){
    fechainicio=req.body.fechainicio;
    fechafin=req.body.fechafin;
    var ejercito='EJERCITO';
    var armada='ARMADA';
    var fab='FAB';
    var resejto;
    var resarmada;
    var resfab;
    var total;
    var general;
    var porcientoejto;
    var porcientoarmada;
    var porcientofab;
    		var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    
		db.query("select count(*) as cantidadt from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id join reserva re on h.reserva_id=re.id_reserva join horario ho on re.id_horario=ho.id_horario where ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
			if(err) throw err;
      total=rows;
      console.log('total',total[0].cantidadt);
    db.query("select count(*) as ejto from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where a.fuerza='" + ejercito + "' and ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
        if(err) throw err;
        resejto=rows; 
        console.log('ejto',resejto[0].ejto);
      
    db.query("select count(*) as armada from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where a.fuerza='" + armada + "' and ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
        if(err) throw err;
        resarmada=rows; 
        console.log('armada',resarmada[0].armada);
      
    db.query("select count(*) as fab from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where a.fuerza='" + fab + "' and ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
        if(err) throw err;
        resfab=rows; 
        console.log('fab',resfab[0].fab);
    porcientoejto=Math.round((resejto[0].ejto*100)/total[0].cantidadt);
    porcientoarmada=Math.round((resarmada[0].armada*100)/total[0].cantidadt);
    porcientofab=Math.round((resfab[0].fab*100)/total[0].cantidadt);
    general={
      ejto:resejto[0].ejto,
      armada:resarmada[0].armada,
      fab:resfab[0].fab,
      total:total[0].cantidadt,
      porcientoejto,
      porcientoarmada,
      porcientofab,
    }
    
    res.render('reportes/mostrarfuerza', {general : general});
      db.end();
      });
      });
      });  
      });
  },
  inicioespecialidadTotal : function(req, res, next){
		res.render('reportes/especialidadesTotal');
	},
  postCrearEspecialidadesTotal : function(req, res, next){
    fechainicioEs=req.body.fechainicio;
    fechafinEs=req.body.fechafin;
    var totalatendidos1;
   
    var valorunidad1;
    var valorunidad2;
    var valorunidad3;
    var valorunidad4;
    var valorunidad5;
    var valorunidad6;
    var valorunidad7;
    var valorunidad8;
    var valorunidad9;
    var valorunidad10;
    var valorunidad11;
    var valorunidad12;
    var valorunidad13;
    var i=0;
    //var cantidadEs;
    var valorunidad=[];
    var valorporcentaje=[];
    
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    console.log('fechainicio',fechainicioEs);
    console.log('fechafin',fechafinEs);
    db.query("select count(*)as cantidadt from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id join reserva re on h.reserva_id=re.id_reserva join horario ho on re.id_horario=ho.id_horario where ho.fecha<='" + fechafinEs + "' and ho.fecha>='"+fechainicioEs+"'", function(err, rows, fields){
			if(err) throw err;
      totalatendidos1=rows;
      console.log('total es ',totalatendidos1[0].cantidadt);
    db.query('select nombre from especialidad order by id_especialidad ', function(err, rows, fields){
        if(err) throw err;
        especialidad=rows; 
        
    db.query("select count(*) as cantidadA from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='CIRUGIA GENERAL' and ho.fecha<='" + fechafinEs + "' and ho.fecha>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad1=rows;
        valorunidad1=cantidad1[0].cantidadA;
        
        
    db.query("select count(*) as cantidadB from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='CIRUGIA PLASTICA' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad2=rows;
        valorunidad2=cantidad2[0].cantidadB;
       
      
    db.query("select count(*) as cantidadC from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='DERMATOLOGIA' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad3=rows;
        valorunidad3=cantidad3[0].cantidadC;
        
    db.query("select count(*) as cantidadD from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='GERIATRIA' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad4=rows;
        valorunidad4=cantidad4[0].cantidadD;
        
    db.query("select count(*) as cantidadE from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='GINECOLOGIA' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad5=rows;
        valorunidad5=cantidad5[0].cantidadE;
        
     db.query("select count(*) as cantidadZ from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='MEDICINA GENERAL' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad14=rows;
        valorunidad14=cantidad14[0].cantidadZ;
        
    db.query("select count(*) as cantidadF from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='MEDICINA INTERNA' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad6=rows;
        valorunidad6=cantidad6[0].cantidadF;
        
    db.query("select count(*) as cantidadG from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='NEUMOLOGIA' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad7=rows;
        valorunidad7=cantidad7[0].cantidadG;
        
    db.query("select count(*) as cantidadH from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='NUTRICION' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad8=rows;
        valorunidad8=cantidad8[0].cantidadH;
        
    db.query("select count(*) as cantidadU from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='ODONTOLOGIA' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad9=rows;
        valorunidad9=cantidad9[0].cantidadU;
        
    db.query("select count(*) as cantidadI from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='CARDIALOGIA' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad10=rows;
        valorunidad10=cantidad10[0].cantidadI;
        
    db.query("select count(*) as cantidadJ from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='ONCOLOGIA' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad11=rows;
        valorunidad11=cantidad11[0].cantidadJ;
        
    db.query("select count(*) as cantidadK from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='PSICOLOGIA' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad12=rows;
        valorunidad12=cantidad12[0].cantidadK;
       
    db.query("select count(*) as cantidadU from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id left outer join horario ho on r.id_horario=ho.id_horario join medico m on ho.id_medico=m.id_medico join especialidad e on m.id_especialidad=e.id_especialidad where e.nombre='PEDIATRIA' and r.fecha_confirmada<='" + fechafinEs + "' and r.fecha_confirmada>='"+fechainicioEs+"'", function(err, rows, fields){
        if(err) throw err;
        var cantidad13=rows;
        valorunidad13=cantidad13[0].cantidadU;
    valorunidad=[
      valorunidad1,
      valorunidad2,
      valorunidad3,
      valorunidad4,
      valorunidad5,
      valorunidad14,
      valorunidad6,
      valorunidad7,
      valorunidad8,
      valorunidad9,
      valorunidad10,
      valorunidad11,
      valorunidad12,
      valorunidad13,
    ]  
     
    console.log('f1 ',fechainicioEs);
    console.log('f2 ',fechafinEs);
    res.render('reportes/mostrarespecialidadesTotal',{esp:especialidad,valor:valorunidad,fecha1:fechainicioEs,fecha2:fechafinEs});
    });  
    
      
      //res.send(200);
      db.end();
    });  
    });  
    });  
    });  
    });  
    });  
    });  
    });  
    });  
    }); 
    }); 
    });  
    });  
    
       
   
    
    
     
      
     
      
      
      });
      });
     
  },
   iniciomedico : function(req, res, next){
		res.render('reportes/medicos');
	},
  postCrearMedico : function(req, res, next){
    fechainicio=req.body.fechainicio;
    fechafin=req.body.fechafin;
    var medicos=req.body.dropdownmedicos;
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
    var idmedico;
    
    var medico1;
    var medico2;
    var medico3;
    var medico4;
    var medico5;
    var medico6;
    var medico7;
    
    var cantidadM;
    var datosMedico;
    
		db.connect();
    db.query("select * from persona p join medico m on p.id_persona=m.id_persona", function(err, rows, fields){
    if(err) throw err;
    idmedico=rows;
    
    db.query("select count(*) as cantidad from persona p join medico m on p.id_persona=m.id_persona join horario ho on m.id_medico=ho.id_medico join reserva r on ho.id_horario=r.id_horario join historial_clinico hi on r.id_reserva=hi.reserva_id where m.id_persona='" + idmedico[0].id_persona + "' and ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
    if(err) throw err;
    medico1=rows;
    
    db.query("select count(*) as cantidad from persona p join medico m on p.id_persona=m.id_persona join horario ho on m.id_medico=ho.id_medico join reserva r on ho.id_horario=r.id_horario join historial_clinico hi on r.id_reserva=hi.reserva_id where m.id_persona='" + idmedico[1].id_persona + "' and ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
    if(err) throw err;
    medico2=rows;
    
    db.query("select count(*) as cantidad from persona p join medico m on p.id_persona=m.id_persona join horario ho on m.id_medico=ho.id_medico join reserva r on ho.id_horario=r.id_horario join historial_clinico hi on r.id_reserva=hi.reserva_id where m.id_persona='" + idmedico[2].id_persona + "' and ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
    if(err) throw err;
    medico3=rows;
    
    db.query("select count(*) as cantidad from persona p join medico m on p.id_persona=m.id_persona join horario ho on m.id_medico=ho.id_medico join reserva r on ho.id_horario=r.id_horario join historial_clinico hi on r.id_reserva=hi.reserva_id where m.id_persona='" + idmedico[3].id_persona + "' and ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
    if(err) throw err;
    medico4=rows;
   /*
    db.query("select count(*) as cantidad from persona p join medico m on p.id_persona=m.id_persona join horario ho on m.id_medico=ho.id_medico join reserva r on ho.id_horario=r.id_horario join historial_clinico hi on r.id_reserva=hi.reserva_id where m.id_persona='" + idmedico[4].id_persona + "' and r.fecha_confirmada<='" + fechafin + "' and r.fecha_confirmada>='"+fechainicio+"'", function(err, rows, fields){
    if(err) throw err;
    medico5=rows;
   
    db.query("select count(*) as cantidad from persona p join medico m on p.id_persona=m.id_persona join horario ho on m.id_medico=ho.id_medico join reserva r on ho.id_horario=r.id_horario join historial_clinico hi on r.id_reserva=hi.reserva_id where m.id_persona='" + idmedico[5].id_persona + "' and r.fecha_confirmada<='" + fechafin + "' and r.fecha_confirmada>='"+fechainicio+"'", function(err, rows, fields){
    if(err) throw err;
    medico6=rows;
    
    db.query("select count(*) as cantidad from persona p join medico m on p.id_persona=m.id_persona join horario ho on m.id_medico=ho.id_medico join reserva r on ho.id_horario=r.id_horario join historial_clinico hi on r.id_reserva=hi.reserva_id where m.id_persona='" + idmedico[6].id_persona + "' and r.fecha_confirmada<='" + fechafin + "' and r.fecha_confirmada>='"+fechainicio+"'", function(err, rows, fields){
    if(err) throw err;
    medico7=rows;
    });
    });
    });
    });
    
    });
    */
    cantidadM={
      c1:medico1[0].cantidad,
      c2:medico2[0].cantidad,
      
      c3:medico3[0].cantidad,
      c4:medico4[0].cantidad,
      /*
      c5:medico5[0].cantidad,
      c6:medico6[0].cantidad,
      c7:medico7[0].cantidad,
      */
    }
    datosMedico={
      nombre1:idmedico[0].nombre,
      paterno1:idmedico[0].apaterno,
      materno1:idmedico[0].amaterno,
      
      nombre2:idmedico[1].nombre,
      paterno2:idmedico[1].apaterno,
      materno2:idmedico[1].amaterno,
      
      nombre3:idmedico[2].nombre,
      paterno3:idmedico[2].apaterno,
      materno3:idmedico[2].amaterno,
      
      nombre4:idmedico[3].nombre,
      paterno4:idmedico[3].apaterno,
      materno4:idmedico[3].amaterno,
      
      
    }
    res.render('reportes/mostrarmedicos',{cantidadM:cantidadM,datosM:datosMedico,fecha1:fechainicio,fecha2:fechafin});
    });
    db.end();
    });
    });
    });
    });
  },
  iniciotipo : function(req, res, next){
		res.render('reportes/tipo');
	},
  
	postCrearTipo : function(req, res, next){
    fechainicio=req.body.fechainicio;
    fechafin=req.body.fechafin;
    var totalA;
    var cantidadActivo;
    var cantidadPasivo;
    var porcentajeA;
    var porcentajeP;
    var valorTipos;
    var total;
    var config = require('.././database/config');
		var db = mysql.createConnection(config);
    db.connect();
    db.query("select count(*)as cantidadt from persona p join asegurado a on p.id_persona=a.id_persona join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico h on r.id_reserva=h.reserva_id join reserva re on h.reserva_id=re.id_reserva join horario ho on re.id_horario=ho.id_horario where ho.fecha<='" + fechafin + "' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
			if(err) throw err;
      totalA=rows;
    db.query("select count(*) cantidadA from asegurado a join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico hi on r.id_reserva=hi.reserva_id join reserva re on hi.reserva_id=re.id_reserva join horario ho on re.id_horario=ho.id_horario where a.tipo_asegurado='ACTIVO' and ho.fecha<='"+fechafin+"' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
    if(err) throw err;
    cantidadActivo=rows;
    db.query("select count(*) cantidadP from asegurado a join reserva r on a.id_asegurado=r.id_asegurado join historial_clinico hi on r.id_reserva=hi.reserva_id join reserva re on hi.reserva_id=re.id_reserva join horario ho on re.id_horario=ho.id_horario where a.tipo_asegurado='PASIVO' and ho.fecha<='"+fechafin+"' and ho.fecha>='"+fechainicio+"'", function(err, rows, fields){
    if(err) throw err;
    cantidadPasivo=rows;
    porcentajeA=Math.round((cantidadActivo[0].cantidadA*100)/totalA[0].cantidadt);
    porcentajeB=Math.round((cantidadPasivo[0].cantidadP*100)/totalA[0].cantidadt);
    total=totalA[0].cantidadT;
    valorTipos={
      c1:cantidadActivo[0].cantidadA,
      c2:cantidadPasivo[0].cantidadP,
      p1:porcentajeA,
      p2:porcentajeB,
    }
    var total=totalA[0].cantidadT;
    res.render('reportes/mostrartipo',{valor:valorTipos,fecha1:fechainicio,fecha2:fechafin,total:total});
    });
    });
    });
  },
 
}