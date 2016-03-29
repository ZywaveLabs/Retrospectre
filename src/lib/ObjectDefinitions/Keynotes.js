/*global Keynotes:true*/
/*
Keynotes Object
roomCode - {string} roomCode inwhich notes belong to
createAt - {datetime} time keynotes were created
owner - {string} Person who created the room
text - {string} text
*/

Keynotes = function() {
    this.roomCode = "";
    this.createdAt = new Date();
    this.owner = "";
    this.text = "";
};

Keynotes.prototype.withRoomCode = function (roomCode) {
    this.roomCode = roomCode;
    return this;
};

Keynotes.prototype.createdAtTime = function(time){
    this.createdAt = time;
    return this;
};

Keynotes.prototype.createdBy = function (user) {
    this.owner = user;
    return this;
};

Keynotes.prototype.withNotes = function(notes){
    this.text = notes;
    return this;
};
