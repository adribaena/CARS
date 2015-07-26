module.exports = {
		random: function(){
			var crypto = require("crypto");
			return crypto.randomBytes(10).toString('hex');
		}
}