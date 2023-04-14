import { describe, beforeEach, it, afterEach, vi, expect } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ToggleButton } from './toggle-button';

describe('Toggle Button', () => {
	afterEach(cleanup);

	it('should init with onState ClassName', () => {
		render(<ToggleButton init={true} action={vi.fn()} />);
		const toggleBtn = screen.getByRole('button');
		expect(toggleBtn.className).toContain('onState');
	});

	it('should have only one child', () => {
		render(<ToggleButton action={vi.fn()} />);
		const toggleBtn = screen.getByRole('button');
		expect(toggleBtn.children.length).toBe(1);
	});
});

describe('Toggle Button with all Props', () => {
	const actionMock = vi.fn();
	const mockProps = {
		action: actionMock,
		init: true,
		onImg: <img src="on.png" alt="on" />,
		offImg: <img src="off.png" alt="off" />,
	};
	beforeEach(() => {
		render(<ToggleButton {...mockProps} />);
	});
	afterEach(cleanup);

	it('should render a button', () => {
		screen.getByRole('button');
	});

	it('displays on/off images when provided', () => {
		screen.getByAltText('on');
		screen.getByAltText('off');
		const toggleBtn = screen.getByRole('button');
		expect(toggleBtn.children.length).toBe(3);
	});

	it('should toggle class when clicked', () => {
		const toggleBtn = screen.getByRole('button');
		expect(toggleBtn.className).toContain('onState');
		fireEvent.click(toggleBtn);
		expect(toggleBtn.className).toContain('offState');
		expect(actionMock).toHaveBeenCalledOnce();
	});
});
