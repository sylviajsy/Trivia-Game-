import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

const mockQuestionData = {
            response_code: 0,
            results: [{
                type: 'boolean',
                question: 'The sky is blue.',
                correct_answer: 'True',
                incorrect_answers: ['False'],
            }]
        }

describe('App Flow Test', () => {

    beforeEach(() => {
        // clear fetch data
        vi.clearAllMocks();
    });

    it('Render Game Settings when load', () => {
        render(<App />);

        expect(screen.getByRole('heading', { name: /trivia game/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /game settings/i })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: /blue/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: /true/i })).not.toBeInTheDocument();
    })

    it('After submitting settings, fetches questions and shows GamePlay', async() => {
        const user = userEvent.setup();

        global.fetch = vi.fn(async(url) => {
            if(String(url).startsWith('/api/questions?')){
                return {ok: true, json: async () => mockQuestionData};
            }
            throw new Error('Unexpected fetch: ' + url);
        })

        render(<App />);

        await user.click(screen.getByRole('button', { name: /start game/i }));

        expect(await screen.findByRole('heading', { name: /blue/i })).toBeInTheDocument();
        expect(global.fetch).toHaveBeenCalledTimes(1);
    })

    it('After GamePlay ends, posts results', async() => {
        const user = userEvent.setup();

        const result = {
            score: 1,
            result: true,
            message: "You Win! 🎉",
        }

        global.fetch = vi.fn(async (url, options) => {
            if (String(url).startsWith('/api/questions?')) {
                return { ok: true, json: async () => mockQuestionData };
            }
            if (String(url) === '/api/results') {
                // method: 'POST'
                expect(options?.method).toBe('POST');
                // headers: {'Content-Type': 'application/json',}
                expect(options?.headers?.['Content-Type']).toBe('application/json');
                const body = JSON.parse(options.body);
                expect(body.questions).toHaveLength(1);
                expect(body.userAnswers).toEqual({ 0: 'True' });

                return { ok: true, json: async () => result }
            }
            throw new Error('Unexpected fetch: ' + url)
        })
            
        render(<App />)

        await user.click(screen.getByRole('button', { name: /start game/i }));
        await user.click(screen.getByRole('button', { name: /true/i }));
        await user.click(screen.getByRole('button', { name: /Next/i }));
        
        expect(await screen.findByRole('heading', { name: /game end/i })).toBeInTheDocument();

        expect(global.fetch).toHaveBeenCalledTimes(2);
    })
    
})