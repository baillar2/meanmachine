//requirements\\
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var logger = require('morgan')
var controller = require('./controller/controller.js')

//create app\\
var app = express()
mongoose.connect('mongodb://localhost/pairinDB')

//app config\\
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))
app.use(express.static(__dirname + '/public'))

//routes\\

app.get('/', function(req, res){
	res.sendFile('/index.html', {root: './public'})
})

app.get('/api/getItems', function(req, res){
	console.log('getting ingredient list')
	controller.getItems(req, res)
})

app.post('/api/newItem', function(req, res){
	console.log('ingredient submission fired', req.body)
	controller.newItem(req, res)
})
//listen\\
var port = 3000
app.listen(port, function(){
	console.log('server is running on port ' + port)
})
