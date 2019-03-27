from flask import Flask, request,jsonify,g, send_file
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

import os
app = Flask(__name__)
CORS(app, resources={r'/*': {"origins": 'http://localhost:3000'}})
api = Api(app)

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

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
        return send_file('./uploads/1.mp4', attachment_filename='1.mp4')
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
api.add_resource(Interpolation,'/w')
api.add_resource(UploadVideo,'/upload-video')

if __name__ == "__main__":
	app.run(debug=True)
