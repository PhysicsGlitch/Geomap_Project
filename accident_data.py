import pandas as pd


# create instance of Flask app
app = Flask(__name__)




@app.route("/update")
def scrape_mars_data():
   
    accident_data = {}
    pd.read_json("chart_data")

    accident_data.update
    
    mars_dict = {}
    mars_dict.update(mars_hemi_images)
    mars_dict['mars_facts_dict'] = mars_facts_dict
    mars_dict['nasa_title'] = nasa_title
    mars_dict['nasa_paragraph'] = nasa_paragraph
    mars_dict['mars_image'] = mars_image
    return mars_dict
    
if __name__ == "__main__":
    app.run(debug=True)