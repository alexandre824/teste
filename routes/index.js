var express = require('express')
var app = express()

app.get('/', function(req, res) {
	//Redirecionamento para a pagina princial
	res.render('index', {title: ''})
})


module.exports = app;
