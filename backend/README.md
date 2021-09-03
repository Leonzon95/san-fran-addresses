### San Francisco Addresses Backend

This is a rails project that searches through addresses with filters and sorting.

## Getting started

* Make to cd into the root directory of this folder 'backend'

```
cd backend
```

* Ruby version

This project uses ruby 2.6.6

```
brew install rvm 
rvm install 2.6.6
rvm use 2.6.6
```

or if you already have it installed, just run: 
```
rvm use 2.6.6
```

* Install al dependencies

```
bundle install
```

* Database creation

Run these commands to create the database and run migrations
```
rails db:create
rails db:migrate
```

* Database initialization

To create Address data run
```
rails db:seed
```

* Start the server (runs on port 3000)

```
rails s
```