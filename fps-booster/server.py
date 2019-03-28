from flask import Flask, request,jsonify,g, send_file
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import os

import cv2
import matplotlib.pyplot as plt
import time
import scipy
from scipy import signal
import numpy as np


app = Flask(__name__)
# CORS(app, resources={r'/*': {"origins": 'http://localhost:3000'}})
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['mp4','avi', 'webm','png'])


class Interpolation(Resource):
    def post(self):
        # print(request.files['file'])
        # target=os.path.join(UPLOAD_FOLDER,'test_videos')
        target = UPLOAD_FOLDER
        # print(request.files)
        file = request.files['file']
        filename = secure_filename(file.filename)
        # print(filename)
        destination="/".join([target, filename])
        # print(destination)
        file.save(destination)
        # print(request)
        
        # return(jsonify({'a':1}))
        return send_file(destination, attachment_filename='1.mp4')
    def get(self):
        # if 'file' not in request.files:
        #     print('No file part')
        # print(request.files['file'])
        return(jsonify({'b':1}))
class UploadVideo(Resource):
    def post(self):
        file = request.files['file']
        if(file):
            print("-------file------")
        else:
            print("-------NoFile----")
        return 0

class SurfInterpolation(Resource):
    def post(self):
        target = UPLOAD_FOLDER
        file = request.files['file']
        filename = secure_filename(file.filename)
        destination="/".join([target, filename])
        file.save(destination)
        return send_file("./uploads/1.avi", attachment_filename='1.avi')
    def get(self):
        return jsonify({'a':23323})
    
api.add_resource(Interpolation,'/w')
api.add_resource(UploadVideo,'/upload-video')
api.add_resource(SurfInterpolation,'/surf')


if __name__ == "__main__":
	app.run(debug=True)
