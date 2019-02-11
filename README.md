# events-app
User login. Plus create events, view the existing ones and register to the ones that you did not create


# APIs

## login
path: /login
method: post
post params: username & password
result: {error, user, token}

## user events
path: /user/events
method: get
header: token
result: {total_rows, offset, rows:[{id, key, value, doc:{<data>}}]}

## join event
path: /user/join
method: post
post params: event_id
header: token
result: {success, error}

## create event
path: /user/create
method: put
post params: doc
header: token
result: {doc, error}

## edit event
path: /user/:id
method: put
post params: doc
header: token
result: {doc, error}

## delete event
path: /user/:id
method: delete
header: token
result: {success, error, message}

## all events
path: /events/all
method: get
header: token (optional)
result: {total_rows, offset, rows:[{id, key, value, doc:{<data>}}]}

## get event
path: /events/:id
method: get
result: {<data>}