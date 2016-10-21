var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././middleware/auth');

router.get('/', controllers.HomeController.inicio);
router.get('/login', controllers.HomeController.index);

//routas de usuario
router.get('/auth/signup', controllers.UserController.getSignUp);
router.post('/auth/signup', controllers.UserController.postSignUp);
router.get('/auth/signin', controllers.UserController.getSignIn);
router.post('/auth/signin',  passport.authenticate('local', {
  successRedirect : '/users/panel',
  failureRedirect : '/auth/signin',
  failureFlash : true 
 }));
router.get('/auth/logout', controllers.UserController.logout);
router.get('/users/panel', AuthMiddleware.isLogged ,controllers.UserController.getUserPanel);

// rutas para los index
router.post('/auth/signin1',  passport.authenticate('local', {
  successRedirect : '/indexcargo',
  failureRedirect : '/auth/signin',
  failureFlash : true 
 }));
router.get('/indexcargo', AuthMiddleware.isLogged,controllers.cargoscontroller.indexcar);
router.get('/indexpersona',AuthMiddleware.isLogged,controllers.personascontroller.indexper);
router.get('/indexempleado',AuthMiddleware.isLogged,controllers.empleadocontroller.indexemp);
router.get('/indexusuario',AuthMiddleware.isLogged,controllers.usuariocontroller.indexuser); 
router.get('/indexespecialidad',AuthMiddleware.isLogged,controllers.especialidadcontroller.indexesp);
router.get('/indexmedico',controllers.medicoscontroller.indexmed);
router.get('/indexpaciente',controllers.pacientescontroller.indexpaciente);
router.get('/indexreportetabla',controllers.reportescontroller.indexreportetabla);
router.get('/indexreportegrafico',controllers.reportescontroller.indexreportegrafico);
router.get('/indexantecedente', AuthMiddleware.isLogged,controllers.antecedentescontroller.indexant);
// rutas para personas
router.get('/verpersona',AuthMiddleware.isLogged,controllers.personascontroller.getPersonas);
router.get('/nuevapersona',AuthMiddleware.isLogged,controllers.personascontroller.getNuevaPersona);
router.post('/crearpersona',AuthMiddleware.isLogged, controllers.personascontroller.postNuevaPersona);
router.post('/eliminarpersona',AuthMiddleware.isLogged,controllers.personascontroller.eliminarPersona);
router.get('/modificarpersona/:id_persona',AuthMiddleware.isLogged, controllers.personascontroller.getModificarPersona);
router.post('/editarpersona',AuthMiddleware.isLogged, controllers.personascontroller.postModificarPersona);
// rutas para cargos
router.get('/vercargo',AuthMiddleware.isLogged,controllers.cargoscontroller.getCargos);
router.get('/nuevocargo',AuthMiddleware.isLogged,controllers.cargoscontroller.getNuevoCargo);
router.post('/crearcargo',AuthMiddleware.isLogged, controllers.cargoscontroller.postNuevoCargo);
router.post('/eliminarcargo',AuthMiddleware.isLogged,controllers.cargoscontroller.eliminarCargo);
router.get('/modificar/:id_cargo',AuthMiddleware.isLogged, controllers.cargoscontroller.getModificarCargo);
router.post('/editar',AuthMiddleware.isLogged, controllers.cargoscontroller.postModificarCargo);
// rutas empleados
router.get('/nuevoempleado',AuthMiddleware.isLogged,controllers.empleadocontroller.getNuevoEmpleado);
router.post('/crearempleado',AuthMiddleware.isLogged, controllers.empleadocontroller.postNuevoEmpleado);
router.get('/verempleado',AuthMiddleware.isLogged,controllers.empleadocontroller.getEmpleados);
router.get('/modificarempleado/:id_empleado',AuthMiddleware.isLogged,controllers.empleadocontroller.getModficarEmpleado);
router.post('/editarempleado',AuthMiddleware.isLogged,controllers.empleadocontroller.postModficarEmpleado);
router.post('/eliminarempleado',AuthMiddleware.isLogged,controllers.empleadocontroller.eliminarEmpleado);
router.get('/cargarCargos',AuthMiddleware.isLogged,controllers.empleadocontroller.cargarCargos);
router.get('/cargarMatriculaEmpleado',AuthMiddleware.isLogged,controllers.empleadocontroller.cargarMatriculaEmpleado);
// rutas usuarios
router.get('/verusuario',AuthMiddleware.isLogged,controllers.usuariocontroller.getUsuario);
router.get('/nuevousuario',AuthMiddleware.isLogged,controllers.usuariocontroller.getNuevoUsuario);
router.post('/crearusuario',AuthMiddleware.isLogged, controllers.usuariocontroller.postNuevoUsuario);
router.post('/eliminarusuario',AuthMiddleware.isLogged,controllers.usuariocontroller.eliminarUsuario);
router.get('/cargarMatriculaUsuario',AuthMiddleware.isLogged,controllers.usuariocontroller.cargarMatriculaUsuario);
// rutas para especialidades
router.get('/verespecialidad',AuthMiddleware.isLogged,controllers.especialidadcontroller.getEspecialidad);
router.get('/nuevaespecialidad',AuthMiddleware.isLogged,controllers.especialidadcontroller.getNuevaEspecialidad);
router.post('/crearespecialidad', controllers.especialidadcontroller.postNuevaEspecialidad);
router.post('/eliminarespecialidad',AuthMiddleware.isLogged,controllers.especialidadcontroller.eliminarEspecialidad);
router.get('/modificarespecialidad/:id_especialidad',AuthMiddleware.isLogged, controllers.especialidadcontroller.getModificarEspecialidad);
router.post('/editarespecialidad',AuthMiddleware.isLogged, controllers.especialidadcontroller.postModificarEspecialidad);
// rutas medicos
router.get('/vermedico',controllers.medicoscontroller.getMedicos);
router.get('/modificarmedico/:id_medico', controllers.medicoscontroller.getModficarMedico);
router.post('/editarmedico', controllers.medicoscontroller.postModficarMedico);
router.get('/cargarEspecialidad',controllers.medicoscontroller.cargarEspecialidad);
router.get('/nuevomedico',controllers.medicoscontroller.getNuevoMedico);
router.post('/crearmedico', controllers.medicoscontroller.postNuevoMedico);
router.post('/eliminarmedico',controllers.medicoscontroller.eliminarMedico);
router.get('/cargarMatricula',controllers.medicoscontroller.cargarMatricula);
// rutas pecientes
router.get('/verpaciente',controllers.pacientescontroller.getPacientes);
router.get('/nuevopaciente',controllers.pacientescontroller.getNuevoPacientes);
router.post('/crearpaciente', controllers.pacientescontroller.postNuevoPacientes);
router.get('/modificarpaciente/:id_asegurado', controllers.pacientescontroller.getModificarPaciente);
router.post('/editarpaciente', controllers.pacientescontroller.postModificarPaciente);
router.post('/eliminarpaciente',controllers.pacientescontroller.eliminarPaciente);
router.get('/cargarMatriculaPaciente',controllers.pacientescontroller.cargarMatriculaPaciente);
// rutas historial
router.get('/verificar',controllers.historiascontroller.inicio);
router.post('/iniciohistoria',controllers.historiascontroller.postInicioHistoria);
router.get('/iniciohistoria1',controllers.historiascontroller.postInicioHistoria1);
router.get('/nuevohistoria/:matricula',controllers.historiascontroller.getNuevoHistoria);
router.get('/nuevohistoria1',controllers.historiascontroller.getNuevoHistoria1);
router.post('/registrarhistorial', controllers.historiascontroller.postRegistrarHistoria);
router.get('/registrarhistorial1', controllers.historiascontroller.postRegistrarHistoria1);
router.get('/verhistorial', controllers.historiascontroller.getVerHistoria);
router.get('/Mirarhistorial/:id', controllers.historiascontroller.getMirarHistorial);
//router.post('/clasificador',controllers.historiascontroller.postVerdiagnosticar);
router.post('/clasificador',controllers.historiascontroller.postVerdiagnosticar1);
// rutas reportes

