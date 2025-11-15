document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('customModal');
        const modalMsg = document.getElementById('modalMessage');
        const modalClose = document.getElementById('modalClose');

    if(!modal || !modalMsg || !modalClose) {
        console.error('Modal elements not found in the DOM!');
    }

    window.showModal = function(message) {
        modalMsg.textContent = message;
        modal.classList.remove('hidden');
    }

    modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' || e.key === 'Enter') {
            modal.classList.add('hidden');
        }
    });
});