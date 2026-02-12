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
        expect(screen.queryByRole('heading', { name: /gameplay/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: /gameresult/i })).not.toBeInTheDocument();
    })
})