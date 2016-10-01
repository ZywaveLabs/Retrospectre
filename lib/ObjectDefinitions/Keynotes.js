/* global Keynotes:true */
/*
Keynotes Object
roomCode - {string} roomCode inwhich notes belong to
createAt - {datetime} time keynotes were created
owner - {string} Person who created the room
text - {string} text
*/

Keynotes = function() {
    this.roomCode = "";
    this.text = "";
};

Keynotes.prototype.withRoomCode = function (roomCode) {
    this.roomCode = roomCode;
    return this;
};
