import { fireEvent, render, screen } from "@testing-library/react"
import NewComponent from "../component/NewComponent"
import { Props } from "../component/NewComponent"
import userEvent from "@testing-library/user-event"
describe("NewComponent", () => {
    const mockFn = vi.fn()
    const mockarray = ['1', '2', 'v']
    const ComponentProps: Props = {
        array: mockarray,
        setArray: mockFn
    }
    // const updatedTasks = ['Updated Task 1', 'Updated Task 2', 'Updated Task 3'];

    it('List Item checking', () => {
        render(<NewComponent {...ComponentProps} />);
        const value = screen.getByText(mockarray[1]);
        expect(value).toBeInTheDocument();
    });

    it("edit a row", async () => {
        const user = userEvent.setup()
        const container = render(<NewComponent {...ComponentProps} />);
        const editBtn = container.queryAllByText("Edit");
        expect(editBtn).toHaveLength(mockarray.length);
        fireEvent.click(editBtn[0]);
        const firstInput = await container.findByTestId('input-0');
        expect(firstInput).toHaveValue(mockarray[0]);
        await user.type(firstInput, "hello world")
        fireEvent.click(container.getByText("Save"))
        expect(mockFn).toHaveBeenCalledWith(["1hello world", "2", "v"])
        expect(firstInput).not.toBeInTheDocument();
        const delbtn = container.queryAllByText('Delete');
        expect(delbtn).toHaveLength(mockarray.length);
        fireEvent.click(delbtn[0]);
      
        
    });

})