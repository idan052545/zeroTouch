"""
high level support for doing this and that.
"""
import os
import requests
from flask import Flask, json, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

# gallery = mongo_client.gallery
# images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")

DEBUG = bool(os.environ.get("DEBUG", True))


app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG


@app.route("/new-image")
def new_image():
    """cool explain"""
    word = request.args.get("query")
    # headers = {"Accept-Version": "v1", "Authorization": "Client-ID " }
    # params = {"query": word}
    # response = requests.get(url= headers=headers, params=params)

    return {"word": word}


# @app.route("/images", methods=["GET", "POST"])
# def images():
#     if request.method == "GET":
#         # read images from the database
#         images = images_collection.find({})
#         return jsonify([img for img in images])
#     if request.method == "POST":
#         # save image in the database
#         image = request.get_json()
#         image["_id"] = image.get("id")
#         result = images_collection.insert_one(image)
#         inserted_id = result.inserted_id
#         return {"inserted_id": inserted_id}


# @app.route("/images/<image_id>", methods=["DELETE"])
# def image(image_id):
#     if request.method == "DELETE":
#         # delete image from the database
#         result = images_collection.delete_one({"_id": image_id})
#         if not result:
#             return {"error": "Image wasn't deleted. Please try again"}, 500
#         if result and not result.deleted_count:
#             return {"error": "Image not found"}, 404
#         return {"deleted_id": image_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
