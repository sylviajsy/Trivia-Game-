import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import GameSetup from '../components/GameSetup';

vi.mock('../data/categories', () => ({
  default: [
    { id: "", name: "Any Category" },
    { id: '9', name: 'General Knowledge' },
    { id: '21', name: 'Sports' },
  ],
}))

const mockHandleSubmit = vi.fn();

describe('Game Setup Component', () => {
    it('Renders the form', () => {
        render(<GameSetup onSubmit={mockHandleSubmit} />);

        expect(screen.getByRole('heading', { name: /game settings/i })).toBeInTheDocument();
        // Check for number input
        expect(screen.getByRole('spinbutton')).toBeInTheDocument();
        // 3 selects (Type / Difficulty / Category)
        const selects = screen.getAllByRole('combobox');
        expect(selects).toHaveLength(3);

        expect(screen.getByRole('option', { name: 'Any' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Multiple Choice' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'True / False' })).toBeInTheDocument();

        expect(screen.getByRole('option', { name: 'Any Difficulty' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Easy' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Medium' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Hard' })).toBeInTheDocument();

        expect(screen.getByRole('option', { name: 'General Knowledge' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Sports' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Any Category' })).toBeInTheDocument()

        expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
    })
})