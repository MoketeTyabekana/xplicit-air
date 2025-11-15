
/**
 * ============================================================================
 * RESPONSIVE HAMBURGER MENU - JAVASCRIPT
 * ============================================================================
 * 
 * This script handles:
 * - Hamburger menu toggle functionality
 * - Mobile menu open/close animations
 * - Hamburger icon transformation (to 'X')
 * - Menu close on link click
 * - Menu close on outside click
 * - Keyboard accessibility (ESC key)
 * - ARIA attributes management
 */

class HamburgerMenu {
    /**
     * Initialize the hamburger menu
     */
    constructor() {
        // DOM Elements
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.getElementById('nav-links');
        this.navItems = document.querySelectorAll('.nav-links a');

        // State
        this.isMenuOpen = false;

        // Configuration
        this.config = {
            mobileBreakpoint: 768, // CSS breakpoint in pixels
            closeMenuDelay: 300, // Delay before closing menu on link click (ms)
        };

        // Initialize event listeners
        this.init();
    }

    /**
     * Initialize all event listeners
     */
    init() {
        // Hamburger button click
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }

        // Navigation links click
        this.navItems.forEach(link => {
            link.addEventListener('click', () => this.handleLinkClick());
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Close menu on ESC key
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Handle window resize for responsive behavior
        window.addEventListener('resize', () => this.handleResize());
    }

    /**
     * Toggle the mobile menu visibility
     */
    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    /**
     * Open the mobile menu
     */
    openMenu() {
        this.isMenuOpen = true;

        // Add active class to menu
        if (this.navLinks) {
            this.navLinks.classList.add('active');
        }

        // Add active class to hamburger (transforms to X)
        if (this.hamburger) {
            this.hamburger.classList.add('active');
            this.hamburger.setAttribute('aria-expanded', 'true');
        }

        // Prevent body scroll when menu is open
        document.body.classList.add('menu-open');

        console.log('Mobile menu opened');
    }

    /**
     * Close the mobile menu
     */
    closeMenu() {
        this.isMenuOpen = false;

        // Remove active class from menu
        if (this.navLinks) {
            this.navLinks.classList.remove('active');
        }

        // Remove active class from hamburger (transforms back)
        if (this.hamburger) {
            this.hamburger.classList.remove('active');
            this.hamburger.setAttribute('aria-expanded', 'false');
        }

        // Allow body scroll when menu is closed
        document.body.classList.remove('menu-open');

        console.log('Mobile menu closed');
    }

    /**
     * Handle navigation link click
     */
    handleLinkClick() {
        // Only close menu if on mobile view
        if (this.isOnMobileView()) {
            // Add a small delay to allow smooth transition
            setTimeout(() => {
                this.closeMenu();
            }, this.config.closeMenuDelay);
        }
    }

    /**
     * Handle outside click to close menu
     */
    handleOutsideClick(event) {
        // Only on mobile view
        if (!this.isOnMobileView()) {
            return;
        }

        // Check if click is outside the header
        const header = document.querySelector('header');
        const isClickInsideHeader = header && header.contains(event.target);

        // Close menu if click is outside header and menu is open
        if (!isClickInsideHeader && this.isMenuOpen) {
            this.closeMenu();
        }
    }

    /**
     * Handle keyboard events (ESC key)
     */
    handleKeyDown(event) {
        // Close menu on ESC key
        if (event.key === 'Escape' && this.isMenuOpen) {
            this.closeMenu();
            // Return focus to hamburger button
            if (this.hamburger) {
                this.hamburger.focus();
            }
        }
    }

    /**
     * Handle window resize for responsive behavior
     */
    handleResize() {
        // Close menu if resizing to desktop view
        if (!this.isOnMobileView() && this.isMenuOpen) {
            this.closeMenu();
        }
    }

    /**
     * Check if currently on mobile view
     */
    isOnMobileView() {
        return window.innerWidth < this.config.mobileBreakpoint;
    }

    /**
     * Get current menu state
     */
    getMenuState() {
        return {
            isOpen: this.isMenuOpen,
            isMobileView: this.isOnMobileView(),
            windowWidth: window.innerWidth,
        };
    }

    /**
     * Destroy the menu instance (cleanup)
     */
    destroy() {
        if (this.hamburger) {
            this.hamburger.removeEventListener('click', () => this.toggleMenu());
        }

        this.navItems.forEach(link => {
            link.removeEventListener('click', () => this.handleLinkClick());
        });

        document.removeEventListener('click', (e) => this.handleOutsideClick(e));
        document.removeEventListener('keydown', (e) => this.handleKeyDown(e));
        window.removeEventListener('resize', () => this.handleResize());

        document.body.classList.remove('menu-open');
    }
}

/**
 * Initialize the hamburger menu when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    window.hamburgerMenu = new HamburgerMenu();
    console.log('Hamburger Menu initialized');
});

/**
 * ============================================================================
 * OPTIONAL: DEBUGGING & DEVELOPMENT UTILITIES
 * ============================================================================
 */

/**
 * Log menu state for debugging
 */
function logMenuState() {
    if (window.hamburgerMenu) {
        console.log('Menu State:', window.hamburgerMenu.getMenuState());
    }
}

/**
 * Simulate window resize for testing responsive behavior
 */
function simulateResize(width) {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
    console.log(`Simulated resize to ${width}px`);
}

// Make utility functions available in console for debugging
window.logMenuState = logMenuState;
