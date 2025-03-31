document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector("#searchBox");
    const suggestionsContainer = document.querySelector("#searchSuggestions");
    const resultBox = document.querySelector(".result-box");

    searchInput.addEventListener("input", async function() {
        const query = this.value.trim();

        if (query.length === 0) {
            resultBox.style.display = "none";
            return;
        }

        try {
            const response = await fetch(`/listings/search-suggestions?query=${query}`);
            const suggestions = await response.json();

            if (suggestions.length === 0) {
                suggestionsContainer.innerHTML = "<li>No results found</li>";
            } else {
                suggestionsContainer.innerHTML = suggestions.map(suggestion => 
                    `<li onclick="selectSuggestion('${suggestion.title}')">${suggestion.title}</li>`
                ).join("");
            }

            resultBox.style.display = "block";
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener("click", function(event) {
        if (!searchInput.contains(event.target) && !resultBox.contains(event.target)) {
            resultBox.style.display = "none";
        }
    });
});

function selectSuggestion(title) {
    document.querySelector("#searchBox").value = title;
    document.querySelector(".result-box").style.display = "none";
}
