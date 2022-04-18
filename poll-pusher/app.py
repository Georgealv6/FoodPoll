from flask import Flask, render_template, request, jsonify, make_response
from dbsetup import create_connection, select_all_items, update_item
from flask_cors import CORS, cross_origin
from pusher import Pusher
import json as simplejson

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
pusher = Pusher(app_id=u'1384864', key=u'ce20660fbfcfd0ed0646', secret=u'61df65f31198b151c360', cluster=u'us2')
database = "./pythonsqlite.db"
conn = create_connection(database)
c = conn.cursor()

def main():
	global conn, c

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/results')
def admin():
	return render_template('results.html')

@app.route('/vote', methods=['POST'])
def vote():
	data = simplejson.loads(request.data)
	update_item(c, [data['member']])
	output = select_all_items(c, [data['member']])
	pusher.trigger(u'poll', u'vote', output)
	return request.data

if __name__ == '__main__':
	main()
	app.run(debug=True)