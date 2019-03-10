import sys
from flask import Flask, request, jsonify, abort
from flask_restful import Api, Resource
import json
import pymongo

defaultencoding = 'utf-8'
if sys.getdefaultencoding() != defaultencoding:
    reload(sys)
    sys.setdefaultencoding(defaultencoding)

app = Flask(__name__)
api = Api(app)

db_name = "SUMSC_file"
db_address = "mongodb://118.126.66.3:27017"
col_name = "application"
code_json = "./code.json"

mydict = {
	"user1": {"actname": "actname",
                       "code": "code",
                       "cemail": "cemail",
                       "cgender": "cgender",
                       "cgrade": "cgrade",
                       "cid": "cid",
                       "cmajor": "cmajor",
                       "cname": "cname",
                       "cphone": "cphone",
                       "teamname": "teamname",
                       "teamsize": "teamsize",
                       "email" : "email",
                    	"gender" : "gender",
                    	"grade" : "grade",
                    	"id" : "id",
                    	"major" : "major",
                    	"name" : "name",
                    	"phone": "phone"}
        }



class Id_write(Resource):
    def post(self):

        args = json.loads(request.get_data())
        user_id = int(max(mydict.keys()).lstrip('user')) + 1
        user_id = 'user{}'.format(user_id)
        mydict[user_id] = {"actname": args["actname"],
                       "code": args["code"],
                       "cemail": args["cemail"],
                       "cgender": args["cgender"],
                       "cgrade": args["cgrade"],
                       "cid": args["cid"],
                       "cmajor": args["cmajor"],
                       "cname": args["cname"],
                       "cphone": args["cphone"],
                       "teamname": args["teamname"],
                       "teamsize": args["teamsize"]}

        with open(code_json, encoding='utf-8') as f:
            new = json.load(f)

        actname0 = mydict[user_id]["actname"]

        '''比对验证码'''
        if mydict[user_id]["code"] == new[actname0]:
            for n in range(args["teamsize"]):
                mydict[user_id] = {
                    "email" + "{}".format(n): args["email"],
                    "gender" + "{}".format(n): args["gender"],
                    "grade" + "{}".format(n): args["grade"],
                    "id" + "{}".format(n): args["id"],
                    "major" + "{}".format(n): args["major"],
                    "name" + "{}".format(n): args["name"],
                    "phone" + "{}".format(n): args["phone"]}


            myclient = pymongo.MongoClient(db_address)
            mydb = myclient[db_name]
            mycol = mydb[col_name]

            '''数据库的写入和查重'''
            if mydict[user_id] not in mycol.find():
                mycol.insert_one(mydict[user_id])
                # 把mydict[user_id]写入数据库

                if mydict[user_id] in mycol.find():
                    # 若此真正写入数据库
                    res = 'SUMSC200'
                else:
                    res = 'SUMSC500'
            else:
                res = 'SUMSC424'
        else:
            res = 'SUMSC403'
        return jsonify({'status_code': res})


api.add_resource(Id_write, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='10000', debug=True)
