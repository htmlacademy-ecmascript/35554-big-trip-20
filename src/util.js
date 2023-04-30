function getRandomArrayElement(element) {
  return element[Math.floor(Math.random() * element.length)];
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export {getRandomArrayElement, getRandomNumber};
