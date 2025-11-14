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

            // Create the icon element
            const icon = document.createElement('i');
            // service.iconClass contains the Font Awesome classes, e.g., "fas fa-drafting-compass"
            icon.className = service.iconClass;

            // Create the title element
            const title = document.createElement('h3');
            title.textContent = service.title;

            // Create the description element
            const description = document.createElement('p');
            description.textContent = service.description;

            // Append all elements to the card
            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(description);

            // Append the card to the grid container
            serviceGrid.appendChild(card);
        });
    }

    // Start the process
    fetchServices();
});