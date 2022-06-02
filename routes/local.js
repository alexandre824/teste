var express = require('express')
var app = express()

// Mostrar lista de instituicoes
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM resenha ORDER BY id DESC',function(err, rows, fields) {
			//redirecionamento
			if (err) {
				req.flash('error', err)
				res.render('user/list', {
					title: 'Lista de filmes', 
					data: ''
				})
			} else {
				// rendirecionamento
				res.render('user/list', {
					title: 'Lista de filmes', 
					data: rows
				})
			}
		})
	})
})

// Adcionar novo local
app.get('/add', function(req, res, next){	
	
	res.render('user/add', {
		title: 'Adicionar filme',
		nome: '',
		texto: '',
		ano: '',
		urlimagem: '',		
	})
})

//Editar dados
app.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM instituicoes WHERE id = ?', [req.params.id], function(err, rows, fields) {
			if(err) throw err
			
			// ID não encontrado
			if (rows.length <= 0) {
				req.flash('erro', 'ID não localizado = ' + req.params.id)
				res.redirect('/local')
			}
			else {
				// Redirecionamento para pagina de edição
				res.render('user/edit', {
					title: 'Editar local', 
					id: rows[0].id,
					nome: rows[0].nome,
					rua: rows[0].rua,
					bairro: rows[0].bairro,
					cidade: rows[0].cidade,
					data_de_inauguracao: rows[0].data_de_inauguracao,
					timestamp: rows[0].timestamp	
				})
			}			
		})
	})
})

// Editar validação dos dados erro!
app.put('/edit/(:id)', function(req, res, next) {
	req.assert('nome', 'nome is required').notEmpty()           
	req.assert('rua', 'rua is required').notEmpty()             
    req.assert('bairro', 'bairro is required').notEmpty()  
		req.assert('cidade', 'cidade is required').notEmpty()
		req.assert('data_de_inauguracao', 'data_de_inauguracao is required').notEmpty()
		req.assert('timestamp', 'timestamp is required').notEmpty()

    var errors = req.validationErrors()
    
    if( !errors ) {   
		var user = {
			nome: req.sanitize('nome').escape().trim(),
			rua: req.sanitize('rua').escape().trim(),
			bairro: req.sanitize('bairro').escape().trim(),
			cidade: req.sanitize('cidade').escape().trim(),
			data_de_inauguracao: req.sanitize('data_de_inauguracao').escape().trim(),
			timestamp: req.sanitize('timestamp').escape().trim()

		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE instituicoes SET ? WHERE id = ' + req.params.id, user, function(err, result) {
				//Redirecionamento para pagina de edição sem erro
				if (err) {
					req.flash('error', err)
					
					//Redirecionamento para editar
					res.render('user/edit', {
						title: 'Editar local',
						id: req.params.id,
						nome: req.body.nome,
						rua: req.body.rua,
						bairro: req.body.bairro,
						cidade: req.body.cidade,
						data_de_inauguracao: req.body.data_de_inauguracao,
						timestamp: req.body.timestamp
					})
				} else {
					req.flash('Local editado com sucesso!')
					
					//Redirecionamento para editar
					res.render('user/edit', {
						title: 'Editar local',
						id: req.params.id,
						nome: req.body.nome,
						rua: req.body.rua,
						bairro: req.body.bairro,
						cidade: req.body.cidade,
						data_de_inauguracao: req.body.data_de_inauguracao,
						timestamp: req.body.timestamp
					})
				}
			})
		})
	}
	else {   //msg erro
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
		 
        res.render('user/edit', { 
            title: 'Editar local',            
			id: req.params.id, 
			nome: req.body.nome,
			rua: req.body.rua,
			bairro: req.body.bairro,
			cidade: req.body.cidade,
			data_de_inauguracao: req.body.data_de_inauguracao,
			timestamp: req.body.timestamp
        })
    }
})

//Deletar local
app.delete('/delete/(:id)', function(req, res, next) {
	var user = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM instituicoes WHERE id = ' + req.params.id, user, function(err, result) {
			
			if (err) {
				req.flash('error', err)
				res.redirect('/local')
			} else {
				req.flash('Local deletado com sucesso! id = ' + req.params.id)
				// Redirecionamento para pagina inicial
				res.redirect('/local')
			}
		})
	})
})

module.exports = app
