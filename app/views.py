from app import app

from flask import render_template

@app.route("/")
def index():
  return render_template("public/index.html")


@app.route("/signup", methods = ["GET", "POST"])
def form():
  return render_template("public/form.html")