import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import AnimalSelector from '../src/components/AnimalSelector';
import { builtinAnimals } from '../src/data/builtinAnimals';

describe('Animal Selection', () => {
  it('should be able to select 9 animals', () => {
    const onSelectionChange = vi.fn();
    const { getByText } = render(
      <AnimalSelector
        selectedAnimals={[]}
        onSelectionChange={onSelectionChange}
        onClose={() => {}}
      />
    );

    for (let i = 0; i < 9; i++) {
      fireEvent.click(getByText(builtinAnimals[i].emoji));
    }

    expect(onSelectionChange).toHaveBeenCalledTimes(9);
  });

  it('should be able to add a custom animal', () => {
    const onSelectionChange = vi.fn();
    const { getByPlaceholderText, getByText } = render(
      <AnimalSelector
        selectedAnimals={[]}
        onSelectionChange={onSelectionChange}
        onClose={() => {}}
      />
    );

    const input = getByPlaceholderText('Enter an emoji');
    fireEvent.change(input, { target: { value: '🦖' } });
    fireEvent.click(getByText('Add'));

    expect(onSelectionChange).toHaveBeenCalledWith([
      { id: '🦖', name: 'Custom', emoji: '🦖', source: 'custom' },
    ]);
  });
});
