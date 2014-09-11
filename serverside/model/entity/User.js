
function User(CFC, License){
	return {

		name	 : String,
		email	 : String,
		username : String,
		cpf		 : String,
		birth 	 : Date,
		id 		 : Number,
		password : String,
		cfc		 : [CFC],
		license	 : [License]

	};
};

module.exports = User;