import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import GamePlay from '../components/GamePlay';

// Mock Questions
const questions = [
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
  },
]

// Spi function
const mockGameEnd = vi.fn();

describe('GamePlay Component', () => {
    it('Renders Questions and options', ()=>{
        render(<GamePlay question={questions} gameEnd={mockGameEnd} />);

        expect(screen.getByText('Capital of France?')).toBeInTheDocument();
        // Button should use getByRole
        expect(screen.getByRole('button', { name: /Prev/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();

        // Test on shuffle
        const mockOptions = ['London', 'Rome', 'Berlin', 'Paris'];
        mockOptions.forEach((options)=>{
            expect(screen.getByRole('button', { name: options })).toBeInTheDocument();
        })
    })

    it('Click Next goes to next question, Prev to prev question', async() => {
        // Mock user
        const user = userEvent.setup();

        render(<GamePlay question={questions} gameEnd={mockGameEnd} />);

        await user.click(screen.getByRole('button', { name: /Next/i }));
        // Proceed to next question
        expect(screen.getByText('The sky is blue.')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: /Prev/i }));
        // Back to Q1
        expect(screen.getByText('Capital of France?')).toBeInTheDocument();
        expect(mockGameEnd).not.toHaveBeenCalled();
    })

    it('Remembers selections across questions and sends them on game end', async() => {
        // Mock user
        const user = userEvent.setup();

        render(<GamePlay question={questions} gameEnd={mockGameEnd} />);

        await user.click(screen.getByRole('button', { name: 'Paris' }));
        await user.click(screen.getByRole('button', { name: /Next/i }));

        await user.click(screen.getByRole('button', { name: 'False' }));
        await user.click(screen.getByRole('button', { name: /Next/i }));

        expect(mockGameEnd).toHaveBeenCalled();
        expect(mockGameEnd).toHaveBeenCalledWith(expect.objectContaining({
            0: 'Paris',
            1: 'False'
        }));
    })
})