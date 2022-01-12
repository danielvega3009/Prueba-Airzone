const express = require('express')
const app = express()
const port = 3000
const conexionDB = require("./db.conexion")
const request = require("request");
const NodeCache = require( "node-cache" );
var mongo = require('mongodb').MongoClient;
//var monk = require('monk');
var url = "mongodb://localhost:27017/";
const myCache = new NodeCache();
app.use( express.json())


//conexion a la BBDD
conexionDB();

//token:1512c64803d2ce535e4c80ed7a8110aa
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
var token = "1512c64803d2ce535e4c80ed7a8110aa";

app.get('/clima/:lat/:lon',(req,res) =>{
    
    var lat = req.params.lat;
    var lon = req.params.lon;
    var ubicacion = { lat: lat , lon: lon };
    var fecha= new Date();
    var hora_actual = fecha.getHours()+":"+fecha.getMinutes(); 
    
    var key = "keylat="+req.params.lat+"&lon="+req.params.lon;
    console.log(key);
    
    //comprobamos si está en la caché dicha clave
    let cachedBody = myCache.get(key);

    //si existe en caché la sacamos por pantalla
    if (cachedBody){
        console.log("existe en caché");
        res.json(cachedBody)
        return
    }else{//sino existe en caché llamamos a la api y guardamos en mongodb y en caché
        request("https://api.openweathermap.org/data/2.5/onecall?lat="+req.params.lat+"&lon="+req.params.lon+"&exclude=current,minutely,alerts&appid=" + token,(err,response,body)=>{
            if (!err){
                var clima = JSON.parse(body);
                //esquema objeto que vamos a insertar en mongodb
                var objeto = {
                    ubicacion : ubicacion,
                    clima : clima,
                    hora : hora_actual
                }
                mongo.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("UbicacionesDB");
                    dbo.collection("UbicacionesList").insertOne(objeto, function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        db.close();
                    });
                });
                //mostramos por pantalla el objeto
                res.json(objeto);
                //guardamos en caché
                success = myCache.set( key, objeto, 3600*100 );//3h
                value = myCache.get( key );
                if ( value == undefined ){
                    // handle miss!
                } else{
                    console.log(value);
                }
            } 
        });       
    }                   
})

app.get('/clima/:hora',(req,res) =>{
    var hora = req.params.hora;
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("UbicacionesDB");
        //buscamos en la bbdd por hora
        dbo.collection("UbicacionesList").find({hora: hora}).toArray((err,datos)=>{
            if(err){
                console.log(err);
            }else {//si existe en la bbdd mostramos solo el primer objeto clima con su sección hourly
                res.send(datos[0].clima.hourly);
            }
        }); 
    });
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})