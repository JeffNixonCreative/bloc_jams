// ROW TEMPLATE containing click and hover events, called from setCurrentAlbum
var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">' + 
        '<td class= "song-item-number" data-song-number= "' + songNumber + '">' + songNumber + '</td>' + 
        '<td class="song-item-title">' + songName + '</td>' + 
        '<td class="song-item-duration">' + songLength + '</td>' + 
        '</tr>';

// STORE row template as a jQuery object    
    var $row = $(template);

// CLICK event
    var clickHandler = function() {
        
// STORE the song number element of a row
//parseInt() wrap, YES (per assignment)
        var songNumber = parseInt($(this).attr('data-song-number'));
        
// If clicked while NOT EMPTY
// If currentlyPlayingSongNumber is not empty
// store song/row number and current value of currentlyPlayingSongNumber in a variable
// change the first value (everything) to PLAY button, clearing any potentially conflicting values (#, play, pause)

        if (currentlyPlayingSongNumber !== null) {
// parseInit() wrap, NO???? Kills click functionality
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }

// if clicked while PLAYING
// set the first html element (row #) of the row clicked to the PAUSE button
// set the value of currentlyPlayingSongNumber to songNumber
// and play PREVIOUS song

        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSongNumber = songNumber;
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
        }
        
// if clicked while NOT PLAYING 
// set the first element (row #) of the row clicked to the PLAY button
// set the first element of the Play/Pause button on the controller to PLAY button
// set the value of currentlyPlayingSongNumber to null
// set the value of currentSongFromAlbum to null
// clear the value of updatePlayerBarSong so the song details will no longer be visible        

        else if (currentlyPlayingSongNumber === songNumber) {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
            updatePlayerBarSong();
        }
    };    

    
    
// 1) Creating a variable called currentSongIndex (var currentSongIndex)
// 2) Running function trackIndex, passing currentAlbum and currentSongFromAlbum
// 3) Assign value returned from above function call to currentSongIndex
// 4) Increment the value stored at currentSongIndex variable by one (++)

// ON HOVER event    
    var onHover = function(event) {
// store the number element of the object that triggered the event
// store the number attribute of the object that triggered the event
// if hovered while NOT PLAYING
// change the first element (song number) back to current value of playButtonTemplate
// parseInit() wrap, NO ???????? Kills hover finctionality, and button wont stick
        var songNumberCell = $(this).find('.song-item-number');
// parseInit() wrap, YES ?????? Kills hover functionality, and button wont stick
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

// OFF HOVER event
    var offHover = function(event) {
// store the number element of the object that triggered the event
// store the number attribute of the object that triggered the event
// if hovered off while NOT PLAYING
// change the first element (song number) back to the current value of songNumber
// parseInit() wrap, NO ????? Prevents play button hover state from disapearing
        var songNumberCell = $(this).find('.song-item-number');
// parseInit() wrap, YES ????? Prevents play button hover state from disappearing
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }

//      THIS IS SOME SORT OF TEST I DON'T QUITE UNDERSTAND
//        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
    };
    
// TRIGGER the click event
// when anything but the row element itself (number, title, duration) are clicked, run the clickHandler function
// parseInt() wrap, NO ??? Didn't solve anything
    $row.find('.song-item-number').click(clickHandler);
    
    

// TRIGGER the hover event
// when a hover event occures, run onHover and offHover events.
    $row.hover(onHover, offHover);

// return all properties of the $row jQuery object (template, click, and hover events) to any function accessing createSongRow    
    return $row;
 
};

//  TABLE and ALBUM (title, artist, release and image) 
var setCurrentAlbum = function(album) {  

// change the value of currentAlbum to the argument passed in, set by the window.onload (which ever album the user selects from Collection page)
    currentAlbum = album;

// store ALBUM data from HTML elements
// • album title
// • artist
// • release date
// • image
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');

// store TABLE from HTML element
    var $albumSongList = $('.album-view-song-list');

// allcate ALBUM data based on object passed as the functions argument from window.onload (Picasso)
// store NAME element in albumTitle
// store ARTIST element in albumArtist
// store YEAR & LABEL in albumReleaseInfo
// store IMAGE in albumImage   
    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

// leave TABLE empty
    $albumSongList.empty();

// Loop through the object passed in and for each of its song properties indexed.
// create a variable that passes createSongRow function;
//      • the NUMBER for each song, as the first argument
//      • the NAME for each song, as the second argument
//      • the DURATION for each song, as the third argument
// store its content (name and length)
    for (i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }
};

// INDEX OF SONGS, called from nextSong function (
var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

// CONTROLLER, Left (previous, play, skip)
var nextSong = function () {

// find the NEXT song number????????? Check if index is equal to 0, if yes, return the duration of the song currenltly playing, else, return the value of the argument passed in when called
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };

