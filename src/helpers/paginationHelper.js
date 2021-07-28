export function itemRender(current, type, originalElement) {
    if (type === "prev") {
        return <div>Previous</div>;
    }
    if (type === "next") {
        return <div>Next</div>;
    }
    return originalElement;
}
