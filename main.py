import os

import flask

import dndbeyond

app = flask.Flask(__name__)
BASE_URL = "http://127.0.0.1:5000"


@app.route("/", methods=["GET"])
def index():
    return flask.Response("Widget website is running.")

@app.route("/portrait", methods=["GET"])
def portrait():
    name = flask.request.args.get("name", type=str)
    cid = flask.request.args.get("id", type=int)
    
    if name is None or cid is None:
        return flask.abort(400)
    
    img_src_name = name.lower().replace(" ", "-")
    img_src = None
    for file in os.listdir("character-portraits"):
        filename = ".".join(file.split(".")[:-1])
        if filename == img_src_name:
            img_src = file
            break
    if img_src is None:
        return flask.abort(404)
    return flask.render_template("portrait.html", img_src="/images/"+img_src, cid=cid, base_url=BASE_URL)

@app.route("/css/<file>.css", methods=["GET"])
def css(file):
    return flask.send_from_directory("css", f"{file}.css")

@app.route("/js/<file>.js", methods=["GET"])
def js(file):
    return flask.send_from_directory("js", f"{file}.js")

@app.route("/images/<file>", methods=["GET"])
def images(file):
    return flask.send_from_directory("character-portraits", file)

@app.route("/api/character-hp/<character_id>")
def character_hp(character_id):
    try:
        client = dndbeyond.DnDBeyond(character_id)
        hp = client.get_character_hp()
        return flask.jsonify(hp)
    except Exception as e:
        return flask.jsonify({"error": str(e)})
    

if __name__ == "__main__":
    app.run()