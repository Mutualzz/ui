import { InputNumber } from "@components/web/InputNumber/InputNumber";
import { InputPassword } from "@components/web/InputPassword/InputPassword";
import { render } from "@test-utils";
import { Input } from "./Input";

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
