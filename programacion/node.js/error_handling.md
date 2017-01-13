http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling


var divideSync = function(x,y) {
    // if error condition?
    if ( y === 0 ) {
        // "throw" the error safely by returning it
        return new Error("Can't divide by zero")
    }
    else {
        // no error occured, continue on
        return x/y
    }
}

// Divide 4/2
var result = divideSync(4,2)
// did an error occur?
if ( result instanceof Error ) {
    // handle the error safely
    console.log('4/2=err', result)
}
else {
    // no error occured, continue on
    console.log('4/2='+result)
}




Be careful not to use try...catch in asynchronous code, as an asynchronously thrown error will not be caught:
