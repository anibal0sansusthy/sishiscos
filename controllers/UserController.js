var mysql = require('mysql');
var bcrypt = require('bcryptjs');

module.exports = {

	getSignUp : function(req, res, next){
		return res.render('users/signup');
	},

	postSignUp: function(req, res, next){
		
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(req.body.password, salt);
    console.log('el passs es',req.body.password);
    console.log('passs guardadr',password);
		var user = {
			
			nombreusuario : req.body.nombreusuario,
			contrasenausuario : password,
      empleado_id: req.body.dropdownmatricula,
		};

		var config = require('.././database/config');

		var db = mysql.createConnection(config);

		db.connect();

		db.query('INSERT INTO usuario SET ?', user, function(err, rows, fields){
			if(err) throw err;

			db.end();
		});
		req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion');
		return res.redirect('/auth/signin');
	},

	getSignIn: function(req, res, next){
		return res.render('home', {message: req.flash('info'), authmessage : req.flash('authmessage')});
	},

	logout : function(req, res, next){
		req.logout();
		res.redirect('/login');
	},

	getUserPanel : function(req, res, next){
    var aut=req.user;
    var car=aut.cargo;
    console.log('cargo es ',car)
    switch(car){
      case 'ADMINISTRADOR':
        
        res.render('index', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user });
        
        
      break;
      case 'MEDICO':
        console.log('ingreso medico');
        res.render('indexadmihistorias', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user });
      break;
      case 'BIOESTADISTICO':
        res.render('indexadmipacientes', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user });
      break;
      case 'PROCESAMIENTO':
        res.render('indexreporte', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user });
      break;
    }
    
    
    
		
		
	},

 

};