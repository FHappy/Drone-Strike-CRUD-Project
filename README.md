# Drone-Strike-CRUD-Project

An interactive website used to display the latest information about all covert U.S. drone operations from 2012-2017. The data for this website was taken from the public API by Josh Begley (research editor at The Intercept).
You can visit the deployed website on heroku [here](https://drone-strike-crud-project.herokuapp.com/).

## Links
* [Heroku](https://drone-strike-crud-project.herokuapp.com/)
* [Trello](https://trello.com/b/fHxb9yu6)
* [Wireframes](http://i.imgur.com/1P9uJaL.jpg)
* [Portfolio (in progress)](http://editor-dorothy-25778.bitballoon.com/)
## Functionality

The site takes the JSON data and parses it such that it is updated often and allows for both qualitative queries and sorting of all reported casualties. Casualties in the API are represented as Strings and often included hyphens to represent a range of estimated casualties. For example:

```javascript
 "_id": "55c79e721cbee48856a30a55",
      "number": 464,
      "country": "Yemen",
      "date": "2013-01-19T00:00:00.000Z",
      "narrative": "Up to 6 people were killed in Wadi Abida. It was the last strike of the night.",
      "town": "Wadi Abida",
      "location": "Marib Province",
      "deaths": "4-6",
      "deaths_min": "4",
      "deaths_max": "6",
      "civilians": "0-4",
      "injuries": "",
```

Once the data has been fully parsed and saved to a Mongoose model, sort functions are enabled via mongoose query methods. Additional CRUD methods include User registration, authentication, and the ability to create lists of strikes which can then be paired with comments and annotations.

## Technologies Used

#### General MEN stack npm packages were used including:
* Express 
  >Routing middleware based on CommonJS
* body-parser 
  >Parse data from the body of client requests
* morgan 
  >Basic logging package.
* express=session
  >Handle session data.
* mongoose 
  >Used to frustratingly handle mongodb data entirely in javascript.
* hbs 
  >Render views and inject data from our javascript middleware.

#### Additonal packages used:
* passport 
  >Provide authentication by serializing user upon login and deserializing them upon logout. Also easily allows                 the current user to be accessed via req.session.passport.user and is stored as req.user when using passport                 middleware. Only the local strategy was used.
* connect-flash
  >Passport also uses the connect-flash module which lets us unobtrusively pass warnings bundled with                           sucessful or failing redirect options after authentication.
* xhr-request
  >Extremely tiny and intuitive XMLHTTP/HTTPS request client. I can't stress how easy this was to use compared to other         options available on npm.
* highcharts
  >Also certainly a highpoint of the new packages I learned to use. Highcharts allows for customizable and surprisingly         intricate charts renered directly to the html page. Charts are also slightly interactive and developers can customize       everything from color to tooltip details.


## Unsolved Goals
  Time was certainly a factor. I wasn't able to start the project until sunday night due to work and prior obligations. I     would like to fully implement the user's list and comments functionality which was working and fully functional one hour     before presentations. I would also have liked to dynamically update highcharts data using ajax requests to my mongodb       database rather than writing the function on one file and copy/pasting the hard data (an array of 647 nested arrays) into   the script tag of an html file. I would also like to have the splash page be a carousel containing multiple highcharts       graphs instead of just the number of deaths from each strike over time. Other charts could include a series comparison       line chart showing the number of strikes/deaths issued by presidency mapped relative to their time in office, a series       comparison line chart detailing the number of strikes/deaths fired on each country. Before presentation time I actually     had nested within each modal an embedded tweet by the bureau investigative journalism site referencing each reported         strike that sometimes provided a little more detail than than the short summary but also included a link to reports by       other news agencies. BIJ is a news aggregator and not a reporting agency themselves. I have a lot of regrets for this       project specifically for my inability implement a lot of the features that I felt would make this professional. I wanted     to develop a deeper understanding of separation of concerns but I feel like during the pursuit of dry code I might have     inadvertently created wet, saucy code. I will ideally be refactoring much of this code later on during this course as well   as updating the css which as you can tell is basic bootstrap. 
