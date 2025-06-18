import { describe, it, expect, vi } from 'vitest';
import { getRandomQuestions, questions as allQuestions, Question } from './questions';

// Helper to check uniqueness
const areQuestionsUnique = (questions: Question[]): boolean => {
  const ids = questions.map(q => q.id);
  return new Set(ids).size === ids.length;
};

describe('getRandomQuestions', () => {
  it('1. Default count: should return 10 questions by default', () => {
    const result = getRandomQuestions();
    expect(result.length).toBe(10);
    expect(areQuestionsUnique(result)).toBe(true);
  });

  it('2. Specific count, no category: should return the specified number of questions', () => {
    const result = getRandomQuestions(5);
    expect(result.length).toBe(5);
    expect(areQuestionsUnique(result)).toBe(true);
  });

  it('3. Specific count, valid category with enough questions: should return questions from that category', () => {
    // 'general-knowledge' has 5 questions in the provided data.
    const count = 3;
    const category = 'general-knowledge';
    const result = getRandomQuestions(count, category);
    expect(result.length).toBe(count);
    expect(result.every(q => q.category === category)).toBe(true);
    expect(areQuestionsUnique(result)).toBe(true);
  });

  it('4. Specific count, valid category with fewer questions (testing fallback): should return mixed questions', () => {
    // 'science' has 2 questions in the provided data. We request 5.
    const count = 5;
    const categoryWithFewQuestions = 'science';
    const scienceQuestionsCount = allQuestions.filter(q => q.category === categoryWithFewQuestions).length; // Should be 2

    expect(scienceQuestionsCount).toBe(2); // Verify assumption about data

    const result = getRandomQuestions(count, categoryWithFewQuestions);
    expect(result.length).toBe(count); // Should return 5 questions
    expect(areQuestionsUnique(result)).toBe(true);

    const fromCategory = result.filter(q => q.category === categoryWithFewQuestions);
    const fromFallback = result.filter(q => q.category !== categoryWithFewQuestions);

    expect(fromCategory.length).toBe(scienceQuestionsCount); // All questions from the specified category should be included
    expect(fromFallback.length).toBe(count - scienceQuestionsCount); // The rest should be from fallback
  });

  it('4a. Specific count, category with fewer questions, but enough total questions to fulfill the count', () => {
    // 'science' has 2 questions. Total questions are 13.
    const result = getRandomQuestions(10, 'science'); // Request 10, 'science' has 2
    expect(result.length).toBe(10);
    expect(result.filter(q => q.category === 'science').length).toBe(2);
    expect(result.filter(q => q.category !== 'science').length).toBe(8);
    expect(areQuestionsUnique(result)).toBe(true);
  });


  it('5. Specific count, invalid/empty category: should return questions from general pool (fallback)', () => {
    const count = 5;
    const category = 'nonexistent-category';
    const result = getRandomQuestions(count, category);
    expect(result.length).toBe(count);
    // All questions should be from fallback, i.e., none should have the 'nonexistent-category'
    expect(result.every(q => q.category !== category)).toBe(true);
    expect(areQuestionsUnique(result)).toBe(true);
  });

  it('6. Edge case: count = 0: should return 0 questions', () => {
    const result = getRandomQuestions(0);
    expect(result.length).toBe(0);
  });

  it('6a. Edge case: count = 0 with category: should return 0 questions', () => {
    const result = getRandomQuestions(0, 'science');
    expect(result.length).toBe(0);
  });

  it('7. Edge case: count > total available questions (no category specified): should return all available unique questions', () => {
    const totalUniqueQuestions = allQuestions.length; // 13 in this dataset
    const result = getRandomQuestions(totalUniqueQuestions + 5);
    expect(result.length).toBe(totalUniqueQuestions);
    expect(areQuestionsUnique(result)).toBe(true);
  });

  it('7a. Edge case: count > total available questions (category specified, fallback makes it use all questions)', () => {
    // 'science' has 2 questions. Total questions 13.
    // Request 15 questions. Should get the 2 'science' + 11 other unique questions.
    const totalUniqueQuestions = allQuestions.length; // 13
    const scienceQuestionsCount = allQuestions.filter(q => q.category === 'science').length; // 2

    const result = getRandomQuestions(totalUniqueQuestions + 5, 'science');
    expect(result.length).toBe(totalUniqueQuestions); // Cannot exceed total unique questions

    const fromCategory = result.filter(q => q.category === 'science');
    // The number of science questions might be less if total count is capped before all science questions are added,
    // due to shuffling. The key is that total length is capped.
    // However, the current implementation of getRandomQuestions prioritizes filling from the category first.
    expect(fromCategory.length).toBe(scienceQuestionsCount);
    expect(areQuestionsUnique(result)).toBe(true);
  });

  it('Should return unique questions even when category questions + fallback questions are combined', () => {
    // This test ensures that if a question from the specified category somehow also appears in the
    // general pool for fallback (which shouldn't happen if data is clean, but tests defensiveness),
    // it's not duplicated. The current Set logic for existingIds should handle this.
    // To test this properly, we might need a more controlled mock.
    // For now, relying on the areQuestionsUnique check in test case 4.
    // Let's try to force a scenario for fallback logic
    const result = getRandomQuestions(13, 'science'); // 'science' has 2, needs 11 more from 11 others.
    expect(result.length).toBe(13);
    expect(areQuestionsUnique(result)).toBe(true);
  });

  it('Should handle request for more questions than available in a category, with not enough fallback questions', () => {
    // Mock 'questions' to have fewer total questions than requested count
    const fewQuestions: Question[] = [
      { id: "test001", category: "cat1", question: "Q1", options: ["A", "B"], correctAnswer: 0, difficulty: "easy", explanation: "", level: 1, points: 10, tags: [], timeLimit: 30 },
      { id: "test002", category: "cat1", question: "Q2", options: ["A", "B"], correctAnswer: 0, difficulty: "easy", explanation: "", level: 1, points: 10, tags: [], timeLimit: 30 },
      { id: "test003", category: "cat2", question: "Q3", options: ["A", "B"], correctAnswer: 0, difficulty: "easy", explanation: "", level: 1, points: 10, tags: [], timeLimit: 30 },
    ];

    // Temporarily mock the global 'questions' array if Vitest/Jest allows module mocking easily.
    // For now, this test will run against the actual 'allQuestions' which has more than 3.
    // To properly test this specific scenario, a more isolated mock of 'questions' import is needed.
    // console.log("Note: Test 'Should handle request for more questions than available...' needs proper module mocking for full isolation.");

    // Test with actual data: category 'science' (2 Qs), other 'animals' (2 Qs), etc. Total 13.
    // If we ask for 15 questions from 'science', it should return all 13 unique questions.
    const resultWithActualData = getRandomQuestions(15, 'science');
    expect(resultWithActualData.length).toBe(allQuestions.length); // Should be 13
    expect(areQuestionsUnique(resultWithActualData)).toBe(true);
    expect(resultWithActualData.filter(q => q.category === 'science').length).toBe(2);
  });
});
