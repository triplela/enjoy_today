import { defineStore } from 'pinia';
import { categories, type Category, type Activity, type Location, type People } from '../data/activities';

const validPeople: People[] = ['solo', 'small', 'group', 'any'];
const validLocations: Location[] = ['indoor', 'outdoor', 'both'];

/** Duration of the dice roll animation in milliseconds */
export const DICE_ROLL_DURATION = 1500;

function isValidPeople(value: string): value is People {
  return validPeople.includes(value as People);
}

function isValidLocation(value: string): value is Location {
  return validLocations.includes(value as Location);
}

export const useGameStore = defineStore('game', {
  state: () => ({
    peopleCount: '',
    goOut: '',
    rolling: false,
    rollStage: 'idle' as 'idle' | 'category' | 'activity',
    rollCount: 0,
    currentCategory: null as Category | null,
    currentActivity: null as Activity | null,
    currentDiceFace: 1,
    candidateCategories: [] as Category[],
    candidateActivities: [] as Activity[],
    history: [] as { category: Category; activity: Activity }[]
  }),
  actions: {
    setOptions(people: string, out: string) {
      if (!isValidPeople(people)) {
        console.warn(`Invalid people value: ${people}. Defaulting to 'solo'.`);
        this.peopleCount = 'solo';
      } else {
        this.peopleCount = people;
      }

      if (!isValidLocation(out)) {
        console.warn(`Invalid location value: ${out}. Defaulting to 'both'.`);
        this.goOut = 'both';
      } else {
        this.goOut = out;
      }

      this.rollStage = 'idle';
      this.currentDiceFace = 1;
      this.refreshCandidateCategories();
    },
    refreshCandidateCategories() {
      let available = categories;
      if (this.goOut === 'outdoor') {
        available = categories.filter(c =>
          ['food', 'game', 'adventure', 'creativity', 'sport', 'shopping'].includes(c.id)
        );
      } else if (this.goOut === 'indoor') {
        available = categories.filter(c =>
          ['food', 'game', 'rest', 'learning', 'creativity', 'shopping'].includes(c.id)
        );
      } else {
        available = categories;
      }
      // Fisher-Yates shuffle for true randomness
      const shuffled = [...available];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      this.candidateCategories = shuffled.slice(0, 6);
    },
    refreshCandidateActivities() {
      if (!this.currentCategory) return;
      const desiredLocation = isValidLocation(this.goOut) ? this.goOut : 'both';
      const desiredPeople = isValidPeople(this.peopleCount) ? this.peopleCount : 'solo';

      const matchesLocation = (activityLocation: Location, strict: boolean = false) => {
        if (desiredLocation === 'both') return true;
        if (strict) return activityLocation === desiredLocation;
        return activityLocation === desiredLocation || activityLocation === 'both';
      };

      const matchesPeople = (people: People[], strict: boolean = false) => {
        if (this.peopleCount === 'any') return true;
        if (strict) return people.includes(desiredPeople);
        // Non-strict: accept any activity (relax the people constraint)
        return true;
      };

      // Tier 1: Strict match (both location and people)
      let filteredActivities = this.currentCategory.activities.filter(activity =>
        matchesLocation(activity.location, true) && matchesPeople(activity.people, true)
      );

      // Tier 2: If < 6, relax location (allow 'both')
      if (filteredActivities.length < 6) {
        filteredActivities = this.currentCategory.activities.filter(activity =>
          matchesLocation(activity.location, false) && matchesPeople(activity.people, true)
        );
      }

      // Tier 3: If < 6, relax people (allow 'any')
      if (filteredActivities.length < 6) {
        filteredActivities = this.currentCategory.activities.filter(activity =>
          matchesLocation(activity.location, false) && matchesPeople(activity.people, false)
        );
      }

      // Tier 4: If < 6, include all from category
      if (filteredActivities.length < 6) {
        filteredActivities = this.currentCategory.activities;
      }

      // Fisher-Yates shuffle for true randomness
      const shuffled = [...filteredActivities];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      this.candidateActivities = shuffled.slice(0, 6);
    },
    rollCategory() {
      // Guard against rapid clicks
      if (this.rolling) return;

      // Guard against empty candidates
      if (this.candidateCategories.length === 0) return;

      // Reset rollCount when starting a new step (from idle or activity stage)
      if (this.rollStage !== 'category') {
        this.rollCount = 0;
      }

      this.rolling = true;
      this.rollStage = 'category';
      this.rollCount++;

      const randomCategory = this.candidateCategories[Math.floor(Math.random() * this.candidateCategories.length)];
      const randomFace = Math.floor(Math.random() * 6) + 1;

      setTimeout(() => {
        this.currentCategory = randomCategory;
        this.currentActivity = null;
        this.currentDiceFace = randomFace;
        this.rolling = false;
        this.refreshCandidateActivities();
      }, DICE_ROLL_DURATION);
    },
    rollActivity() {
      // Guard against rapid clicks
      if (this.rolling) return;

      if (!this.currentCategory) return;

      // Reset rollCount when starting a new step (from category stage)
      if (this.rollStage !== 'activity') {
        this.rollCount = 0;
      }

      this.rollCount++;

      // Ensure candidate activities are populated
      if (this.candidateActivities.length === 0) {
        this.refreshCandidateActivities();
      }

      // Guard against empty candidates after refresh attempt
      if (this.candidateActivities.length === 0) return;

      this.rolling = true;
      this.rollStage = 'activity';

      const randomActivity = this.candidateActivities[Math.floor(Math.random() * this.candidateActivities.length)];
      const randomFace = Math.floor(Math.random() * 6) + 1;

      setTimeout(() => {
        this.currentActivity = randomActivity;
        this.currentDiceFace = randomFace;
        this.rolling = false;
        if (this.currentCategory) {
          // Limit history to prevent memory leak
          if (this.history.length >= 50) {
            this.history.shift();
          }
          this.history.push({ category: this.currentCategory, activity: randomActivity });
        }
      }, DICE_ROLL_DURATION);
    },
    reset() {
      this.currentCategory = null;
      this.currentActivity = null;
      this.rollCount = 0;
      this.rollStage = 'idle';
      this.currentDiceFace = 1;
      this.candidateCategories = [];
      this.candidateActivities = [];
      this.history = [];
    }
  }
});
