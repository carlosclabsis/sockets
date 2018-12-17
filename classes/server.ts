//importando libreria express
import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import http from 'http';
import socketIO from 'socket.io';
import { disconnect } from 'cluster';
//creando la clase del servidor
export default class Server{
    //creando la variable del servidor express
    public app:express.Application;
    public port:Number;
    private httpServer:http.Server;
    public io:socketIO.Server;
    //constructor del Server
    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        //Configuando el nuevo servidor web a traves de http
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSocket();
    }
    //funcion para escuchar las conexiones 
    public escucharSocket()
    {
        console.log("Listo para recibir conexiones o sockets o clientes");
        // el servidor escucha el evento connect y recibe al cliente conectado
        this.io.on('connect',cliente=>{
            console.log("Nuevo cliente conectado");
            // el cliente que se ha conectado previamente, escucha su desconexion
            cliente.on('disconnect',()=>{
                console.log("El cliente se ha desconectado")
            });
            // el cliente que se ha conectado previamente, escucha un evento de nombre: mensaje
            cliente.on('mensaje',(contenido)=>{
                console.log("entrada" + contenido);
                this.io.emit('mensaje-nuevo', contenido);
            });
        });
    }    
    //funcion para iniciar el servidor
    public start(callback:Function){
        this.httpServer.listen(this.port,callback);
    }
}
