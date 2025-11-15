document.addEventListener('DOMContentLoaded', () => {
    const serviceGrid = document.getElementById('service-grid-container');

    // Function to fetch the JSON data
    async function fetchServices() {
        try {
            const response = await fetch('services.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const services = await response.json();
            renderServices(services);
        } catch (error) {
            console.error("Could not fetch services:", error);
            // Optionally display an error message to the user
            serviceGrid.innerHTML = '<p>Error loading services. Please try again later.</p>';
        }
    }

    // Function to render the service cards
    function renderServices(services) {
        serviceGrid.innerHTML = ''; // Clear any existing content

        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';

            // Create the illustration image element
            const illustration = document.createElement('img');
            illustration.src = service.imagePath;
            illustration.alt = service.title;
            illustration.className = 'service-illustration';

            // Create the title element
            const title = document.createElement('h3');
            title.textContent = service.title;

            // Create the description element
            const description = document.createElement('p');
            description.textContent = service.description;

            // Create content wrapper for text
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'service-card-content';
            contentWrapper.appendChild(title);
            contentWrapper.appendChild(description);

            // Append all elements to the card
            card.appendChild(illustration);
            card.appendChild(contentWrapper);

            // Append the card to the grid container
            serviceGrid.appendChild(card);
        });
    }

    // Start the process
    fetchServices();
});