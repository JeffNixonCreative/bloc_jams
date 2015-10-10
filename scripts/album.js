//   PICASSO   //
var albumPicasso = {
    
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',

    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21'},
        { name: 'Magenta', length: '2:15'}
    ]
};



//   MARCONI   //
var albumMarconi = {

    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
     
    songs: [
        { name: 'Hello, Operator?', length: '1:01' },
        { name: 'Ring, ring, ring', length: '5:01' },
        { name: 'Fits in your pocket', length: '3:21'},
        { name: 'Can you hear me now?', length: '3:14' },
        { name: 'Wrong phone number', length: '2:15'}
    ]
 };


//   TEMPLATE  //
    //    • Song Item
    //    • Song Number
    //    • Song Title
    //    • Song Duration
var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">' + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '  <td class="song-item-title">' + songName + '</td>' + '  <td class="song-item-duration">' + songLength + '</td>' + '</tr>';
    
//    return template;
    return $(template);
    
 
};

//  POPULATE THE TEMPLATE ALBUM PASSED IN AS ARGUMENT WITH PICASSO AS DEFAULT ON LOAD
var setCurrentAlbum = function(album) {

//    var albumTitle = document.getElementsByClassName('album-view-title')[0];
//    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
//    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
//    var albumImage = document.getElementsByClassName('album-cover-art')[0];
//    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

//    albumTitle.firstChild.nodeValue = album.name;
//    albumArtist.firstChild.nodeValue = album.artist;
//    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
//    albumImage.setAttribute('src', album.albumArtUrl);

    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
//    albumSongList.innerHTML = '';
    $albumSongList.empty();

    for (i = 0; i < album.songs.length; i++) {
//        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }
};


//  NEW VARIABLE with the value of the DOM element album-view-title to test the findParentByClass function
//var child = document.getElementsByClassName('album-view-title')[0];

//  NEW VARIABLE with the value of the entire html document as its value to test the findParentByClass function
//var noParent = document.querySelector('html');



// FUNCTION THAT SAYS for the first agrument (element) passed in, provide the parentElement of the argument as the value to a new variable that, if-while its value is className, and className is not equal to the second argument (targetClass), we pass the parentElement back to the variable as its value. But, if the className is equal to the the second argument (targetClass), return the the original value of the currentParent variable. Otherwise, alert the user that "no parent with that class name was found". Else, if none of these conditions are met, alert the user that there was "No parent found".
var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    if (currentParent) {
        while (currentParent.className && currentParent.className != targetClass) {
            currentParent = currentParent.parentElement;
        }
        if (currentParent.className == targetClass) {
            return currentParent;
        } else {
            alert('No parent with that class name found.');
        } 
    } else {
        alert ('No parent found.');
    }
};



// TEST the function to see if it works y passing 'child' in as the first argument and 'album-view' in as the second argument.
//findParentByClassName(child, 'album-view');
    


var getSongItem = function(element) {
    
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');    
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
    
};



//  TABLE ROW STATE clickHandler function that changes the content of the song number element between Pause, Play and Number. It receives an argument as a result of a row being clicked on (window.onload click event handeler set to each row of the table), creates a new variable (songItem) that holds the value from the getSongItem function ( TBD ) with the argument (targetElement) as the argument.
var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);

//  And if currentlyPlayingSong is equal to null (meaning, nothing is playing), clear the the content of the new variable (songItem) and replace it with the value of pauseButtonTemplate (pause button).
    if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');

// But if the currentlyPlayingSong is equal to data-song-number class (displaying the song number, rather tham pause or play), clear the content of songItem and replace it with the Play button (play-button-template) while returning the curently playing song to null (stopping the song from continuing to play)
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;

// But if the currentlyPlayingSong is not equal to data-song-number class (displaying something other than the song number), create a new variable (currentlyPlayingSongElement) with the value of an array (songNumber + currentlyPlayingSong), then clearing the content of currentlyPlayingSongElement and replacing it with the the song number (data-song-number). Then clear the songItem content and replace it with the pause button. Then pass the song number to the currentlyPlayingSong variable.
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
};



//  GLOBAL VARIABLES: These are elements we'll be adding listeners to.
//  album-view-song-LIST.
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
//  album-view-song-ITEM.
var songRows = document.getElementsByClassName('album-view-song-item');



//  PLAY/PAUSE BUTTON STATES
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


// DEFAULT STATE OF THE CURRENLY PLAYING SONG as empty/null
var currentlyPlayingSong = null;



//  WINDOW ONLOAD function that says when the window loads, the default album to display will be Picasso. Then, associate a mouseover event listener function that: 
 window.onload = function() { 
     setCurrentAlbum(albumPicasso);
     songListContainer.addEventListener('mouseover', function(event) {

//  if the events target parent elements classname is album-view-song-item, create a variable (songItem) with the value of the element that triggered the event (songListContainer which is the album-view-song-list eement, which is the entire table, right ???????). And if the value of songItem's child element that displays the song number (data-song-number) is not equal to currentlyPlayingSong clear its content and replace it with the Play button (playButtonTemplate).
         if (event.target.parentElement.className === 'album-view-song-item') {
             var songItem = getSongItem(event.target);
             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                 songItem.innerHTML = playButtonTemplate;
             }
         } 

//  Then, loop through songRows (which holds the value of album-view-song-item...the entire row) and listen for the event of the mouse leaving. Create a new variable with the value of the element that triggered the event (which ever row that may be) and another variable with the value of that rows song number (data-song-number), clear its content and return its value to the row number (rather than play or pause). Add a click event listener that passes the element that triggered the event as an argument to the clickHandler function.
         
         for (i = 0; i < songRows.length; i++) {

             songRows[i].addEventListener('mouseleave', function(event) {
                 var songItem = getSongItem(event.target);
                 var songItemNumber = songItem.getAttribute('data-song-number');
                 if (songItemNumber !== currentlyPlayingSong) {
                     songItem.innerHTML = songItemNumber;
                 }
             });
             songRows[i].addEventListener('click', function(event) {
             clickHandler(event.target);
             });
         }
     });
 };