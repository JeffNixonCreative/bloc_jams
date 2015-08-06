//forEach Function, as an anonymous function

function forEach (array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i]);
  } 
};

