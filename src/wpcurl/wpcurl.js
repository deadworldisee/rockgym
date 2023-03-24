

import axios from "axios";



 export function senddata  (action ,email,password,username,firstname,lastname)

{

    switch (action)

        {
                case 'newaccount':
                //let messageError='';
                
                

                return new Promise((resolve, reject) => {

                    axios.post('http://rockgym.ro/auth/authentificator.php', {
                    newaccount: 'true',
                    username: username,
                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname
                },
                 {headers:{"Content-Type" : "application/json"}}
                )
                    .then(function (response) {
                        
                       //console.log(response.data);
                      // console.log(response.data.data.params);
                    
                        let  mess={'empty': false};   
                        
                        
                        if(typeof response.data.id == 'number')
                        { mess= {'status':'user created'};    
                       
                         }

                         else 
                        if(response.data.code=='rest_invalid_param')
                       
                        {
                            mess= {'status':'error','data': Object.keys(response.data.data.params).map(key => `${response.data.data.params[key]}`).join("\n\n")};
                            
                            
                       }
                        else 
                        mess= {'status':'error','data': response.data.message};
                      
                       
                       



                              //  console.log(mess);
                        resolve ( mess);
                    })
                    .catch(function (error) {
                        reject(error);
                    });

               
                  
                        
                    })        

                break;

                case 'login':

                    return new Promise((resolve, reject) => {


                            
                        axios.post('http://rockgym.ro/auth/authentificator.php', {
                            login: 'true',
                            'username': email,
                            'password': password
                        },
                         {headers:{"Content-Type" : "application/json"}}
                        ) .then(function (response) {
                            let  mess={'empty': false}; 

                        if(response.data.status=='error')
                       
                        {
                            mess= {'status':'error','data': response.data.error_description};
                            
                            
                        }
                        else
                        {
                            mess= {'status':'signedIn','data': response.data}; 
                        }

                           // console.log(mess);
                               
                            resolve ( mess);

                        }) .catch(function (error) {


                        reject(error);
                    });

                    });


                break;
                case 'requestPass':
                    return new Promise((resolve, reject) => {
                        axios.post('http://rockgym.ro/auth/authentificator.php', {
                            
                        requestPass: email,
                           
                        },
                         {headers:{"Content-Type" : "application/json"}}
                        ) .then(function (response) {
                            resolve ( response);

                        }).catch(function (error) {


                            reject(error);
                        });
                   
                   
                    });
                break;
                case 'sendReqAccess':
                    return new Promise((resolve, reject) => {
                        axios.post('http://rockgym.ro/sala.php', {
                            
                            ReqAccess: email,
                           
                        },
                         {headers:{"Content-Type" : "application/json"}}
                        ) .then(function (response) {

                            
                            resolve ( response);

                        }).catch(function (error) {


                            reject(error);
                        });
                   
                   
                    })
                    case 'sendReqLeave':
                        return new Promise((resolve, reject) => {
                            axios.post('http://rockgym.ro/sala.php', {
                                
                                ReqLeave: email,
                               
                            },
                             {headers:{"Content-Type" : "application/json"}}
                            ) .then(function (response) {
    
                                
                                resolve ( response);
    
                            }).catch(function (error) {
    
    
                                reject(error);
                            });
                       
                       
                        })
               break; 

        }

       

}


export function getAbo(iduser)
{

    return new Promise((resolve, reject) => {


                            
        axios.post('http://rockgym.ro/auth/authentificator.php', {
            requestAbo: iduser ,           
        },
         {headers:{"Content-Type" : "application/json"}}
        ) .then(function (response) {
           
               
            resolve ( response.data);

        }) .catch(function (error) {
            console.log(error);

        reject(error);
    });

    });


};


export function getPoza(iduser)
{

    return new Promise((resolve, reject) => {


                            
        axios.post('http://rockgym.ro/auth/authentificator.php', {
            requestPoza: iduser ,           
        },
         {headers:{"Content-Type" : "application/json"}}
        ) .then(function (response) {
           
             
            resolve ( response.data);

        }) .catch(function (error) {
            console.log(error);

        reject(error);
    });

    });


};


export function getNrClienti()
{
    return new Promise((resolve, reject) => {

    axios.post('http://rockgym.ro/auth/authentificator.php', {
        requestNrClienti: true ,           
    },
     {headers:{"Content-Type" : "application/json"}}
    ) .then(function (response) {
       
         
        resolve ( response.data);

    }) .catch(function (error) {
        console.log(error);

    reject(error);
});

});

}
export function cameraPlay(camera)
{
    return new Promise((resolve, reject) => {

    axios.post('http://rockgym.ro/auth/authentificator.php', {
        cameraPlay: camera ,           
    },
     {headers:{"Content-Type" : "application/json"}}
    ) .then(function (response) {
       
      
              
         
           
        
        resolve ( response.data);

    }) .catch(function (error) {
        console.log(error);

    reject(error);
});

});

}
