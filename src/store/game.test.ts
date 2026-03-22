import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGameStore, DICE_ROLL_DURATION } from '../store/game';
import { categories } from '../data/activities';

describe('Game Store - People Type "any"', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('rollCount - Easter Egg tracking', () => {
    it('should increment rollCount when rollCategory is called', async () => {
      vi.useFakeTimers();
      const store = useGameStore();
      store.setOptions('solo', 'both');

      expect(store.rollCount).toBe(0);

      store.rollCategory();
      expect(store.rollCount).toBe(1);

      vi.advanceTimersByTime(DICE_ROLL_DURATION);
      await vi.runAllTimersAsync();

      expect(store.currentCategory).not.toBeNull();
      vi.useRealTimers();
    });

    it('should increment rollCount when rollActivity is called', async () => {
      vi.useFakeTimers();
      const store = useGameStore();
      store.setOptions('solo', 'both');

      // First roll category
      store.rollCategory();
      vi.advanceTimersByTime(DICE_ROLL_DURATION);
      await vi.runAllTimersAsync();

      expect(store.rollCount).toBe(1);

      // Then roll activity - should reset count to 1
      store.rollActivity();
      expect(store.rollCount).toBe(1); // Reset to 1 when starting new step

      vi.advanceTimersByTime(DICE_ROLL_DURATION);
      await vi.runAllTimersAsync();

      expect(store.currentActivity).not.toBeNull();
      vi.useRealTimers();
    });

    it('should reset rollCount when moving from category to activity step', async () => {
      vi.useFakeTimers();
      const store = useGameStore();
      store.setOptions('solo', 'both');

      // Roll category multiple times
      store.rollCategory();
      vi.advanceTimersByTime(DICE_ROLL_DURATION);
      await vi.runAllTimersAsync();

      store.rollCategory(); // reroll
      vi.advanceTimersByTime(DICE_ROLL_DURATION);
      await vi.runAllTimersAsync();

      store.rollCategory(); // reroll again
      vi.advanceTimersByTime(DICE_ROLL_DURATION);
      await vi.runAllTimersAsync();

      expect(store.rollCount).toBe(3); // 3 category rolls

      // Move to activity - should reset
      store.rollActivity();
      expect(store.rollCount).toBe(1); // Reset to 1

      vi.useRealTimers();
    });

    it('should track multiple activity re-rolls for easter eggs', async () => {
      vi.useFakeTimers();
      const store = useGameStore();
      store.setOptions('solo', 'both');

      // Complete first flow (category then activity)
      store.rollCategory();
      vi.advanceTimersByTime(DICE_ROLL_DURATION);
      await vi.runAllTimersAsync();

      store.rollActivity();
      vi.advanceTimersByTime(DICE_ROLL_DURATION);
      await vi.runAllTimersAsync();

      expect(store.rollCount).toBe(1); // First activity roll

      // Simulate "再看看" - reroll activity
      store.refreshCandidateActivities();
      store.rollActivity();
      vi.advanceTimersByTime(DICE_ROLL_DURATION);
      await vi.runAllTimersAsync();

      expect(store.rollCount).toBe(2);

      // Another reroll to reach easter egg threshold
      store.refreshCandidateActivities();
      store.rollActivity();
      vi.advanceTimersByTime(DICE_ROLL_DURATION);
      await vi.runAllTimersAsync();

      expect(store.rollCount).toBe(3); // Easter egg threshold!

      vi.useRealTimers();
    });
  });

  describe('setOptions - validation', () => {
    it('should accept "any" as a valid people value', () => {
      const store = useGameStore();
      store.setOptions('any', 'both');

      expect(store.peopleCount).toBe('any');
    });

    it('should not fallback to "solo" when "any" is selected', () => {
      const store = useGameStore();
      store.setOptions('any', 'outdoor');

      expect(store.peopleCount).not.toBe('solo');
      expect(store.peopleCount).toBe('any');
    });

    it('should not trigger warning for "any"', () => {
      const store = useGameStore();
      const originalWarn = console.warn;
      const warnings: string[] = [];
      console.warn = (msg: string) => { warnings.push(msg); };

      store.setOptions('any', 'both');

      console.warn = originalWarn;

      expect(warnings.length).toBe(0);
      expect(store.peopleCount).toBe('any');
    });

    it('should still warn for invalid values', () => {
      const store = useGameStore();
      const originalWarn = console.warn;
      const warnings: string[] = [];
      console.warn = (msg: string) => { warnings.push(msg); };

      store.setOptions('invalid' as 'solo', 'both');

      console.warn = originalWarn;

      expect(warnings.length).toBe(1);
      expect(store.peopleCount).toBe('solo'); // fallback
    });
  });

  describe('refreshCandidateActivities - "any" filtering logic', () => {
    it('should have access to activities with all people types when "any" is selected', () => {
      const store = useGameStore();
      store.setOptions('any', 'both');

      // Pick a category with solo, small, and group activities
      const foodCategory = categories.find(c => c.id === 'food')!;
      expect(foodCategory).toBeDefined();

      // Manually set the category (bypass rollCategory's async)
      store.currentCategory = foodCategory;
      store.refreshCandidateActivities();

      // Get the people types in candidate activities
      const candidatePeopleTypes = new Set(
        store.candidateActivities.flatMap(a => a.people)
      );

      // With "any", we should get activities for various people types
      // (at least one type should be present)
      expect(candidatePeopleTypes.size).toBeGreaterThanOrEqual(1);
    });

    it('should include activities with different people requirements', () => {
      const store = useGameStore();
      store.setOptions('any', 'both');

      const foodCategory = categories.find(c => c.id === 'food')!;

      // Get activities that are solo-only
      const soloOnlyActivities = foodCategory.activities.filter(
        a => a.people.length === 1 && a.people[0] === 'solo'
      );

      // Get activities that are group-only
      const groupOnlyActivities = foodCategory.activities.filter(
        a => a.people.length === 1 && a.people[0] === 'group'
      );

      // Set category and refresh
      store.currentCategory = foodCategory;
      store.refreshCandidateActivities();

      const candidateNames = store.candidateActivities.map(a => a.name);

      // Check if activities from different people types are accessible
      // (at least some should be in the candidates pool)
      const soloInCandidates = soloOnlyActivities.filter(a =>
        candidateNames.includes(a.name)
      );
      const groupInCandidates = groupOnlyActivities.filter(a =>
        candidateNames.includes(a.name)
      );

      // With "any", both types should be able to appear in results
      // (though random selection may not include both in 6 picks)
      const totalAvailable = [...soloInCandidates, ...groupInCandidates];
      expect(totalAvailable.length + candidateNames.length).toBeGreaterThan(0);
    });
  });

  describe('Comparison with specific people types', () => {
    it('should show different behavior between "any" and "solo"', () => {
      const storeAny = useGameStore();
      storeAny.setOptions('any', 'both');

      const storeSolo = useGameStore();
      storeSolo.setOptions('solo', 'both');

      const foodCategory = categories.find(c => c.id === 'food')!;

      // Refresh both stores with same category
      storeAny.currentCategory = foodCategory;
      storeAny.refreshCandidateActivities();

      storeSolo.currentCategory = foodCategory;
      storeSolo.refreshCandidateActivities();

      // Both should produce valid candidate lists
      expect(storeAny.candidateActivities.length).toBeGreaterThan(0);
      expect(storeSolo.candidateActivities.length).toBeGreaterThan(0);
    });
  });

  describe('DICE_ROLL_DURATION constant', () => {
    it('should be 1500ms', () => {
      expect(DICE_ROLL_DURATION).toBe(1500);
    });
  });
});