import { describe, beforeEach, it, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { ToggleButton } from './toggle-button';

describe('Toggle Button', () => {
	beforeEach(() => {
		render(<ToggleButton />);
	});
	afterEach(cleanup);

	it('should have text', () => {
		screen.getAllByText('Test');
	});
});