// No idea whats gooing on here ?????????
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;

// update the vaue of currentSongIndex to 0 if the currentSongIndex is greater or equal to the duration of the currently playing song 
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

// update the value of currentlyPLayingSongNumber to currentSongIndex + 1 ???????????????????
// update the value of currentSongFromAlbum to the value of the abum objects whatever the currentSongIndex is doing??????????
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

// ?????????????????????
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);

// store the NEXT??? song number in getLastSongNumber
// store the CURRENT song number in nextSongNumberCell
// store the LAST song number in lastSongNumberCell
// parseInt() wrap, NO ?????
    var lastSongNumber = getLastSongNumber(currentSongIndex);
// parseInit() wrap, NO ???? Kills previous/next functionality
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
// parseInit() wrap, NO ????? Creates bug in previous/next functionality, button remains visible
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
//  change the value of the first element in nextSongNumberCell to the pause button
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};
var previousSong = function() {
    
    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
// parseInt() wrap, NO ???? not sure it has any effect
    var lastSongNumber = getLastSongNumber(currentSongIndex);
// parseInt() wrap, NO ??? not sure it has any effect
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
//parseInt() wrap, NO ???? Not sure it has any effect
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};



// CONTROLLER, Center (
var updatePlayerBarSong =  function () {

//  change the NAME of the song .text value to currently playing album name
//  change the ARTISTs name .text value to currently playing album artist
//  change the MOBILE version .text value to combine currently playing album name & (????)
//  change the PLAY button to PAUSE
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);

};


// #1 create variable that store the value of each HTML element
// Store the Play Button element, used by offHover & onHover events to determine row status
// Store the ROW Pause Button element
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';



// #2 create the SONG & ALBUM variable to pass values when determining the status of each row
//  ALBUM data (album, artist, durations, etc.), value set by object passed in from setCurrentAlbum
//  NUMBER of the currently playing song, passed the values, songNumber/null, set by clickHandler.
//  SONG object from the songs array, value set by clickHandler.
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

// #2 store the CONTROLLER elements in variables
// Store the PLAY button from the CONTROLLER, accessed from clickHandler when a song is not playing
// Store the PAUSE button from the CONTROLLER
// Store the PREVIOUS button HTML element, 
// Store the NEXT button
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
// WHY ARE THESE JQUERY VARIABLES WHEN THE OTHERS ARE NOT ?????????????????
// WHY DO ALL THESE VARIABLES NEED TO BE GLOBAL??? CAN"T THE FUNCTIONALITY BE SELF CONTAINED RATHER THAN ACCESSING THE VARIABLE FROM INSIDE A FUNCTION??????
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');


// #1 ACTIVATE the page when the DOM is ready
// load the album data for the album selected from the Collection Page
// 
$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});



// ALBUM OBJECT (in fixtures.js) 
// • name = album name (Colors)
// • artst = arist (Picasso)
// • label = record label (Cubism)
// • year = release date (1881)
// • albumArtURL = image (hyper link)
// • songs (
//       – name = song name (green),
//       – length = duration (3:47:02) )

// SONG OBJECT is a js object wrapped in jQuery ($row)
// • album-view-song-item = song row
// • song-item-number / data-song-number = song/row number
// • song-item-title = song name
// • song-item-duration = duration/time/length of song



// CONTROLLER BAR ( controls | duration | volume )
// CONTAINER
//  <"player-bar">
//      <"container">
//  LEFT SIDE
//      <"control-group main-controls">
//      <"previous"> = PREVIOUS song
//      <"ion-skip-backward"> = icon
//      <"play-pause"> = 
//      <"ion-play"> = PLAY button
//      <"next"> = NEXT song
//      <"ion-skip-forward"> = icon
//  CENTER
//      <"control-group currently-playing"> = center container
//      <"song-name"> = "album"
//      <"artist-song-mobile"> = "text combined"
//      <"artist-name"> = "artist"
//      <"seek-control"> = scrub nob
//      <"seek-bar"> = scrub bar
//      <"fill"> = ????
//      <"thumb"> = ???
//      <"current-time">2:30 = "time elapsed"
//      <"total-time">4:45 "duration"
// RIGHT
//      <"control-group volume"> = volume container
//      <"ion-volume-high icon"> = icon
//      <"seek-bar"> = scrub bar
//      <"fill"> = ???
//      <"thumb"> = ????


// parseInt() converts the first value within a string to an integer unless that value is not a number. (e.g. " 10 " = 10, dropping the spaces. "abc13def" = Nan, does not recognise since abc is not a number. "0101" = 100, dropping the first 0 since 0 is ot a value. "12.95" = 10, stopping at the decimal since it is not a number). The thing I don't get is if the stings is ("10", 7) it returns 7 rather than 10. Is that because 7 is already an integer???????