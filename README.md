# emp-backend

 radionoise_backend

# rest api

* Common Response

    HTTP 200: Success
    
    HTTP 400: Params Missing
    
    HTTP 401: Bad Request
    
    HTTP 404: not found
  
    HTTP 500: DB error
 
* POST /auth/signup

> Param

    id : user id [String]
    
    passwd : user passwd [String]
    
    name : user name [String]

>  Response

    HTTP 200 : user

    HTTP 400 : param missing or null or already exist
    
    HTTP 500 : server err
    
* POST /auth/signin

> Param

    id : user id [String]
    
    passwd : user passwd [String]

>  Response

    HTTP 200 : user name and user token

    HTTP 400 : param missing or null or already exist
    
    HTTP 500 : server err
    
     
* GET /auth/auto/{token}

> Param

    token : user token [String]

>  Response

    HTTP 200 : user

    HTTP 400 : param missing or null

    HTTP 404 : user not found (incorrect token)
    
* GET /auth/github/token

> Param

    access_token : github user token [String]

>  Response

    HTTP 200 : user

    HTTP 404 : user not found (incorrect token)
    
    HTTP 500 : DB err
    
* GET /auth/fb/token

> Param

    access_token : facebook user token [String]

>  Response

    HTTP 200 : user

    HTTP 404 : user not found (incorrect token)
    
    HTTP 500 : DB err
    
* GET /auth/tw/token

> Param

    oauth_token : twitter user token [String]
    
    oauth_token_secret : twitter user token secret [string]
    
    user_id:  twitter user id [string[]]

>  Response

    HTTP 200 : user

    HTTP 404 : user not found (incorrect token)
    
    HTTP 500 : DB err[]
    
* GET /user

> Param

    No param

>  Response

    HTTP 200 : all user
    
* GET /user/{id}

> Param

    id : user id [String]

>  Response

    HTTP 200 : user

    HTTP 400 : param missing or null

    HTTP 404 : user not found (incorrect token)
    
* GET /user/{token}/github/token

> Param

    token : user token [String]
    
    access_token: github aceess_token [String]

>  Response

    HTTP 200 : ok

    HTTP 400 : param missing or null

    HTTP 404 : user not found (incorrect token)
    
* GET /user/{token}/tw/token

> Param

    token : user token [String]

    oauth_token : twitter user token [String]
    
    oauth_token_secret : twitter user token secret [string]
    
    user_id:  twitter user id [string]
    
* GET /user/{token}/fb/token

> Param

    token : user token [String]
    
    access_token: github aceess_token [String]

>  Response

    HTTP 200 : ok

    HTTP 400 : param missing or null

    HTTP 404 : user not found (incorrect token)
    
* GET /setting/{token}

> Param

    token : user token [String]

>  Response

    HTTP 200 : setting string

    HTTP 400 : param missing or null

    HTTP 404 : user not found (incorrect token)
    
    
* POST /setting

> Param

    token : user token [String]
    
    setting: user setting [String]

>  Response

    HTTP 200 : sucess

    HTTP 400 : param missing or null

    HTTP 404 : user not found (incorrect token)

# radionoise_socket api

* make : make message group

> Param

    token : User token [String]
    
    chat_people: User and someone who chat with Users [String Array]
    
> return emit make

    room_token: maked room token

> u must make socket.on(make)
