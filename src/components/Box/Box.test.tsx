import { render } from "@test-utils";
import { Box } from "./Box";

describe("Box", () => {
    it("renders without crashing", () => {
        const { container } = render(<Box>Test</Box>);
        expect(container).toBeInTheDocument();
    });

    it("applies block display by default", () => {
        const { container } = render(<Box>Test</Box>);
        expect(container.firstChild).toHaveStyle("display: block");
    });

    it("applies inline-block display when inline prop is true", () => {
        const { container } = render(<Box inline>Test</Box>);
        expect(container.firstChild).toHaveStyle("display: inline-block");
    });

    it("can accept system props", () => {
        const { container } = render(<Box m={16}>Test</Box>);
        expect(container.firstChild).toHaveStyle("margin: 16px");
    });
});
