import {Router, Request, Response} from 'express';
import  Server  from '../classes/server';


export var router = Router();

router.get('/mensajes',(req:Request,res:Response)=>{
    res.status(200).send(
        {
            ok:true,
            mensaje: "Mensaje correcto"
        });

        
});

router.post('/mensajes',(req:Request,res:Response)=>{
    var entrada = req.body.entrada;
    var de = req.body.de;

    const payload = {
        de: de,
        entrada: entrada
    }

    const server = Server.instance;
    server.io.emit('mensaje-servidor',payload);

    res.status(200).send(
        {
            ok:true,
            mensaje: "Mensaje correcto",
            entrada: entrada,
        });
});
router.post('/mensajes/:id',(req:Request,res:Response)=>{
    var entrada = req.body.entrada;
    var de = req.body.de;
    var id = req.params.id;

    const payload = {
        de,
        cuerpo: entrada
    }

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado',payload);

    res.status(200).send(
        {
            ok:true,
            mensaje: "Mensaje correcto",
            entrada: entrada,
            id:id
        });
});

router.get('/usuarios',(req:Request,res:Response)=>{
    const server = Server.instance;
    //clients => retorna el arreglo de sockets conectados
    // []string
    server.io.clients((err:any,clientes:string[])=>{
        if(err){
            return res.status(505).send({
                ok:false,
                err
            });
        }else{
            return res.status(200).send({
                ok:true,
                clientes
            });
        }
    });
});

