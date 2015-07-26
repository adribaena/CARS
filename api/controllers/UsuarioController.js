/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function (req, res, next) {
		var params = req.params.all();
	    Usuario.create(params ,function (err, user) {
	        if ( err ) {
	            return next(err);
	        }
	        else {
	            return res.redirect('/');
	        }       
	    });
	}
}    
