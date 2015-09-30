//songs app

var songs = [];

var Song = function (title, artist, genre){
this.title = title;
this.artist = artist;
this.genre = genre;
}

var wonderwall = new Song("Wonderwall", "Oasis", "Pop/Rock");
var stairway = new Song("Stairway to Heaven", "Led Zepplin", "Rock");
var toxic = new Song("Toxic", "Britney Spears","Pop");
songs.push(wonderwall,stairway,toxic);

function displaySongs(){
var elemString = "";
for (var i=0; i < songs.length; i+=1){
  //pass in the song itself, and the index of the song to get the elemString
  elemString += getElemString(songs[i], i);
}
document.getElementById('songs').innerHTML = elemString;
}

displaySongs();

//when someone clicks the submit buton or hits enter on one of the input .. run this function
document.getElementById('newSongForm').addEventListener('submit',
function(event){
  //next line says dont refresh the page.
  event.preventDefault();
  var title = document.getElementById('songTitle').value;
  var artist = document.getElementById('songArtist').value;
  var genre = document.getElementById('songGenre').value;

//create the mySong object by calling the Song constructor
  var mySong = new Song(title, artist, genre);

//add the created song into the song array

  songs.push(mySong);
//append the new song to the end of the list already on the index page
  document.getElementById('songs').innerHTML += getElemString(mySong, songs.length - 1);

  //clear out the inputs
document.getElementById('songTitle').value="";
document.getElementById('songArtist').value="";
document.getElementById('songGenre').value="";

});

//returns the elm string for us to display

function getElemString(song, z) {
  return '<div class="well container">'
                      +'<h3>'+song.title + '</h3>'
                      +'<p><i>'+song.artist+'</i></p><br/>'
                      +'<p><i>'+song.genre+'</i></p><br/>'
                      +'<div>'
                      +'<button class="btn btn-primary" onclick="editSong('+z+')">Edit</button> &nbsp&nbsp'
                      + '<button class="btn btn-danger" onclick="deleteSong('+z+')">Delete</button></div>'
                      +'</div>';
}

//a is the song index we want to delete (references z in the getElemString())
//just used a and z to show it can be anything you want

function editSong(index) {
//can do JavaScript like line below
//document.getElementById('editTitle').value = songs[b].title;
//or jquery like below
$('#editTitle').val(songs[index].title);
$('#editArtist').val(songs[index].artist);
$('#editGenre').val(songs[index].genre);
//create a button in javascript like line below
//document.getElementById('saveEditButton').innerHTML = '<button type="button" class="btn btn-primary">Save changes</button>'
//in jquery
$('#saveEditButton').html('<button onclick="saveChanges('+index+')" type="button" class="btn btn-primary">Save changes</button>');
$('#myModal').modal('toggle');

}

function deleteSong(a) {
  songs.splice(a,1);
  displaySongs();
}

function saveChanges(index) {
  //var title = document.getElementById('editTitle').value;
  var title =$('#editTitle').val();
  var artist =$('#editArtist').val();
  var genre =$('#editGenre').val();
  songs[index] = new Song(title, artist, genre);

//clear out the inputs

$('#editTitle').val('');
$('#editArtist').val('');
$('#editGenre').val('');

//next line is to close the modal
$('#myModal').modal('toggle');
displaySongs();
}
