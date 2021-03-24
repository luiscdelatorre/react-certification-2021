const random = (limit) => {
  return Math.floor(Math.random() * limit);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = random(i + 1);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export { random, formatDate, shuffleArray };
