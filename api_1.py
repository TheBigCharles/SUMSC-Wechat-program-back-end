import sys
from flask import Flask, request, jsonify
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

mydict = {}


class Id_write(Resource):
    def post(self):
        args = json.loads(request.get_data())
        if mydict == {}:
            user_id = 1
        else:
            user_id = len(mydict) + 1
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
            teamsize = int(args["teamsize"])
            if teamsize > 1:
                for n in range(teamsize):
                    n -= 1
                    mydict_add = {
                        "email{}".format(n): args["email{}".format(n)],
                        "gender{}".format(n): args["gender{}".format(n)],
                        "grade{}".format(n): args["grade{}".format(n)],
                        "id{}".format(n): args["id{}".format(n)],
                        "major{}".format(n): args["major{}".format(n)],
                        "name{}".format(n): args["name{}".format(n)],
                        "phone{}".format(n): args["phone{}".format(n)]
                    }
                    mydict[user_id].update(mydict_add)

            '''数据库的写入和查重'''
            myclient = pymongo.MongoClient(db_address)
            mydb = myclient[db_name]
            mycol = mydb[col_name]

            if mydict[user_id] not in mycol.find():
                mycol.insert_one(mydict[user_id])
                # 把mydict[user_id]写入数据库
                if mydict[user_id] in mycol.find():
                    '''若此处真正写入数据库'''
                    res = 'SUMSC200'
                else:
                    res = 'SUMSC500'
            else:
                '''重复报名'''
                res = 'SUMSC424'
        else:
            '''验证码错误'''
            res = 'SUMSC403'

        return jsonify({'status_code': res})


api.add_resource(Id_write, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='10000', debug=True)
