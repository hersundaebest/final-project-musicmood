const danceabilityScore = (recentlyPlayed) => {
  // creating arrays from danceability, energy, and valence scores of the 25 most recently played songs
  const danceabilityArr = recentlyPlayed.audio_features.map(
    (song) => song.danceability
  );

  // averages of each score
  const danceabilityAvg =
    (danceabilityArr?.reduce((a, b) => a + b, 0) / danceabilityArr?.length) *
    100;
  return danceabilityAvg;
};

const energyScore = (recentlyPlayed) => {
  // creating arrays from danceability, energy, and valence scores of the 25 most recently played songs
  const energyArr = recentlyPlayed.audio_features.map((song) => song.energy);

  // averages of each score
  const energyAvg =
    (energyArr?.reduce((a, b) => a + b, 0) / energyArr?.length) * 100;
  return energyAvg;
};

const valenceScore = (recentlyPlayed) => {
  // creating arrays from danceability, energy, and valence scores of the 25 most recently played songs
  const valenceArr = recentlyPlayed.audio_features.map((song) => song.valence);

  // averages of each score
  const valenceAvg =
    (valenceArr?.reduce((a, b) => a + b, 0) / valenceArr?.length) * 100;
  return valenceAvg;
};

const moodAnalysis = (recentlyPlayed) => {
  // creating arrays from danceability, energy, and valence scores of the 25 most recently played songs
  const danceabilityArr = recentlyPlayed.audio_features.map(
    (song) => song.danceability
  );
  const energyArr = recentlyPlayed.audio_features.map((song) => song.energy);
  const valenceArr = recentlyPlayed.audio_features.map((song) => song.valence);

  // averages of each score
  const danceabilityAvg =
    danceabilityArr?.reduce((a, b) => a + b, 0) / danceabilityArr?.length;
  const energyAvg = energyArr?.reduce((a, b) => a + b, 0) / energyArr?.length;
  const valenceAvg =
    valenceArr?.reduce((a, b) => a + b, 0) / valenceArr?.length;

  // mood analysis
  let mood = "fine and dandy";
  if (danceabilityAvg >= 0.7 && energyAvg >= 0.8 && valenceAvg >= 0.7) {
    mood = "energetic";
  } else if (danceabilityAvg >= 0.7 && energyAvg >= 0.7 && valenceAvg >= 0.6) {
    mood = "quite joyful";
  } else if (danceabilityAvg >= 0.6 && energyAvg >= 0.5 && valenceAvg >= 0.5) {
    mood = "content";
  } else if (danceabilityAvg <= 0.7 && energyAvg <= 0.7 && valenceAvg >= 0.5) {
    mood = "chill";
  } else if (danceabilityAvg <= 0.7 && energyAvg <= 0.6 && valenceAvg <= 0.6) {
    mood = "relaxed";
  } else if (danceabilityAvg >= 0.7 && energyAvg >= 0.75 && valenceAvg <= 0.5) {
    mood = "a bit angsty";
  } else if (danceabilityAvg <= 0.7 && energyAvg >= 0.8 && valenceAvg <= 0.7) {
    mood = "a bit anxious";
  } else if (danceabilityAvg <= 0.45 && energyAvg >= 0.5 && valenceAvg <= 0.5) {
    mood = "a bit depressed";
  } else if (danceabilityAvg <= 0.4 && energyAvg <= 0.5 && valenceAvg <= 0.4) {
    mood = "down in the dumps";
  }
  return mood;
};

module.exports = { moodAnalysis, danceabilityScore, energyScore, valenceScore };
