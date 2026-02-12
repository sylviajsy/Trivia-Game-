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
    it('Renders the form and options', () => {
        render(<GameSetup onSubmit={mockHandleSubmit} />);

        expect(screen.getByRole('heading', { name: /game settings/i })).toBeInTheDocument();
        // Check for number input
        expect(screen.getByRole('spinbutton')).toBeInTheDocument();
        // 3 selects (Type / Difficulty / Category)
        const selects = screen.getAllByRole('combobox');
        expect(selects).toHaveLength(3);
        // Type
        expect(screen.getByRole('option', { name: 'Any' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Multiple Choice' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'True / False' })).toBeInTheDocument();
        // Difficulty
        expect(screen.getByRole('option', { name: 'Any Difficulty' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Easy' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Medium' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Hard' })).toBeInTheDocument();
        // Category
        expect(screen.getByRole('option', { name: 'General Knowledge' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Sports' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Any Category' })).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
    })

    it('submits form and calls onSubmit with correct formData', async() => {
        const user = userEvent.setup()
        render(<GameSetup onSubmit={mockHandleSubmit} />);

        // amount input
        const amountInput = screen.getByPlaceholderText(/number of questions/i);
        await user.clear(amountInput);
        await user.type(amountInput, '12');

        const selects = screen.getAllByRole('combobox');
        const typeSelect = selects[0];
        const difficultySelect = selects[1];
        const categorySelect = selects[2];

        await user.selectOptions(typeSelect, 'multiple');
        await user.selectOptions(difficultySelect, 'Medium');
        await user.selectOptions(categorySelect, 'Sports');

        await user.click(screen.getByRole('button', { name: /start game/i }));

        expect(mockHandleSubmit).toHaveBeenCalled();
        console.log(mockHandleSubmit.mock.calls)
        expect(mockHandleSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                amount: '12',
                type: 'multiple',
                difficulty: 'medium',
                category: '21'
        }));
    })
})