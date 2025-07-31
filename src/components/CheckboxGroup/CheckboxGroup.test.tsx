import { Checkbox } from "@components/Checkbox/Checkbox";
import { render } from "@test-utils";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { CheckboxGroup } from "./CheckboxGroup";

describe("CheckboxGroup", () => {
    it("renders without crashing", () => {
        const { getByText } = render(
            <CheckboxGroup>
                <Checkbox label="Option 1" />
                <Checkbox label="Option 2" />
            </CheckboxGroup>,
        );

        expect(getByText("Option 1")).toBeInTheDocument();
        expect(getByText("Option 2")).toBeInTheDocument();
    });

    it("applies controlled value correctly", () => {
        const { getByLabelText } = render(
            <CheckboxGroup value={["option1"]}>
                <Checkbox label="Option 1" value="option1" />
                <Checkbox label="Option 2" value="option2" />
            </CheckboxGroup>,
        );

        expect(getByLabelText("Option 1")).toBeChecked();
        expect(getByLabelText("Option 2")).not.toBeChecked();
    });

    it("calls onChange when a checkbox is checked", async () => {
        const handleChange = jest.fn();
        const user = userEvent.setup();
        const { getByLabelText } = render(
            <CheckboxGroup onChange={handleChange}>
                <Checkbox label="Option 1" value="option1" />
            </CheckboxGroup>,
        );

        const checkbox = getByLabelText("Option 1");

        await act(async () => {
            await user.click(checkbox);
        });

        expect(handleChange).toHaveBeenCalledWith(expect.anything(), [
            "option1",
        ]);
    });

    it("applies default value when uncontrolled", () => {
        const { getByLabelText } = render(
            <CheckboxGroup defaultValue={["option1"]}>
                <Checkbox label="Option 1" value="option1" />
                <Checkbox label="Option 2" value="option2" />
            </CheckboxGroup>,
        );

        expect(getByLabelText("Option 1")).toBeChecked();
        expect(getByLabelText("Option 2")).not.toBeChecked();
    });

    it("disables all checkboxes when disabled prop is true", () => {
        const { getByLabelText } = render(
            <CheckboxGroup disabled>
                <Checkbox label="Option 1" value="option1" />
                <Checkbox label="Option 2" value="option2" />
            </CheckboxGroup>,
        );

        expect(getByLabelText("Option 1")).toBeDisabled();
        expect(getByLabelText("Option 2")).toBeDisabled();
    });

    it("applies row layout when row prop is true", () => {
        const { container } = render(
            <CheckboxGroup row>
                <Checkbox label="Option 1" value="option1" />
                <Checkbox label="Option 2" value="option2" />
            </CheckboxGroup>,
        );

        expect(container.firstChild).toHaveStyle("flex-direction: row");
    });

    it("applies column layout when row prop is false", () => {
        const { container } = render(
            <CheckboxGroup>
                <Checkbox label="Option 1" value="option1" />
                <Checkbox label="Option 2" value="option2" />
            </CheckboxGroup>,
        );

        expect(container.firstChild).toHaveStyle("flex-direction: column");
    });
});
