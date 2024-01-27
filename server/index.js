const express = require('express')
const app = express()
const PORT =  5000



app.get("/",(req,res) => {
	res.send({
		"msg":"Up and running baby"
	})
})

app.listen(PORT,() => {
	console.log("Listening on port : 5000")
})


