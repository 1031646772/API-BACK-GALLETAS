const { query } = require('express');
const database=require('../config/database')
const mysql2=require ('mysql2');

function Ingresar(req, res){
    const {User, Contrasena}=req.body
    try{
        const Squery=`select * from User where Email='${User}' and Contrasena='${Contrasena}';`;
        const Exquery=mysql2.format(Squery)
        database.query(Exquery, (err, result)=>{
            if (err) throw err
            else{
                if (result[0] !==undefined){
                    res.json({message:"Usuario encontrado"});
                }
                else{
                    res.json({message:"Usuario no encontrado"})
                }
            }
        })
    }
    catch(err){
        console.log("Error al ejecutar query", err)
    }
}

function GenerarTokenIniciosesion(req, res){
    try{
        const {Usuario}=req.body
        console.log(Usuario)
        const Squery=`select Id_user,Nombre,Email,Contrasena from User where Email='${Usuario}';`
        const Exquery=mysql2.format(Squery)
        database.query(Exquery,(err,result)=>{
            console.log(result)
            if (result && result [0] !=undefined && result[0]!=null){
                crearToken(result[0])
                if(objeto.Token !=0 && objeto.Token.toString().length==6){
                    res.json({message:"Se obtuvo el token correctamente"})
                }
                else{
                    res.json({message:"El token probablemente no se genero"})
                    }
            }
            else{
                console.log("los datos de la consulta pueden estar vacios")
            }
        })
    }
    catch(err){
        console.log("hubo un error en el proceso de la solicitud fetch", err)
    }

}

function crearToken(datosUsuario){
    let token = Math.floor(Math.random() * 900000) + 100000;
    const fechaActual = new Date();

    // Obtiene los componentes de la fecha y la hora
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const day = String(fechaActual.getDate()).padStart(2, '0');
    const hours = String(fechaActual.getHours()).padStart(2, '0');
    const minutes = String(fechaActual.getMinutes()).padStart(2, '0');
    const seconds = String(fechaActual.getSeconds()).padStart(2, '0');
    
    // Construye la fecha y hora en formato "YYYY-MM-DD HH:MM:SS"
    const fechaHoraFormateada = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    let objeto={
        Id:datosUsuario.Id_user,
        Nombre:datosUsuario.Nombre,
        Email:datosUsuario.Email,
        Contrasena:datosUsuario.Contrasena,
        Token:token,
        Fecha_Conexion:fechaHoraFormateada
    }
    try{
        const Squery=`
        insert into TokenUser (Nombre, Email, Contrasena,Token, Fecha_Conexion, Fecha_Desconexion,UserId) values 
        (${objeto.Nombre},${objeto.Email},${objeto.Contrasena},${objeto.Token},${objeto.Fecha_Conexion},'',${objeto.Id});`
         const Exquery= mysql2.format(Squery)
         database.query(Exquery, (err, result)=>{
           if (err) throw err
           else{
             res.json({message:"Se obtuvo el token correctamente"})
           }
         })
   }
   catch(Err){
        console.log("No se pudo ejecutar query", Err)
   }
}

function TraerToken(req, res){
    const {confirmacion}=req.body
    try{
        console.log(confirmacion)
        const fechaActual=new Date()
        const dia=String(fechaActual.getDate()).padStart(2, '0');
        const año=fechaActual.getFullYear();
        if (confirmacion==true){
            const Squery=`select * from TokenUser where Email='Juliperalta1306@gmail.com' and Contrasena='JulianPeralta123' and UserId=1 and year (Fecha_Conexion)=${año} and day(Fecha_Conexion)=${dia};`;
            const Exquery=mysql2.format(Squery)
            database.query(Exquery, (err, result)=>{
                if (err) throw err
                else{
                    if (result[0] !==undefined){
                        res.json({message:result[0]});
                    }
                    else{
                        res.json({message:"Usuario no encontrado"})
                    }
                }
            })
        }
        else{
            res.json({message:"La confirmacion esta fallando"})
        }
    }
    catch(err){
        console.log("Algo paso al enviar el token", err)
    }
}

function cerrarSesion(req,res){
    const {confirm}=req.body;
    try{
        if (confirm==true){
            const fechaActual = new Date();

            // Obtiene los componentes de la fecha y la hora
            const year = fechaActual.getFullYear();
            const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
            const day = String(fechaActual.getDate()).padStart(2, '0');
            const hours = String(fechaActual.getHours()).padStart(2, '0');
            const minutes = String(fechaActual.getMinutes()).padStart(2, '0');
            const seconds = String(fechaActual.getSeconds()).padStart(2, '0');
            
            // Construye la fecha y hora en formato "YYYY-MM-DD HH:MM:SS"
            const fechaHoraFormateada = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const Squery=`
            update TokenUser set Fecha_Desconexion=${fechaHoraFormateada} where UserId=1  order by Fecha_Conexion Desc limit 1;`
             const Exquery= mysql2.format(Squery)
             database.query(Exquery, (err, result)=>{
            if (err) throw err
               else{
                 res.json({message:"Se borro el token"})
               }
             })
        }
        else{
            res.json({message:"Algo fallo al limpiar el usuario"})
        }
    }
    catch(err){
        console.log("Algo fallo al limpiar el objeto token del usuario", err);    
    }
}


module.exports={
    Ingresar,
    GenerarTokenIniciosesion,
    TraerToken,
    cerrarSesion
}



