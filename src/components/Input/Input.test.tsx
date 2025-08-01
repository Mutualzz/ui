import { render } from "@test-utils";
import { Input } from "./Input";

describe("Input", () => {
    it("renders InputText as the default", () => {
        const { container } = render(<Input />);
        expect(container).toBeInTheDocument();
        expect(
            container.querySelector("input[type='text']"),
        ).toBeInTheDocument();
    });

    it("renders InputNumber when type is 'number'", () => {
        const { container } = render(<Input type="number" />);
        expect(container).toBeInTheDocument();
        expect(
            container.querySelector("input[type='number']"),
        ).toBeInTheDocument();
    });

    it("renders InputPassword when type is 'password'", () => {
        const { container } = render(<Input type="password" />);
        expect(container).toBeInTheDocument();
        expect(
            container.querySelector("input[type='password']"),
        ).toBeInTheDocument();
    });
});
