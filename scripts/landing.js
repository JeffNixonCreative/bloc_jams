//NEW ANIMATION (JQUERY):::::::::::
var animatePoints = function() {
    var revealPoint = function() {
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
            });
    };
    $.each($('.point'), revealPoint);
};


//OLD ANIMATION (JAVASCRIPT) :::::::::
//var points = document.getElementsByClassName('point');

//var revealPoints = function(index) {   
//    points[index].style.opacity = 1;
//    points[index].style.transform = "scaleX(1) translateY(0)";
//    points[index].style.msTransform = "scaleX(1) translateY(0)";
//    points[index].style.WebkitTransform = "scaleX(1)";
//};

//var pointsArray = document.getElementsByClassName('point');

//var animatePoints = function (points) {

//    for (var i = 0; i < points.length; i++) {
//        revealPoints(i);
//    }
//}


//NEW WINDOW LOAD (JQUERY) ////////////////////
$(window).load(function() {
    if ($(window).height() > 950) {
        animatePoints();
    }
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    $(window).scroll(function(event) {
        if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();
        }
    });
});

//OLD WINDOW LOAD (JAVASCRIPT) ///////////////
//window.onload = function() {
//    if (window.innerHeight > 950) {
//        animatePoints(pointsArray);
//    }
//    window.addEventListener('scroll', function(event) {
//        if (pointsArray[0].getBoundingClientRect().top <= 500) {
//            animatePoints(pointsArray);
//        }
//    });
//}





//    JQUERY   //







