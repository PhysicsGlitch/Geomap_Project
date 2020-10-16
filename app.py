from flask import Flask, render_template, json
import pymongo
from bson.json_util import dumps, loads

# Create an instance of Flask
app = Flask(__name__)
myclient = pymongo.MongoClient("mongodb://localhost:27017/")



# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    # I created an index for me mongodb because it was an easy collection method and also made it easy to reference
    # it in the html file

    return render_template("index.html")

@app.route("/dictionary")
def create_dictionary():
    acdb = myclient.accident_app
    ac_facts = acdb['accident_data'].find_one()
    json_dict = json.loads(dumps(ac_facts))
    return json_dict

if __name__ == "__main__":
    app.run(debug=True)