document.addEventListener('DOMContentLoaded', function() {
    // Initialize search functionality
    initSearch();
});

// Initialize search
function initSearch() {
    const searchForm = document.getElementById('search-form');
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm.length > 0) {
            performSearch(searchTerm);
        } else {
            alert('يرجى إدخال كلمة للبحث عنها');
        }
    });
}

// Perform search
function performSearch(searchTerm) {
    // In a real implementation, this would make an API call to the server
    // For this demo, we'll use sample data
    
    const searchResults = getSearchResults(searchTerm);
    showSearchResults(searchResults, searchTerm);
}

// Get search results (mock implementation)
function getSearchResults(searchTerm) {
    // Sample news database (in a real app, this would be fetched from a server)
    const newsDatabase = [
        {
            id: 1,
            title: "اجتماع قمة دولي لمناقشة التحديات الاقتصادية العالمية",
            excerpt: "بدأت اليوم أعمال القمة الدولية لمناقشة التحديات الاقتصادية العالمية بمشاركة قادة أكثر من 20 دولة.",
            category: "سياسة",
            date: "2025-02-10",
            comments: 15,
            views: 1200
        },
        {
            id: 2,
            title: "ارتفاع أسعار النفط بنسبة 5% مع تزايد الطلب العالمي",
            excerpt: "سجلت أسعار النفط ارتفاعاً ملحوظاً في الأسواق العالمية وسط توقعات بزيادة الطلب خلال الفترة المقبلة.",
            category: "اقتصاد",
            date: "2025-02-09",
            comments: 8,
            views: 950
        },
        {
            id: 3,
            title: "المنتخب الوطني يستعد للمشاركة في البطولة القارية القادمة",
            excerpt: "يواصل المنتخب الوطني تدريباته المكثفة استعداداً للمشاركة في البطولة القارية التي ستنطلق الشهر المقبل.",
            category: "رياضة",
            date: "2025-02-08",
            comments: 23,
            views: 1500
        },
        {
            id: 4,
            title: "افتتاح معرض للفنون التشكيلية بمشاركة فنانين من مختلف الدول",
            excerpt: "افتتح أمس معرض للفنون التشكيلية في العاصمة بمشاركة أكثر من 50 فناناً من مختلف دول العالم.",
            category: "ثقافة",
            date: "2025-02-07",
            comments: 5,
            views: 780
        },
        {
            id: 5,
            title: "تقرير خاص: تأثير التغيرات المناخية على المنطقة",
            excerpt: "في تقرير خاص، نستعرض التأثيرات المحتملة للتغيرات المناخية على المنطقة وسبل مواجهتها.",
            category: "تقارير خاصة",
            date: "2025-02-06",
            comments: 12,
            views: 1100
        },
        {
            id: 6,
            title: "البنك المركزي يخفض أسعار الفائدة لتحفيز النمو الاقتصادي",
            excerpt: "قرر البنك المركزي خفض أسعار الفائدة بنسبة 0.5% في خطوة تهدف إلى تحفيز النمو الاقتصادي ودعم الاستثمار.",
            category: "اقتصاد",
            date: "2025-02-05",
            comments: 18,
            views: 1300
        },
        {
            id: 7,
            title: "إطلاق برنامج وطني لدعم المشاريع الصغيرة والمتوسطة",
            excerpt: "أعلنت الحكومة عن إطلاق برنامج وطني جديد لدعم المشاريع الصغيرة والمتوسطة وتعزيز دورها في التنمية الاقتصادية.",
            category: "اقتصاد",
            date: "2025-02-04",
            comments: 10,
            views: 900
        },
        {
            id: 8,
            title: "اختتام فعاليات المهرجان السينمائي الدولي بتكريم الفائزين",
            excerpt: "اختتمت أمس فعاليات المهرجان السينمائي الدولي بحفل ختامي كبير تم خلاله تكريم الأفلام والفنانين الفائزين.",
            category: "ثقافة",
            date: "2025-02-03",
            comments: 7,
            views: 850
        }
    ];
    
    // Filter results based on search term
    const results = newsDatabase.filter(item => {
        const searchRegex = new RegExp(searchTerm, 'i');
        return searchRegex.test(item.title) || searchRegex.test(item.excerpt) || searchRegex.test(item.category);
    });
    
    return results;
}

// Show search results
function showSearchResults(results, searchTerm) {
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsModal = new bootstrap.Modal(document.getElementById('searchResultsModal'));
    
    if (searchResultsContainer) {
        // Clear previous results
        searchResultsContainer.innerHTML = '';
        
        if (results.length > 0) {
            // Update modal title
            document.getElementById('searchResultsModalLabel').textContent = `نتائج البحث عن: ${searchTerm} (${results.length})`;
            
            // Add results to container
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                
                const date = new Date(result.date);
                const formattedDate = date.toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                resultItem.innerHTML = `
                    <h4>${result.title}</h4>
                    <p>${result.excerpt}</p>
                    <div class="search-result-meta">
                        <span class="category-badge">${result.category}</span>
                        <span><i class="far fa-calendar"></i> ${formattedDate}</span>
                        <span><i class="far fa-comment"></i> ${result.comments} تعليق</span>
                        <span><i class="far fa-eye"></i> ${result.views} مشاهدة</span>
                    </div>
                `;
                
                // Add click handler to navigate to the article
                resultItem.addEventListener('click', function() {
                    // In a real implementation, this would navigate to the article page
                    alert(`سيتم الانتقال إلى المقال: ${result.title}`);
                    searchResultsModal.hide();
                });
                
                searchResultsContainer.appendChild(resultItem);
            });
        } else {
            // No results found
            document.getElementById('searchResultsModalLabel').textContent = `نتائج البحث عن: ${searchTerm}`;
            
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <p class="text-center py-4">لا توجد نتائج مطابقة لـ "${searchTerm}"</p>
            `;
            
            searchResultsContainer.appendChild(noResults);
        }
        
        // Show the modal
        searchResultsModal.show();
    }
}