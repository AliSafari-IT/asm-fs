import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function ScrollingButtons() {
    const scrollToTop = () => {
        console.log("Button clicked...");
        console.log("Scrolling to top...");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        console.log("Button clicked...");
        console.log("Scrolling to bottom...");
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <div className="scroll-btn-container">
            <button
                className="scroll-btn inverted p-2 md:p-3 rounded-full shadow-lg hover:bg-teams-purple-dark transition duration-200"
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <FaArrowUp className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
                className="scroll-btn inverted p-2 md:p-3 rounded-full shadow-lg hover:bg-teams-purple-light transition duration-200"
                onClick={scrollToBottom}
                aria-label="Scroll to bottom"
            >
                <FaArrowDown className="w-4 h-4 md:w-5 md:h-5" />
            </button>
        </div>
    );
}

export default ScrollingButtons;
