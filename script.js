/* =========================================================
   SV MODS — SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    const categoryButtons = document.querySelectorAll(".category");
    const modCards = document.querySelectorAll(".mod-card");

    const modsCount = document.getElementById("modsCount");
    const noResults = document.getElementById("noResults");

    let currentCategory = "all";


    /* =====================================================
       FILTER MODS
       ===================================================== */

    function filterMods() {

        const searchText = searchInput.value
            .trim()
            .toLowerCase();

        let visibleMods = 0;

        modCards.forEach(card => {

            const name = card.dataset.name.toLowerCase();
            const category = card.dataset.category.toLowerCase();

            const matchesSearch =
                searchText === "" ||
                name.includes(searchText);

            const matchesCategory =
                currentCategory === "all" ||
                category === currentCategory;

            if (matchesSearch && matchesCategory) {

                card.classList.remove("hidden");

                visibleMods++;

            } else {

                card.classList.add("hidden");

            }

        });


        /* =================================================
           UPDATE COUNTER
           ================================================= */

        modsCount.textContent =
            `${visibleMods} ${
                visibleMods === 1
                    ? "мод"
                    : visibleMods < 5
                        ? "мода"
                        : "модов"
            }`;


        /* =================================================
           NO RESULTS
           ================================================= */

        if (visibleMods === 0) {

            noResults.classList.remove("hidden");

        } else {

            noResults.classList.add("hidden");

        }

    }


    /* =====================================================
       SEARCH INPUT
       ===================================================== */

    searchInput.addEventListener("input", () => {

        filterMods();

    });


    /* =====================================================
       SEARCH BUTTON
       ===================================================== */

    searchButton.addEventListener("click", () => {

        filterMods();

        document
            .getElementById("mods")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


    /* =====================================================
       ENTER TO SEARCH
       ===================================================== */

    searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            filterMods();

            document
                .getElementById("mods")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    });


    /* =====================================================
       CATEGORY FILTER
       ===================================================== */

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            currentCategory =
                button.dataset.category;

            filterMods();

            document
                .getElementById("mods")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        });

    });


    /* =====================================================
       DOWNLOAD BUTTON FEEDBACK
       ===================================================== */

    const downloadButtons =
        document.querySelectorAll(".download-button");

    downloadButtons.forEach(button => {

        button.addEventListener("click", () => {

            const originalText =
                button.innerHTML;

            button.innerHTML =
                `Скачивание... <span>↓</span>`;

            button.style.pointerEvents = "none";

            setTimeout(() => {

                button.innerHTML =
                    originalText;

                button.style.pointerEvents = "";

            }, 1500);

        });

    });


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    filterMods();

});