"""
high level support for doing this and that. 2
"""
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "root")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)

mongo_client = MongoClient(
    host=MONGO_URL,
    username=MONGO_USERNAME,
    password=MONGO_PASSWORD,
    port=MONGO_PORT,
)

print(MONGO_URL, MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, mongo_client)


# def insert_test_document():
#     """Inserts sample document to the test_collection in the test db"""
#     db = mongo_client.test
#     test_collection = db.test_collection
#     res = test_collection.insert_one({"name": "Idan", "instructor": True})
#     print(res)
