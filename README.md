# :stew: Easy Recipes

## Description
Easy Recipes is a simple application for creating and saving new cooking recipes.
* Can create new recipes 
* Can edit current recipes
* Can delete current recipes
* Can see the list of current recipes


## Features
* Written in Java and Spring Boot for back-end, React JS for front-end
* Java 11
* Spring Boot 2.4.3
* Hibernate 5.4.28
* PostgreSQL 13.1
* React 17.0.1


### Installation

* Clone the repository
```
git clone https://github.com/myllinhtran/springboot-react-easy-recipe.git
```

* Create React app & start the react app in [localhost](http://localhost:3000)
```
npm create-react-app app-name
cd app-name
npm start
```

* Set up the database
    * You can use PostgreSQL, MySQL or whatever you prefer. 
    * Please change the datasource in the ``` application.properties ``` file. 
    * PostgreSQL configuration with ``` psql ```
        ```
            createdb my-database
            psql -d my-database
        ```
    
    * [Reference to Postgres Official Docs](https://www.postgresql.org/docs)

* Run the app in [localhost](http://localhost:8080)

* Deploy to Heroku
    * [Create a Heroku user account](https://signup.heroku.com/devcenter)
    * [Install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
    * Sign in to Heroku account 
        ``` 
            heroku login 
        ```
    * Initialize and commit your code to git
        ```
            cd springboot-react-easy-recipe
            git init
            git add .
            git commit -m "Initial commit"
        ```
    * Deploy the app to Heroku
        ```      
            cd springboot-react-easy-recipe
            heroku create
            git push heroku master
        ```
    * Visit the app in browser
        ```
            heroku open
        ```

### Project status
* On progress
