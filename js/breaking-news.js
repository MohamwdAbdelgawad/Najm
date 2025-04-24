document.addEventListener('DOMContentLoaded', function() {
    // Initialize breaking news ticker
    initBreakingNewsTicker();
    
    // Sample breaking news items (in a real app, these would come from a server)
    const breakingNewsItems = [
        "تطورات جديدة في المحادثات الدبلوماسية بين القوى العالمية",
        "ارتفاع مؤشرات البورصة المحلية بنسبة 3% في ختام جلسة اليوم",
        "الفريق الوطني يتأهل للدور النهائي بعد فوز ساحق في المباراة الأخيرة",
        "إطلاق مبادرة وطنية جديدة لدعم الثقافة والفنون في البلاد",
        "افتتاح معرض دولي للتكنولوجيا بمشاركة شركات عالمية",
        "قرارات جديدة للحكومة لدعم القطاع الاقتصادي ومواجهة التحديات",
        "وزير الخارجية يلتقي نظراءه لبحث القضايا الإقليمية المشتركة",
        "إنجاز علمي جديد لباحثين محليين في مجال الطب والتكنولوجيا الحيوية"
    ];
    
    // Update breaking news items every 10 minutes (in a real app, this would be with fresh data from server)
    setInterval(function() {
        updateBreakingNewsItems(breakingNewsItems);
    }, 600000); // 10 minutes
});

// Initialize breaking news ticker
function initBreakingNewsTicker() {
    const ticker = document.getElementById('breaking-news-list');
    if (!ticker) return;
    
    // Clone first few items and append to the end to create a seamless loop
    const items = ticker.querySelectorAll('li');
    if (items.length > 0) {
        for (let i = 0; i < Math.min(3, items.length); i++) {
            const clone = items[i].cloneNode(true);
            ticker.appendChild(clone);
        }
    }
    
    // Adjust animation duration based on the number of items
    const tickerWidth = ticker.scrollWidth;
    const animationDuration = Math.max(15, tickerWidth / 100); // Adjust speed as needed
    ticker.style.animationDuration = animationDuration + 's';
}

// Update breaking news items (simulate new data coming in)
function updateBreakingNewsItems(newsItems) {
    const ticker = document.getElementById('breaking-news-list');
    if (!ticker) return;
    
    // Shuffle the array to get "new" news
    const shuffled = [...newsItems].sort(() => 0.5 - Math.random());
    const selectedItems = shuffled.slice(0, 5); // Take first 5 items
    
    // Clear the ticker
    ticker.innerHTML = '';
    
    // Add the new items
    selectedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ticker.appendChild(li);
    });
    
    // Clone the first few for continuous scrolling
    for (let i = 0; i < Math.min(3, selectedItems.length); i++) {
        const clone = ticker.querySelectorAll('li')[i].cloneNode(true);
        ticker.appendChild(clone);
    }
    
    // Reset the animation
    ticker.style.animation = 'none';
    ticker.offsetHeight; // Trigger reflow
    const tickerWidth = ticker.scrollWidth;
    const animationDuration = Math.max(15, tickerWidth / 100);
    ticker.style.animation = `ticker ${animationDuration}s linear infinite`;
}