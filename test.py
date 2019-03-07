import sys
from flask import Flask,request,jsonify,abort
from flask_restful import Api,Resource,reqparse
import json
import pymongo

defaultencoding = 'utf-8'
if sys.getdefaultencoding() != defaultencoding:
    reload(sys)
    sys.setdefaultencoding(defaultencoding)

app = Flask(__name__)
app.config['BUNDLE_ERRORS'] = True
api = Api(app)
#空的字符串，记得填内容
db_name = ""
db_address = ""
aggregate_name = ""

mydict = {
	'user1': {'name': '12345'},
}#字典格式示例，用于接收数据，最后将录入数据库。

parser = reqparse.RequestParser(bundle_errors=True)
parser.add_argument('name',action='append',type=str,required=True)
#class id_list()已改好，class id()用于查重。
class Id(Resource):
	@api.representation('application/json')
	def post(self,info):
		if info in mydict:
			abort(404,message="user {} already exist".format(info))
		args = parser.parse_args()
		mydict[info] = {'name': args['name']}
		return mydict[info],201

    def get(self, info):
        if info in INFOS:
            abort(404)
        args = request.values
        new = {'name': args.get('name')}
        mydict[info] = new
        return new, 201

class Id_list(Resource):
	@api.representation('application/json')
	def post(self,info):
		args = parser.parse_args()
		info = int(max(mydict.keys()).lstrip("user")) + 1
		info = "user%i" % info
		mydict[info] = {"name": args["name"]}
		myclient = pymongo.MongoClient(db_address)
		mydb = myclient[db_name]
		dblist = myclient.list_database_names()
		if db_name in dblist:
			myaggregate = mydb[aggregate_name]
			x = myaggregate.insert_one(mydict)
		res='数据提交成功'
		return jsonify({'msg': res})

	def get(self,info):
		args = request.values
		info = int(max(mydict.keys()).lstrip("user")) + 1
		info = "user%i" % info
		mydict[info] = {"name": args["name"]}
		myclient = pymongo.MongoClient(db_address)
		mydb = myclient[db_name]
		dblist = myclient.list_database_names()
		if db_name in dblist:
			myaggregate = mydb[aggregate_name]
			x = myaggregate.insert_one(mydict)
		res='数据提交成功'
		return jsonify({'msg': res})

api.add_resource(Id, '/<info>')
api.add_resource(Id_list, '/list/<info>')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port='10086',debug=True)