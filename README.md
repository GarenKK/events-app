# Events App #

A web app where users can create events and join events created by others.

* for testing purposes this app is hosted on a aws ec2 server and can be viewed [here](http://3.17.160.138:8081/)
* for testing purposes use 1 of the following predefined users to access the app:

username | password
-------- | --------
user | user
user1 | user
user2 | user
garen | garen

### Contents of Repo ###

* Frontend built with vue.js
* Backend built with node.js
* Database using couchdb

### Setup ###

##### prerequisites #####

* npm v5.6.0 or higher
* node v8.9.4 or higher
* couchdb (pre-v2) v1.6.1 or higher or couchdb v2.3.0 or higher

##### Backend and Database #####

* 1st host couchdb on default port (5984)
* from root of the repo open the backend dir `cd backend`
* install npm dependencies `npm install`
* create a `.env` file with the following content
    * COUCH_USER (mandatory: couchdb credentials)
    * COUCH_PASS (mandatory: couchdb credentials)
    * SECRET (optional: to be used for hashing)
    * PORT (optional: defaults to 8080)
```
COUCH_USER=admin
COUCH_PASS=admin
SECRET=my_secret
PORT=8080
```
* run build script to create db views and some documents that would allow testing (takes optional param `--clean` to setup a fresh copy in case the database already exists)
`npm run build`
* serve the app `npm run serve`

##### Frontend #####

* from root of the repo open the frontend dir `cd frontend`
* install npm dependencies `npm install`
* serve the app `npm run serve` (app will run in dev mode on port 8081 after checking that port 8080 is busy)


## Contents ##

### pages ###

##### Login #####
* login form is automatically shown when there are no signed-in users
* login is automatically done when there is a valid token in session
* login form will open again on user __logout__

##### View Events #####
* this is the landing page if user is signed in
* in this page users can browse through events grouped by type and sorted by date (newest > oldest)
* events created by the user will not show here by design
* user can click on an event to view event info

##### My Events #####
* this page can be accessed by hovering over the user icon in the header and click on __My Events__ (on mobile tap the user icon then tap My Events)
* in this page users can see events that they created sorted by date
* user can click on an event to view event info

##### Event Info #####
* this page can be accessed by clicking on any event from the __View Events__ page or __My Events__ page
* in this page users can see information about the event and list of users who have joined it
* if the user owns the event he can edit/delete it
* if the user doesn't own the event he can join it

##### Create/edit Event #####
* this page can be accessed by hovering over the user icon in the header and clicking on __Create Event__ or clicking on __Edit__ in the __Event Info__ page
* in this page the user can fill/edit a form that has all the information about the event, choose an image, and save

### APIs ###

##### login #####
* path: /login
* method: post
* post params: username & password `OR` header: token
* result: {error, user, token} (token expires in 1 hour)

##### user events #####
* path: /user/events
* method: get
* header: token
* result: {total_rows, offset, rows:[{id, key, value, doc:{<data>}}]}

##### join event #####
* path: /user/join
* method: post
* post params: event_id
* header: token
* result: {success, error}

##### create event #####
* path: /user/create
* method: put
* post params: doc
* header: token
* result: {doc, error}

##### edit event #####
* path: /user/:id
* method: put
* post params: doc
* header: token
* result: {doc, error}

##### delete event #####
* path: /user/:id
* method: delete
* header: token
* result: {success, error, message}

##### all events #####
* path: /events/all
* method: get
* header: token (optional)
* result: {total_rows, offset, rows:[{id, key, value, doc:{<data>}}]}

##### get event #####
* path: /events/:id
* method: get
* result: {<data>}
