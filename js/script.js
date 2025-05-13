// Theme switching functionality
const themeSwitch = document.getElementById( 'theme-switch' );
const prefersDarkScheme = window.matchMedia( '(prefers-color-scheme: dark)' );

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem( 'theme' ) ||
    ( prefersDarkScheme.matches ? 'dark' : 'light' );

// Apply the theme
document.documentElement.setAttribute( 'data-theme', currentTheme );

// Theme switch click handler
themeSwitch.addEventListener( 'click', () =>
{
    const newTheme = document.documentElement.getAttribute( 'data-theme' ) === 'dark'
        ? 'light'
        : 'dark';

    document.documentElement.setAttribute( 'data-theme', newTheme );
    localStorage.setItem( 'theme', newTheme );
} );

// Smooth scrolling for navigation links
document.querySelectorAll( 'a[href^="#"]' ).forEach( anchor =>
{
    anchor.addEventListener( 'click', function ( e )
    {
        e.preventDefault();
        const target = document.querySelector( this.getAttribute( 'href' ) );
        if ( target )
        {
            target.scrollIntoView( {
                behavior: 'smooth',
                block: 'start'
            } );
        }
    } );
} );

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver( ( entries ) =>
{
    entries.forEach( entry =>
    {
        if ( entry.isIntersecting )
        {
            entry.target.classList.add( 'animate' );
            observer.unobserve( entry.target );
        }
    } );
}, observerOptions );

// Observe elements with animation classes
document.querySelectorAll( '.service-card, .about-content, .contact-form' ).forEach( el =>
{
    observer.observe( el );
} );

// Form submission handling
const contactForm = document.querySelector( '.contact-form' );
if ( contactForm )
{
    contactForm.addEventListener( 'submit', ( e ) =>
    {
        e.preventDefault();
        // Add your form submission logic here
        alert( 'Thank you for your message! I will get back to you soon.' );
        contactForm.reset();
    } );
}

// Mobile menu handling
const menu = document.querySelector( '.menu' );
const menuItems = document.querySelectorAll( '.menu ul li a' );

// Add click event to menu items to close mobile menu
menuItems.forEach( item =>
{
    item.addEventListener( 'click', () =>
    {
        if ( window.innerWidth <= 768 )
        {
            menu.classList.remove( 'active' );
        }
    } );
} );

// Add mobile menu toggle button
const mobileMenuBtn = document.createElement( 'button' );
mobileMenuBtn.classList.add( 'mobile-menu-btn' );
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
menu.insertBefore( mobileMenuBtn, menu.firstChild );

mobileMenuBtn.addEventListener( 'click', () =>
{
    menu.classList.toggle( 'active' );
} );
// home
// ... existing code ...

// Typing Animation
const typingText = document.querySelector( '.typing-text' );
const words = [ 'Web Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function type ()
{
    const currentWord = words[ wordIndex ];

    if ( isDeleting )
    {
        typingText.textContent = currentWord.substring( 0, charIndex - 1 );
        charIndex--;
        typingDelay = 100;
    } else
    {
        typingText.textContent = currentWord.substring( 0, charIndex + 1 );
        charIndex++;
        typingDelay = 200;
    }

    if ( !isDeleting && charIndex === currentWord.length )
    {
        isDeleting = true;
        typingDelay = 1500; // Pause at end of word
    } else if ( isDeleting && charIndex === 0 )
    {
        isDeleting = false;
        wordIndex = ( wordIndex + 1 ) % words.length;
        typingDelay = 500; // Pause before typing next word
    }

    setTimeout( type, typingDelay );
}

// Start typing animation when page loads
window.addEventListener( 'load', () =>
{
    setTimeout( type, 1000 );
} );
