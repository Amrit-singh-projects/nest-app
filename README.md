

Its a complete backend project using Restful api.

STEPS:  

1. Clone this repository in your system.
  
## Installation

$ npm install  - for installing all the dependencies
```

## Running the app

# watch mode
$ npm run start:dev

## Go to http://localhost:3000
#Routes
 GET  `/create_user` To create random users based on schema and store in database starting with id = 1;
 GET  `/read_users`  will read all the user objects and populate in the GOOGLE SHEETS in descending order.
 GET  `/delete_user/:id` which will delete user based on id
 POST `/update_user` will update the user field

you can use postman or any other tools for these routes.
 




