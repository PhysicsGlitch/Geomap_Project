# This is the starter code for importing GeoJson code from a mongodb database.
# Import dependencies

from flask import Flask, render_template, json
import pymongo
from bson.json_util import dumps, loads

# Create an instance of Flask
app = Flask(__name__)
myclient = pymongo.MongoClient("mongodb://localhost:27017/")

#To import the MongoDB geojson we simply put in the necessary fields for map plotting and render back a json with the
# proper dictionary values for geojson plotting.

fields = {'Coordinates': True, 'Hit_n_Run': True, 'Beat': True}


# Define a create_dictionary function that will return the proper json format. The mongodb database is structured
# with a database named accident app and each collection is only one json dictionary. The find_one() method will call that
# entire dictionary. We can just dump and load it with json_util to render a json_dict file that can be called in our
# javascript function. Each dictionary is referenced at its own @app route in flask so each d3 call has its own reference.

def create_dictionary(col_name):
    accdb = myclient.accident_app
    acc_facts = accdb[col_name].find(projection=fields)
    json_data = []
    for data in json_data:
        json_data.append(data)
    json_dict = json.loads(dumps(acc_facts))
    return json_dict

# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    # home just reders the template. Although if any data needed to be important this could be put here with a redirect
    # function.
    return render_template("index.html")

@app.route("/fatalities")
def fatality_dict():
    return create_dictionary('fatality_db')

@app.route("/hit_run_2020")
def hit_run_2020():
        return create_dictionary('hit_run_2020')
@app.route("/hit_run_2019")
def hit_run_2019():
    return create_dictionary('hit_run_2019')
@app.route("/hit_run_2018")
def hit_run_2018():
    return create_dictionary('hit_run_2018')

if __name__ == "__main__":
    app.run(debug=True)