const hashtagArray = [
  'simulated',
  'test',
  'hashtag',
  'something-else',
  'whatever',
  "i'm-running-out-of-ideas",
  "i'm-not-very-creative",
  'i-need-to-get-some-sleep',
];

export const GetRandomElements = () => {
  // Shuffle the array
  const shuffledArray = hashtagArray.slice().sort(() => Math.random() - 0.5);

  // Return the first two elements of the shuffled array
  return shuffledArray.slice(0, 2);
};
