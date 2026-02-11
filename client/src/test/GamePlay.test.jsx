import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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
        render(<GamePlay question={questions} gameEnd={mockGameEnd}/>)

        expect(screen.getByText('Capital of France?')).toBeInTheDocument();
        // Button shoould use getByRole
        expect(screen.getByRole('button', { name: /Prev/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    })
})