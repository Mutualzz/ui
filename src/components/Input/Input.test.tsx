import { render } from "@test-utils";
import { InputNumber, InputPassword, InputText } from "./Input";

describe("Input", () => {
    it("renders InputText as the default", () => {
        const { container } = render(<InputText type="text" />);
        expect(container).toBeInTheDocument();
        expect(
            container.querySelector("input[type='text']"),
        ).toBeInTheDocument();
    });

    it("renders InputNumber when type is 'number'", () => {
        const { container } = render(<InputNumber />);
        expect(container).toBeInTheDocument();
        expect(
            container.querySelector("input[type='number']"),
        ).toBeInTheDocument();
    });

    it("renders InputPassword when type is 'password'", () => {
        const { container } = render(<InputPassword />);
        expect(container).toBeInTheDocument();
        expect(
            container.querySelector("input[type='password']"),
        ).toBeInTheDocument();
    });
});
