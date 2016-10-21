var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new LocalStrategy({
		passReqToCallback : true
	}, function(req, nombre, password, done,res,next){

		var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();
    console.log('el email es',nombre);
		//db.query('SELECT * FROM users WHERE nombre = ?', nombre, function(err, rows, fields){
    db.query('select c.nombre,u.id_usuario,u.nombreusuario,u.contrasenausuario from usuario u join empleado e on u.empleado_id_empleado=e.id_empleado join cargo c on e.cargo_id=c.id where u.nombreusuario= ?', nombre, function(err, rows, fields){
			if(err) throw err;

			db.end();
    
			if(rows.length > 0){

				var user = rows[0];
        /*
				if(bcrypt.compareSync(password, user.password)){
					return done(null, {
						id: user.id, 
						nombre : user.nombre,
						email : user.email,
            cargo  : user.cargo
					});
          
				}*/
        console.log('passoword es',password);
        console.log('contraseña es ',user.contrasenausuario);
        if(bcrypt.compareSync(password, user.contrasenausuario)){
          console.log('si entro');
					return done(null, {
						id: user.id_usuario, 
						nombre : user.nombreusuario,
						cargo  : user.nombre
					});
          
				}
			}

			return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));
      //return done(null, false, req.flash('home',{info : 'Email o Password incorrecto'}));
      
      

		});

	}
	));

};