router.get('/inicioedad',controllers.reportescontroller.inicioedades);
router.post('/crearedad',controllers.reportescontroller.postCrearEdades);
router.get('/inicioespecialidad',controllers.reportescontroller.inicioespecialidad);
router.post('/reespecialidad',controllers.reportescontroller.postCrearEspecialidades);
router.get('/inicioespecialidadT',controllers.reportescontroller.inicioespecialidadTotal);
router.post('/reespecialidadT',controllers.reportescontroller.postCrearEspecialidadesTotal);
router.get('/iniciofuerza',controllers.reportescontroller.iniciofuerza);
router.post('/crearfuerza',controllers.reportescontroller.postCrearFuerza);
router.get('/iniciomedico',controllers.reportescontroller.iniciomedico);
router.post('/crearmedicototal',controllers.reportescontroller.postCrearMedico);
router.get('/iniciotipo',controllers.reportescontroller.iniciotipo);
router.post('/creartipo',controllers.reportescontroller.postCrearTipo);
// rutas para antecedentes
//router.get('/vercargo',AuthMiddleware.isLogged,controllers.cargoscontroller.getCargos);
router.get('/nuevoantecedente',AuthMiddleware.isLogged,controllers.antecedentescontroller.getNuevoAntecedente);
router.post('/crearantecedente', controllers.antecedentescontroller.postCrearAntecedente);
router.get('/iniciobuscar', controllers.antecedentescontroller.getBuscarAntecedente);
router.post('/verAntecedente', controllers.antecedentescontroller.postBuscarAntecedente);
/*router.post('/eliminarcargo',AuthMiddleware.isLogged,controllers.cargoscontroller.eliminarCargo);
router.get('/modificar/:id_cargo',AuthMiddleware.isLogged, controllers.cargoscontroller.getModificarCargo);
router.post('/editar',AuthMiddleware.isLogged, controllers.cargoscontroller.postModificarCargo);*/
module.exports = router;
