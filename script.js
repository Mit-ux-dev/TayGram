document.addEventListener('DOMContentLoaded', () => {
    const posts = document.querySelectorAll('.post-content');
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.querySelector('.close');

    // Open modal on post click
    posts.forEach(post => {
        post.addEventListener('click', () => {
            const type = post.getAttribute('data-type');
            const src = post.getAttribute('data-src');

            if (type === 'image') {
                modalImage.src = src;
                modalImage.style.display = 'block';
                modalVideo.style.display = 'none';
            } else if (type === 'video') {
                modalVideo.src = src;
                modalVideo.style.display = 'block';
                modalImage.style.display = 'none';
            }

            modal.style.display = 'flex';
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        modalVideo.pause();
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalVideo.pause();
        }
    });
});