document.addEventListener('DOMContentLoaded', function() {

    // Sound effect for the main button (optional)
    const ctaButton = document.querySelector('.cta-button');
    // Uncomment the lines below to add a dragon roar sound on click
    // const dragonRoar = new Audio('URL_TO_DRAGON_ROAR_SOUND.mp3'); // You need to provide a URL for a sound file
    // ctaButton.addEventListener('click', (e) => {
    //     // Optional: prevent navigation until sound plays
    //     // e.preventDefault(); 
    //     dragonRoar.play();
    //     // Optional: delay navigation to allow sound to play
    //     // setTimeout(() => { window.open(e.target.href, '_blank'); }, 500);
    // });

    // Animate content sections on scroll
    const sections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });

});
