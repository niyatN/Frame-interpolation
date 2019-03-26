from flask import Flask, request,jsonify,g
from flask_restful import Resource, Api


app = Flask(__name__)
api = Api(app)

class Interpolation(Resource):
    def post(self):
        return(jsonify({'a':1}))
    def get(self):
        if 'file' not in request.files:
            print('No file part')
        return(jsonify({'b':2}))
class UploadVideo(Resource):
    def post(self):
        file = request.files['file']
        if(file):
            print("-------file------")
        else:
            print("-------NoFile----")
        return 0
api.add_resource(Interpolation,'/')
api.add_resource(UploadVideo,'/upload-video')
if __name__ == "__main__":
	app.run(debug=True)