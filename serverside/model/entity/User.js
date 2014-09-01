
function User(CFC, License){
	return {

		name	 : String,
		username : String,
		cpf		 : String,
		birth 	 : Date,
		id 		 : Number,
		password : String,
		cfc		 : CFC,
		license	 : License

	};
};

var User = ;

module.exports = User;