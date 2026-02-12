import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

const question = [
    {
        type: 'boolean',
        question: 'The sky is blue.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
    },
]

describe('App Integration Test', () => {

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

        const mockQuestionData = {
            response_code: 0,
            results: [{
                type: 'boolean',
                question: 'The sky is blue.',
                correct_answer: 'True',
                incorrect_answers: ['False'],
            }]
        }

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
    
})