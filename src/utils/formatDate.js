//input = 2024-05-24T15:00:00Z ;; output = May 24, 2024

export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
}
