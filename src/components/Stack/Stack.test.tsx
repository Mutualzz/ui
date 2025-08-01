import { render } from "@test-utils";
import { Stack } from "./Stack";

describe("Stack", () => {
    it("renders without crashing", () => {
        const { container } = render(<Stack>Test</Stack>);
        expect(container).toBeInTheDocument();
    });

    it("applies block display by default", () => {
        const { container } = render(<Stack>Test</Stack>);
        expect(container.firstChild).toHaveStyle("display: flex");
    });

    it("applies inline-block display when inline prop is true", () => {
        const { container } = render(<Stack inline>Test</Stack>);
        expect(container.firstChild).toHaveStyle("display: inline-flex");
    });

    it("can accept system props", () => {
        const { container } = render(<Stack m={16}>Test</Stack>);
        expect(container.firstChild).toHaveStyle("margin: 16px");
    });

    it("accepts mutliple system props", () => {
        const { container } = render(
            <Stack m={16} p={8}>
                Test
            </Stack>,
        );

        const box = container.firstChild;
        expect(box).toHaveStyle("margin: 16px");
        expect(box).toHaveStyle("padding: 8px");
    });

    it("renders as a div element", () => {
        const { container } = render(<Stack>Test</Stack>);
        expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });

    it("renders children correctly", () => {
        const { getByText } = render(
            <Stack>
                <span>Child Element</span>
            </Stack>,
        );
        expect(getByText("Child Element")).toBeInTheDocument();
    });

    it("forwards HTML attributes", () => {
        const { container } = render(
            <Stack
                data-testid="test-box"
                aria-label="Test Stack"
                className="custom-class"
            >
                Test
            </Stack>,
        );

        const box = container.firstChild;
        expect(box).toHaveAttribute("data-testid", "test-box");
        expect(box).toHaveAttribute("aria-label", "Test Stack");
        expect(box).toHaveClass("custom-class");
    });
});
