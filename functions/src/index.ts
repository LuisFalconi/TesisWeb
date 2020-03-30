import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'; 
import * as cors from 'cors'; 


admin.initializeApp();

const corsHandler = cors({ origin: true});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    console.log("depurando")
 response.send("Hola mundo desde Cloud Funtions!");

});

export const byeWorld = functions.https.onRequest((request, response) => {
    console.log("cerrando")
    response.send("Adios mundo desde Cloud Funtions!");
   
});

export const prueba = functions.https.onRequest((req, res) => {
    corsHandler(req, res, () =>{
        let requestUid = req.body.uid;
        let authToken = validarCabecera(req);
        
        if(!authToken){
            return res.status(401).send('{"mensaje" : "prohibido" }');
        }
        return decodificarToken(authToken)
        .then(uid =>{
            console.log('UID' + uid);
            if(uid === requestUid){
                return res.status(200).send('{"mensaje" : "exito" }');
            }else{
                return res.status(403).send('{"mensaje" : "prohibido" }');

            }       
        });
    });
});
 
   function validarCabecera(req: any){
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        return req.headers.authorization.split('Bearer ')[1]
    }
   }

   function decodificarToken(authToken: any){
        return admin.auth().verifyIdToken(authToken)
        .then(tokenDecodificado =>{
            return tokenDecodificado.uid;
        });
    }
/*   
// funcion para eliminar la foto del storage
export const removerFoto = functions.firestore
   .document('plato/{id}')
   // snap: El momento actual de como se encuentra la coleccion, context: la peticion que sse esta haciendo
   .onDelete((snap, context) => {
       const id = context.params.id;  // capturar el id que quiere eliminar en ese momento
       console.log('IDSTORGE: ' + id); // mensaje que va aparecer en el cloud funtions
        const storage = admin.storage(); // enlazar con firestorage 
        const bucket = storage.bucket(); // Quiero tener la referencia al repositorio completo de Storege 
        const file = bucket.file(`plato/${id}`); // el archivo que quiero eliminar esta en esta ubicacion 

        return file.delete();
   });*/