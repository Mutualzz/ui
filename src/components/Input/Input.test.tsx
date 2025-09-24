import { InputNumber } from "@components/InputNumber/InputNumber.web";
import { InputPassword } from "@components/InputPassword/InputPassword.web";
import { render } from "@test-utils";
import { Input } from "./Input.web";

describe("Input", () => {
    it("renders Input as a text by default", () => {
        const { container } = render(<Input type="text" />);
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
