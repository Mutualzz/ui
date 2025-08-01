import { render } from "@test-utils";
import { IconWrapper } from "./IconWrapper";

describe("IconWrapper", () => {
    it("renders without crashing", () => {
        const { container } = render(
            <IconWrapper position="start">Icon</IconWrapper>,
        );
        expect(container).toBeInTheDocument();
    });

    it("applies correct styles for start position", () => {
        const { container } = render(
            <IconWrapper position="start">Icon</IconWrapper>,
        );

        expect(container.firstChild).toHaveStyle({
            marginRight: "0.25em",
        });
    });

    it("applies correct styles for end position", () => {
        const { container } = render(
            <IconWrapper position="end">Icon</IconWrapper>,
        );

        expect(container.firstChild).toHaveStyle({
            marginLeft: "0.25em",
        });
    });
});
