import { fireEvent, render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom"
import App from "./App";
// import { fireEvent, render, screen } from "./utils/test-utils";
describe('App', () => {

    beforeEach(() => {
        localStorage.clear();
    })

    test('content heading available', () => {
        render(<App />);
        const text = screen.getByText('Add new task, Editing task and Delete the task.');
        expect(text).toBeInTheDocument();
    });
    it('checked Input placeholder and add button', () => {
        render(<App />);
        const inputField = screen.getByRole('textbox'); 
        expect(inputField).toBeInTheDocument();
        fireEvent.change(inputField, { target: { value: 'newTask' } });
        const labelElement = screen.getByText('Type Here');
        expect(labelElement).toBeInTheDocument();
        const addButton = screen.getByText('Add Task');
        fireEvent.click(addButton);
        expect(addButton).toBeInTheDocument();

        expect(screen.getByText('newTask')).toBeInTheDocument();
    });
    it('to check newcomponent have array of list', () => {
        render(<App />)
        const Newcomponent = screen.getByTestId('ListValue');
        expect(Newcomponent).toBeInTheDocument();
    });

})
