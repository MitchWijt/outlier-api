module.exports = {
  loopReachedLastElement
}

function loopReachedLastElement (currentLoopVar, loopArray) {
  return currentLoopVar === loopArray[loopArray.length - 1]
}
