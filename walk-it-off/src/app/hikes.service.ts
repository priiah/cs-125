import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HikesService {
  // Define the hiking trail features for each trail
  //These are trails in and around Irvine. In the future, we'll be able to recommend
  //  from a greater set based on location collected.
  public static trailFeatures = [
    { distance: 3, elevationGain: 120, difficulty: 1, name: 0 },
    { distance: 2, elevationGain: 164, difficulty: 1, name: 1 },
    { distance: 5.2, elevationGain: 460, difficulty: 2, name: 2 },
    { distance: 4.8, elevationGain: 900, difficulty: 3, name: 3 },
    { distance: 7.5, elevationGain: 1190, difficulty: 3, name: 4 },
    { distance: 2.9, elevationGain: 370, difficulty: 1, name: 5 },
    { distance: 9, elevationGain: 1140, difficulty: 4, name: 6 },
    { distance: 9.2, elevationGain: 1600, difficulty: 4, name: 7 },
    { distance: 2.4, elevationGain: 890, difficulty: 3, name: 8 },
    { distance: 3.8, elevationGain: 950, difficulty: 3, name: 9 },
    { distance: 5, elevationGain: 400, difficulty: 2, name: 10 },
  ];
  public static trailNames = [
    "Upper Newport Bay Nature Preserve Hike",
    "Quail Hill Trail",
    "Buck Gully Trail",
    "Bommer Canyon Trail",
    "Laguna Coast Wilderness Park Hike",
    "Barbara's Lake Hike",
    "Crystal Cove Hike",
    "Crystal Cove Red Route Hike",
    "Top of the World Hike",
    "Car Wreck Trail",
    "Dripping Cave Trail Hike",
  ];
  activityLevels = new Map<string, number>([
    ["Little", 1],
    ["Moderate", 2],
    ["Active", 3],
    ["Very Active", 4],
  ]);


  constructor() { }

  public recommendHikes() {
    // Define the weights for the distance score and feature score
    const distanceWeight = 0.5;
    const featureWeight = 0.5;

    // Define the feature weights for the hiking trail features
    const distanceFeatureWeight = 0.4;
    const elevationGainFeatureWeight = 0.2;
    const difficultyFeatureWeight = 0.4;

    // Define the user's step count goal and activity level
    //const userStepGoal = 3000;
    const userStepGoal = Number(localStorage.getItem("step"));

    const userActivity = localStorage.getItem("activity");
    const userActivityLevel = this.activityLevels.get(userActivity as string);
    if (userActivityLevel == null) {
      console.log("User activity level undefined");
      return [{trail: { distance: 3, elevationGain: 120, difficulty: 1, name: 0 }, score: 0,},
        {trail: { distance: 5.2, elevationGain: 460, difficulty: 2, name: 2 }, score: 0}];
    }



    // Calculate the user's goal based on step count goal and activity level
    //const userGoal = (userStepGoal / 1000) * (1 + (userActivityLevel - 3) * 0.2);
    const userGoal = (userStepGoal / 2100) * (1 + 0.2 * (userActivityLevel - 2)); //avg of 2100 steps per mile
    //also take into account the activity level and adjust the distance calculation accordingly

    // Normalize the hiking trail features
    function normalize(features: number[]): number[] {
      return features.map((feature) => (feature - Math.min(...features)) / (Math.max(...features) - Math.min(...features)));
    }

    const normalizedFeatures = HikesService.trailFeatures.map((trail) => normalize(Object.values(trail)));

    // Calculate the distance score for each hiking trail
    const distances = HikesService.trailFeatures.map((trail) => Math.abs(trail.distance - userGoal));
    const distanceScores = distances.map((distance) => 1 / (1 + distance));

    // Calculate the feature score for each hiking trail
    const featureScores = normalizedFeatures.map(
      (normalizedFeature) =>
        distanceFeatureWeight * (1 - distanceScores[normalizedFeatures.indexOf(normalizedFeature)]) +
        elevationGainFeatureWeight * normalizedFeature[0] +
        difficultyFeatureWeight * normalizedFeature[1]
    );

    // Calculate the combined score for each hiking trail
    const combinedScores = distanceScores.map((distanceScore, index) => distanceWeight * distanceScore + featureWeight * featureScores[index]);

    // Rank the hiking trails based on their combined score
    const rankedTrails = HikesService.trailFeatures.map((trail, index) => ({ trail, score: combinedScores[index] })).sort((a, b) => b.score - a.score);

    console.log(rankedTrails);
    return rankedTrails;

  }



}



