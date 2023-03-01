# Mars Rover Project

Web interface to deliver user commands to an autonomous rover. It also allows the user to track the rover's movements in a fixed field, and maps the positions of detected objects around the rover.

## Data flow from other components

MQTT publish/subscribe protocol built on top of TCP/IP stack over a specific topic using a broker. This is used to track the coordinate of the rover, which needs to be constantly upated. Information on objects detected will be transmitted and stored in a MongoDB database.

## Backend

Developed using ExpressJS to handle route requests over HTTP, and NodeJS to connect to and query from the MongoDB database. The Express API was hosted on Heroku but is no longer supported.

## Frontend

Developed using ReactJS. Contains a WASD-type user control for the rover, as well as buttons for 180° and 360° turns (useful for scanning the field for objects due to camera's fixed position). There is also a dropdown menu for the user to automatically navigate towards detected objects. Information on connection status as well as object distances will also be transmitted and displayed.

The frontend is hosted [here](https://laughing-kare-b5e7a5.netlify.app/), and can be seen here.
![frontend](frontend_img.png)
