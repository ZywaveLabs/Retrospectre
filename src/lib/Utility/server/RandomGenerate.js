/* eslint-disable */
RandomGenerate = {};

RandomGenerate.Vars = JSON.parse(Assets.getText("room_gen.json"));

RandomGenerate.GenerateNewRoomCode = function(){
    var roomCode = "";

    while (roomCode === "" || RoomMethods.RoomExists(roomCode)) {
        var noun = RandomGenerate.Vars
            .Nouns[math.randomInt(RandomGenerate.Vars.Nouns.length)];

        var adjective = RandomGenerate.Vars
            .Adjectives[math.randomInt(RandomGenerate.Vars.Adjectives.length)];

        var verb = RandomGenerate.Vars
            .Verbs[math.randomInt(RandomGenerate.Vars.Verbs.length)];

        roomCode = adjective + verb + noun;
    }
    return roomCode;
}
