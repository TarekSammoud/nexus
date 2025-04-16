from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return "🎨 Nexus Jam Styler AI is running! --- Welcome Fediiii"

@app.route("/style", methods=["POST"])
def style_jam():
    data = request.get_json()
    title = data.get("title", "").lower()

    if "boy" in title:
        style = {
            "primary_color": "#2196F3",  # Blue
            "font": "Orbitron",
            "banner_type": "urban-wave",
            "mood_class": "masculine"
        }
    elif "girl" in title:
        style = {
            "primary_color": "#E91E63",  # Pink
            "font": "Pacifico",
            "banner_type": "sparkle-princess",
            "mood_class": "feminine"
        }
    elif "pizza" in title:
        style = {
            "primary_color": "#FF9800",  # Orange/cheese
            "font": "Comic Sans MS",
            "banner_type": "food-fun",
            "mood_class": "tasty"
        }
    else:
        style = {
            "primary_color": "#9E9E9E",  # Default gray
            "font": "Arial",
            "banner_type": "neutral",
            "mood_class": "neutral"
        }

    return jsonify(style)

if __name__ == "__main__":
    app.run(port=5001)
