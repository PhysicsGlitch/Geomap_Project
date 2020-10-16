# Chicago Accident App
## Equipo de la Eficiencia
### Team members: Grant, Matthew, Heather, Jose and Jason

This project utilized the City of Chicagos data portal to analyze almost 500,000 traffic accidents betwen 2016 and 2020.
The City of Chicago's data portal we used can be found at https://data.cityofchicago.org/widgets/85ca-t3if

There were a number of challenges in downloading, analysing and visualizing this date. First was the size of the dataset itself.
We used the documentation of the City of Chicago which follows standard Socrata open data source guidelines to make our pulls in both
python and javascript. Specific code snippets for those pulls are in our data_exploration and javascript files. However, to render 
useable slices for rendering images on the user front-end, we paired down the data by year, specific accident types such as fatalities,
neighborhood location, hit and runs and other factors to give granularity and specificity to the data.

Additionally, the City gives coordinates and a beat # for each traffic incident. But then we had to map that data to specific Chicago
neighborhoods. We accomplished this be getting GeoJson coordinates and their corresponding polygons and then locating the beats within
each district and neighborhood in Chicago.

Another interest of this project was the impact of Covid and traffic accidents. There are approximately 2,300 - 2,500 accidents per week
in the city. But immediately after the lockdown in March traffic incidents fell to 500. With increasing opening of Chicago through the phases
there was a linear corresponding increase in traffic accidents. However, even currently, average accidents are down about 500 cases per week
or 20%.

## Key Questions:

Several overriding questions informed our project. What is an overall picture of Chicago accidents? What is the impact of covid? What is the typical
type of accident? And are there specific hotspots of accidents?

This information is useful for both city planners, insurance providers and residents of the city to be safer on the road and look at Chicagos' traffic ecosystem. One notable
conclusion was that most accidents do not happen durin inclement weather, but during dry, sunny and normal conditions. This may be do to the fact that
more miles are driven during safer conditions. But it is also possible that people are more careless and distracted during safe conditions which contributes 
to more accidents.

Additionally, fatalities in Chicago are relatively low with only about 100 per year. However, there are around 120,000 hit and runs in the city each year.
Notable hot spots for hit and runs were at major artery intersections and especially downton in the loop. This once again could be a function of traffic 
frequency, but also certain more dangerous intersections, either due to more crime density or perhaps poor intersection design, were noted on our heat maps.

## Plotting the Data

To plot the data we employed the d3 and Leaflet libraries to create interactive visualizations. Matplotlib was also employed for cruncing raw
statistical numbers to get a picture of the data. This data was then segmented by a choropleth map to give a picture of accidents in the neighborhoods.
Leaflet provided interactive functionality for the user to choose different overlay maps, sliders and to engage with the visualizations in more dynamic ways.

The individual code files give examples of the data. For the presentation we ran the data from Heather's branch who compiled all of the individual scripts together.

## New Javascript

One requirement of the assigment was to use another javascript library. We learned and employed jQuery, do to its prevelance, to run our API calls because it interfaced
nicely with the City of Chicago's data portal. The jQuery dependency was installed in our index files with the script https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
The reason to use google's api location is because most internet users probably have already downloaded this dependency from normal web browsing so it allowed for 
speed of loading. Also, we did download and attempt to use node.js to create our backend server. However, we ran into some difficultis because we had little backend experience.
    
## Flask and MongoDB Backend Database

MongoDB and flask were used to create the backend database.  We got flask working for normal jsons, but did not get it fully running for the GeoJSONS. For the presentation
we hosted the entire file locally. With more time we could have condensed our multiple html files into one page that had a flask app for switching them. But we pushed
a functional flask/mongoDB for pulling normal JSON. A major problem we ran into was that there was no straightforward REST API or httml interface for flask.

App.py and chicago_accidents.js in the master branch contain the code for the flask/mongoDB connection. Essentially what we did was to create our own REST API interface with flask
that allow front-end calls from the javascript/plot functions. Each needed data slice has its own index that flask created. For example @app.route("/fatalities") is where flask
exports the fatalites collection in the MongoDB database and then loads it to an html index. A d3 call such as d3.json("/fatalities", function(json_dict) ... can then access a 
properly formatted json on the user frontend. This was a simple way to create a connection between our backend database and frontend interface to connect our data.

Due to time constraints we were not able to load all of the GeoJSONS, only regular jsons files. MongoDB does support GeoJSON format. However, it does not natively accept GeoJSON files without modification.
Also MongoDB's native REST interface was deprecated a few versions ago and heroku's mlab Mongo support is also being shutdown on November 10 and was unavalible. This complicated both 
getting resources for learning and more elegant solutions to our database construction. To fix this issue we would have had to either rewritten our GeoJSON files according to MongoDB's 
documentation https://docs.mongodb.com/manual/reference/geojson/ with an embedded document. That is somewhat time consuming. Alternatively, there are ways to run a GeoJSON through a Python script 
that modifies it for uploading to a MongoDB such as this:https://github.com/rtbigdata/geojson-mongo-import.py The javascript call back functions would have to have been modified according to the specific field 
names in MongoDB. Those would be the final steps to have a full flask/MongoDB app running that connects our backend database to the frontend user interface. We have the prototype and architecture in place,
but simply would have needed a bit more time to properly format the GeoJSONs to MongoDB's requirements.

## Further Questions

With our basic map in place we have a strong structure to explore this data further as time permits. With the architecture in place there are a number of interesting questions that could be explored.
Some additional questions were looking at fatalities in greaterdepth. Also, due to legal reasons the city splits data between accidents below and above fifteen-hundred dollars. ccidents below this number do not 
need to be reported to the police. But accidents above do. Looking at the difference and location of major and minor accidents would be very valuable information to insurance providers as well as residents. 
Additionally, there were a number of other reports such as cause of accident, direction of travel, type of roadway and also road conditions that could give much more granularity to interested parties. Time
permitting our basic app could be expanded in a number of ways to create valuable insights.
