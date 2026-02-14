import { calculateScore } from './app.js'
import { jest } from '@jest/globals'


describe("Backend testing", () => {

    function mockRes() {
        return {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    }

   it('Win Score Calculation Logic', () => {
        const req = {
            body:{
                questions : [
                {
                    type: 'multiple',
                    question: 'Capital of France?',
                    correct_answer: 'Paris',
                    incorrect_answers: ['London', 'Rome', 'Berlin'],
                },
                {
                    type: 'boolean',
                    question: 'The sky is blue.',
                    correct_answer: 'True',
                    incorrect_answers: ['False'],
                },],
                userAnswers: {
                    0: 'London',
                    1: 'True',
                },
            }
        }

        const res = mockRes();

        calculateScore(req,res);

        expect(res.json).toHaveBeenCalledWith({
            score: 1,
            result: true,
            message: 'You Win! 🎉',
        });
   })

   it('Fail Score Calculation Logic', () => {
        const req = {
            body:{
                questions : [
                {
                    type: 'multiple',
                    question: 'Capital of France?',
                    correct_answer: 'Paris',
                    incorrect_answers: ['London', 'Rome', 'Berlin'],
                },
                {
                    type: 'boolean',
                    question: 'The sky is blue.',
                    correct_answer: 'True',
                    incorrect_answers: ['False'],
                },],
                userAnswers: {
                    0: 'London',
                    1: 'False',
                },
            }
        }

        const res = mockRes();

        calculateScore(req,res);

        expect(res.json).toHaveBeenCalledWith({
            score: 0,
            result: false,
            message: 'You Lost! 💀',
        });
   })
})