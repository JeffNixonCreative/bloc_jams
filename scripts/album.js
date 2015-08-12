

// #1: alocate values to a new, accessible object
 var albumMilkman = {
                                                                        // album-view-details...
     name: 'Spilled Milk',                                                  // ...TITLE element "The Colors"
     artist: 'Milkman',                                                     // ...ARTIST element "Pablo Picasso"
     label: 'Hip-Hop',                                                      // ...RELEASE element Cubism
     year: '2007',                                                          // ...YEAR element 1881 ????? How do these coe together???
     albumArtUrl: 'assets/images/album_covers/01.png',                  // album-cover-art element (picture)
//     document.getElementsByTagName('img').addEventListener('click',setCurrentAlbum(albumPicasso));
                                                                        // album-view-song-list
     songs: [                                                               // sub-object (array)
         { name: 'The Names Milkman', length: '2:34' },                         // row 1
         { name: 'Detox', length: '3:10' },                                     // row 2
         { name: 'Concrete Kry.', length: '3:10' },                             // row 3
         { name: 'The Origin', length: '2:48'},                                 // row 4
         { name: 'Doublefaced Tripple Beam', length: '3:30'}                    // row 5
     ]
 };


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


// #2: create a template and assign it to the TABLE element
var createSongRow = function (songNumber, songName, songLength) {          // pass arguments from setCurrentAlbum function
     
     var template =                                                         // new variable determining table format
        '<tr class="album-view-song-item">'                                     // calling the TABLE view
      + '  <td class="song-item-number">' + songNumber + '</td>'                    // assigning argOne as the first column
      + '  <td class="song-item-title">' + songName + '</td>'                       // assigning argTwo as the second column
      + '  <td class="song-item-duration">' + songLength + '</td>'                  // assigning argThree as the second column
      + '</tr>'                                                                 // enging the TABLE view
      ;                                                                     // end of object
 
     return template;                                                       // make new object accessible
};

 var setCurrentAlbum = function(album) {                                    // pass argument albumMilkman from event handler (onload)
 
// #4: create variable with node elements to pass the values to
     var albumTitle = document.getElementsByClassName('album-view-title')[0];                 // new variable with value of node element
     albumTitle.firstChild.nodeValue = album.name;                                // albumTitle as value arg.property (name)
    
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];               // new variable with value of node element
     albumArtist.firstChild.nodeValue = album.artist;                             // albumArtist as value arg.property (artist)
    
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];    // new variable with value of node element
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;      // albumReleaseInfo as value arg.property (year)

     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     albumImage.setAttribute('src', album.albumArtUrl);                           // albumImage attribute as image src
     albumImage.addEventListener('click', function () {
         if (album = albumMilkman) {
             setCurrentAlbum(albumPicasso);
         } else if (album = albumPicasso) {
             setCurrentAlbum(albumMarconi);
         }
     })
         
            
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];          // new variable with value of TABLE element
     albumSongList.innerHTML = '';                                                              // clear the table
     
     for (i = 0; i < album.songs.length; i++) {                              // separate objects index/element and assign to TABLE
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length); // add elements to table w/#
     }
};


window.onload = function() {
    setCurrentAlbum(albumMilkman);
};

