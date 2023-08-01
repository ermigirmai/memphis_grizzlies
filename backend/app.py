from flask import Flask, jsonify, request
from nba_api.stats.endpoints import draftcombinestats, draftcombinedrillresults, draftcombinespotshooting, draftcombinenonstationaryshooting, draftcombineplayeranthro

app = Flask(__name__)

@app.route("/combinestats")
def get_combinestats():
        #WRAP IN TRY-CATCH
    year = request.args.get('year', '2023')
    combinestats = draftcombinestats.DraftCombineStats(league_id='00', season_all_time=year)
    combinestats_dict = combinestats.get_dict()
    return jsonify(combinestats_dict)

@app.route("/drillresults")
def get_combinedrillresults():
    year = request.args.get('year', '2023')
    drillresults = draftcombinedrillresults.DraftCombineDrillResults(league_id='00', season_year=year)
    print("type", type(drillresults))
    drillresults_dict = drillresults.get_dict()
    print("/drillresults")
    return jsonify(drillresults_dict)

@app.route("/spotshooting")
def get_combinespotshooting():
    year = request.args.get('year', '2023')
    spotshooting = draftcombinespotshooting.DraftCombineSpotShooting(league_id='00', season_year=year)    
    spotshooting_dict = spotshooting.get_dict()
    print("/spotshooting")
    return jsonify(spotshooting_dict)

@app.route("/nonstationaryshooting")
def get_combinenonstationaryshooting():
    year = request.args.get('year', '2023')
    nonstationaryshooting = draftcombinenonstationaryshooting.DraftCombineNonStationaryShooting(league_id='00', season_year=year)
    nonstationaryshooting_dict = nonstationaryshooting.get_dict()
    print("/nonstationaryshooting")
    return jsonify(nonstationaryshooting_dict)

@app.route("/playeranthro")
def get_combineplayeranthro():
    year = request.args.get('year', '2023')
    playeranthro = draftcombineplayeranthro.DraftCombinePlayerAnthro(league_id='00', season_year=year)
    playeranthro_dict = playeranthro.get_dict()
    print("/playeranthro")
    return jsonify(playeranthro_dict)

@app.route("/test", methods=['GET'])
def test():
    obj = [
        {
            "name": "Player 2",
            "height": "6'8\"",
            "weight": "210 lbs",
            "wingspan": "7'2\"",
            # Add more player data here
        },
        {
            "name": "Player 1",
            "height": "6'8\"",
            "weight": "210 lbs",
            "wingspan": "7'2\"",
            # Add more player data here
        },
    ]
    return jsonify(obj)

if __name__== "__main__":
    app.run(debug=True)