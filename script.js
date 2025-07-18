document.addEventListener('DOMContentLoaded', function() {

    // ======================================================
    // ======================================================
    const repoOwner = 'harold1s';
    const repoName = 'Fireandblood';
    const filePath = 'news.json';
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    const newsContainer = document.getElementById('news-container');

    if (newsContainer) {
        const loadingMessage = newsContainer.querySelector('.loading-message');

        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`فشل الاتصال بـ GitHub: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                
                const decodedContent = decodeURIComponent(escape(window.atob(data.content)));
                const newsItems = JSON.parse(decodedContent);

                if (loadingMessage) {
                    loadingMessage.remove();
                }

                if (newsItems.length === 0) {
                    newsContainer.innerHTML = '<p>لا توجد أخبار حالياً.</p>';
                    return;
                }

                newsItems.forEach(item => {
                    const newsCard = document.createElement('div');
                    newsCard.classList.add('news-card');
                    newsCard.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.title}">
                        <h3>${item.title}</h3>
                        <p>${item.content}</p>
                    `;
                    newsContainer.appendChild(newsCard);
                });
            })
            .catch(error => {
                console.error('حدث خطأ:', error);
                if (loadingMessage) {
                    loadingMessage.textContent = 'عفواً، فشل تحميل الأخبار.';
                }
            });
    }


    // ======================================================
    // التأثيرات
    // ======================================================
    const ctaButton = document.querySelector('.cta-button');
    

    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

});
