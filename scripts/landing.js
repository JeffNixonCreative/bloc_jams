// Create Variable with Node value

var pointsArray = document.getElementsByClassName('point');

var animatePoints = function (points) {
    forEach (points, function(element) {
        element.style.opacity = 1;
        element.style.transform = "scaleX(1) translateY(0)";
        element.style.msTransform = "scaleX(1) translateY(0)";
        element.style.WebkitTransform = "scaleX(1)";
    });
}

window.onload = function() {
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }
    window.addEventListener('scroll', function(event) {
        if (pointsArray[0].getBoundingClientRect().top <= 500) {
            animatePoints(pointsArray);
        }
    });
}


