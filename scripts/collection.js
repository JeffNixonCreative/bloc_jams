
//  VANILLA  //
//var collectionItemTemplate =
//    '<div class="collection-album-container column fourth">'
//    + '<img src="assets/images/album_covers/01.png"/>'
//    + '  <div class="collection-album-info caption">'
//    + '    <p>'
//    + '      <a class="album-name" href="/album.html"> The Colors </a>'  
//    + '      <br/>'
//    + '      <a href="/album.html"> Pablo Picasso </a>'
//    + '      <br/>'
//    + '      X songs'
//    + '      <br/>'
//    + '    </p>'
//    + '  </div>'
//    '</div>';


//  REFACTORED  //
//As a jQuery naming convention, we rename the function by adding a verb to the beginning of the variable (buildCollectionItemTemplate) name an establish it as a function that creates a new variable (template) with the content of any given albums associaited elements. Then, we return that variable as a jquery object just in case we later end up using jQuery methods.
var buildCollectionItemTemplate = function() {
    var template =
    '<div class="collection-album-container column fourth">'
    + '<img src="assets/images/album_covers/01.png"/>'
    + '  <div class="collection-album-info caption">'
    + '    <p>'
    + '      <a class="album-name" href="/album.html"> The Colors </a>'  
    + '      <br/>'
    + '      <a href="/album.html"> Pablo Picasso </a>'
    + '      <br/>'
    + '      X songs'
    + '      <br/>'
    + '    </p>'
    + '  </div>'
    '</div>'
    ;
    
    return $(template);
};


// VANILLA  //
// window.onload = function() {
//     
//     // #1
//     var collectionContainer = document.getElementsByClassName('album-covers')[0].childNodes[1];
//     // #2
//     collectionContainer.innerHTML = '';
//     // #3
//     for (var i = 0; i < 12; i++) {
//         collectionContainer.innerHTML += collectionItemTemplate;
//     }
// }


//  REFACTORED  //
//When the window loads, we will pass in a function that creates a new variable with the value of .album-covers element. Then empty its content and looping through it passing the value of each child element of the .album-covers object to a new variable (newThumbnail) containing the value of our template (bildColectionItemTemplate). This populate the template with the information of the first album listed.
//The ".append" method inserts content, specified by the parameter, to the end of each element in the set of matched elements, returning either an HTML String, a DOM element or jQuery object as either a string or an array depending on the set structure of object it calls????
$(window).load(function() {
    var $collectionContainer = $('.album-covers');
    $collectionContainer.empty();
    for (var i = 0; i < 12; i++) {
        var $newThumbnail = buildCollectionItemTemplate();
        $collectionContainer.append($newThumbnail);
    }
});