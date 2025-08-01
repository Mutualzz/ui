import { render } from "@test-utils";
import { CircularProgress } from "./CircularProgress";

describe("CircularProgress", () => {
    it("renders without crashing", () => {
        const { container } = render(<CircularProgress />);
        expect(container).toBeInTheDocument();
    });
});
