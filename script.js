document.addEventListener('DOMContentLoaded', function() {
  // Menu toggle behavior
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Hero slideshow
  const slides = document.querySelectorAll('.slide');
  let current = 0;
  function showSlide(i) {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
  }
  showSlide(0);
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 4200);

  // Pause carousel on hover
  const carousel = document.querySelector('.carousel-track');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => { carousel.style.animationPlayState = 'paused'; });
    carousel.addEventListener('mouseleave', () => { carousel.style.animationPlayState = 'running'; });
  }

  // Initialize EmailJS (placeholder)
  if (typeof emailjs !== 'undefined') {
    try { emailjs.init('F_qgaPr8qP2hXYLQy'); } catch(e) { console.warn(e); }
  }

  // Donation form (Paystack integration placeholder)
  const donationForm = document.getElementById('donationForm');
  if (donationForm) {
    donationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('donorName').value;
      const email = document.getElementById('donorEmail').value;
      const amount = Number(document.getElementById('donationAmount').value) * 100;
      if (!name || !email || !amount) { showModal('Please fill all fields'); return; }
      if (typeof PaystackPop === 'undefined') { showModal('Paystack script not loaded. Replace placeholders with your keys.'); return; }

      let handler = PaystackPop.setup({
        key: 'pk_test_fc818ae2afe0dff2a92133617cc56b37904414ed',
        email: email,
        amount: amount,
        currency: 'GHS',
        metadata: { custom_fields: [{ display_name: 'Donor Name', variable_name: 'donor_name', value: name }] },
        callback: function(response) {
          showModal('Thank you ' + name + '! Donation successful. Ref: ' + response.reference);
          donationForm.reset();
        },
        onClose: function() { showModal('Payment cancelled'); }
      });
      handler.openIframe();
    });
  }

  // Contact form (demo: sends via EmailJS if configured)
  /*const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;
      if (!name || !email || !message) { alert('Please fill all fields'); return; }
      if (typeof emailjs !== 'undefined') {
        emailjs.send('service_2zqg2xr', 'template_1w2a50d', { from_name: name, from_email: email, message: message })
          .then(() => alert('Message sent! Thank you.'))
          .catch(() => alert('Failed to send message. Check console for details.'));
      } else {
        console.log('Contact form (demo):', { name, email, message });
        alert('Thanks — your message has been recorded (demo).');
      }
      contactForm.reset();
    });
  }*/

});