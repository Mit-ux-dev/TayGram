document.addEventListener('DOMContentLoaded', () => {
    const posts = document.querySelectorAll('.post-content');
    const modal = document.getElementById('mediaModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close');
    const downloadButtons = document.querySelectorAll('.download-btn');
    const searchInput = document.getElementById('searchInput');
    const postElements = document.querySelectorAll('.post');

    // Open modal on post click
    posts.forEach(post => {
        post.addEventListener('click', () => {
            const type = post.getAttribute('data-type');
            const src = post.getAttribute('data-src');

            if (type === 'image') {
                modalContent.innerHTML = `<img id="modalImage" src="${src}" alt="Full Image" style="display: block;">`;
            } else if (type === 'video') {
                if (src.includes('streamable.com')) {
                    modalContent.innerHTML = `<iframe src="https://streamable.com/e/${src.split('/').pop()}?loop=0" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
                } else {
                    modalContent.innerHTML = `<video id="modalVideo" controls><source src="${src}" type="video/mp4"></video>`;
                }
            }

            modal.style.display = 'flex';
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        modalContent.innerHTML = `<img id="modalImage" src="" alt="Full Image"><video id="modalVideo" controls><source src="" type="video/mp4"></video>`;
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalContent.innerHTML = `<img id="modalImage" src="" alt="Full Image"><video id="modalVideo" controls><source src="" type="video/mp4"></video>`;
        }
    });

    // Download button functionality
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const src = button.getAttribute('data-src');
            const link = document.createElement('a');
            link.href = src;
            link.download = src.includes('streamable.com') ? '' : src.split('/').pop();
            link.target = src.includes('streamable.com') ? '_blank' : '_self';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            postElements.forEach(post => {
                const description = post.querySelector('.description').textContent.toLowerCase();
                if (query === '' || description.includes(query) || description.includes(query.replace('#', ''))) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Log resource loading errors
    window.addEventListener('error', (event) => {
        if (event.target.tagName === 'IMG' || event.target.tagName === 'LINK' || event.target.tagName === 'SCRIPT') {
            console.error(`Failed to load resource: ${event.target.src || event.target.href}`);
        }
    }, true);
});
