# MiWi - Backend
#### Midwifery Application Prototype
This project is designed as a prototype for a midwifery application. The project is used by the developer to demonstrate and expand on his knowledge/use of TypeScript, GraphQL, Express, Prisma, and Firebase. 

### Contributors
- Lucas Merchant - Software Developer: [github profile](https://github.com/lbmerchant93)
- Jennifer O'Briant - App Concept Creator

### Stack

**Build**: TypeScript, GraphQL, Express, Prisma, Firebase, Apollo-Server-Express, 

**Deployment**: Heroku

## Table of Contents
1. [Introduction](#introduction)
2. [How-To](#using-miwi)
3. [Challenges & Wins](#challenges-&-wins)

## Introduction
Currently the app's main feature is a journal that guides you through the daily activities that will have you ready to rock your birth. 


The App has been deployed using Heroku. To visit, click the link below!
- [https://miwi-backend.herokuapp.com/](https://miwi-backend.herokuapp.com/)


---

## Features

### Prisma:
A TypeScript ORM used to help app read and write data to the database in an intuitive and safe way. Generates resolvers used for querying data. Can create addition resolvers that manipulate the generated CRUD resolvers. 

### PostgreSQL:
An object relational database system. Created with Heroku add on to create database.

### GraphQL:
Language used for querying data.

### Firebase:
Firebase Admin SDK used for authenitication and authorization. Checks the token received from the front end to make sure the user is logged in and only able to manipulate their data. 

### Apollo-Server-Express:
A production-ready, self-documenting GraphQL API that can use data from any source.



[Back to Top of Page](#table-of-contents)

---


### Future Features
- **One:** Additional journal sections including: Fetal Love Break, Self Care, Postpartum Prep, Childbirth Education, and Nourishment. Will need to create new migrations to include these into the journal entry model.
- **Two:** Testing, currently don't have any prior experience in testing backend applications but extremely interested in learning.


[Back to Top of Page](#table-of-contents)
