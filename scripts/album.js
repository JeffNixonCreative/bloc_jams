// #1: alocate values to a new, accessible object
 var albumPicasso = {
                                                                        // album-view-details...
     name: 'The Colors',                                                    // ...TITLE element "The Colors"
     artist: 'Pablo Picasso',                                               // ...ARTIST element "Pablo Picasso"
     label: 'Cubism',                                                       // ...RELEASE element Cubism
     year: '1881',                                                          // ...YEAR element 1881 ????? How do these coe together???
     albumArtUrl: 'assets/images/album_covers/01.png',                  // album-cover-art element (picture)
                                                                        // album-view-song-list
     songs: [                                                               // sub-object (array)
         { name: 'Blue', length: '4:26' },                                      // row 1
         { name: 'Green', length: '3:14' },                                     // row 2
         { name: 'Red', length: '5:01' },                                       // row 3
         { name: 'Pink', length: '3:21'},                                       // row 4
         { name: 'Magenta', length: '2:15'}                                     // row 5
     ]
 };
 
// #1: alocate values to a new, accessible object
 var albumMarconi = {
                                                                        // album-view-details...
     name: 'The Telephone',                                                 // title element "The Colors"
     artist: 'Guglielmo Marconi',                                           // artist name element "Pablo Picasso"
     label: 'EM',                                                           // record label element "???1881?? Cubism
     year: '1909',                                                          // year element 1881
     albumArtUrl: 'assets/images/album_covers/20.png',                  // album-cover-art element (picture)
                                                                        // album-view-song-list TABLE
     songs: [                                                               // sub-object (array)
         { name: 'Hello, Operator?', length: '1:01' },                          // row 1
         { name: 'Ring, ring, ring', length: '5:01' },                          // row 2
         { name: 'Fits in your pocket', length: '3:21'},                        // row 3
         { name: 'Can you hear me now?', length: '3:14' },                      // row 4
         { name: 'Wrong phone number', length: '2:15'}                          // row 5
     ]
 };

// #2: alocate table element to a new, accessible variables
var createSongRow = function(songNumber, songName, songLength) {          // pass arguments from setCurrentAlbum function
     
     var template =                                                         // new variable determining table format
        '<tr class="album-view-song-item">'                                     // calling the TABLE view
      + '  <td class="song-item-number">' + songNumber + '</td>'                    // assigning argOne as the first column
      + '  <td class="song-item-title">' + songName + '</td>'                       // assigning argTwo as the second column
      + '  <td class="song-item-duration">' + songLength + '</td>'                  // assigning argThree as the second column
      + '</tr>'                                                                 // enging the TABLE view
      ;                                                                     // end of object
 
     return template;                                                       // make new object accessible
 
 };
 
 var setCurrentAlbum = function(album) {                                    // pass argument albumPicasso from event handler (onload)
 
// #4: create variable with node elements to pass the values to
     var albumTitle = document.getElementsByClassName('album-view-title')[0];                 // new variable with value of node element
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];               // new variable with value of node element
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];    // new variable with value of node element
     var albumImage = document.getElementsByClassName('album-cover-art')[0];                  // new variable with value of node element
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];          // new variable with value of node element
 
// #5: set the values of the new variable as the first child of each table node (column) as the arguements individual key
     albumTitle.firstChild.nodeValue = album.name;                                // albumTitle as firstChild arg.name (key)
     albumArtist.firstChild.nodeValue = album.artist;                             // albumArtist element as firstChild arg.name(key)
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;      // albumReleaseInfo as firstChild value of arg.year (key)
     albumImage.setAttribute('src', album.albumArtUrl);                           // albumImage attribute as image src
 
// #6: clear the table to be sure it is empty before passing in values to each node
     albumSongList.innerHTML = '';
 
// #7: take in the arguments "song" key (in this case its an object) and loop it, passsing the values to new variable (TABLE element) 
     for (i = 0; i < album.songs.length; i++) {                              // separate temblate argument object index/element
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length); // pass index/elements to table w/#
     }
 
 };

// #3: trigger the data to populate onload
 window.onload = function() {                                               // event handler (onload)
   
     setCurrentAlbum(albumPicasso);                                         // call setCurretAlbum function with argument
     
 };