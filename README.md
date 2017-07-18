# lock-backend

 lock_backend

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


* GET /lock/{token}

> Param

  token: user token [String]

  >  Response

      HTTP 200 : is lock ?

      HTTP 403 : 잠김

      HTTP 500 : DB err


* POST /lock

> Param

  token: user token [String]
