
    // === Your video data (replace/add your own) ===
    const videos = [
      { id: 1, title: 'Wednesday: Season 2 | Official Trailer | Netflix', embed: 'https://www.youtube.com/embed/03u4xyj0TH4', thumb: 'https://i.ytimg.com/vi/03u4xyj0TH4/hqdefault.jpg', channel: 'Netflix', 'views': '10M views' },
      { id: 2, title: 'Maanu - Jhol (Acoustic)', embed: 'https://www.youtube.com/embed/BWczaSneA0Q', thumb: 'https://i.ytimg.com/vi/BWczaSneA0Q/hqdefault.jpg', channel: 'Maanu', 'views': '56M views' },
      { id: 3, title: 'Afusic - Pal Pal (Official Music Video)', embed: 'https://www.youtube.com/embed/8of5w7RgcTc', thumb: 'https://i.ytimg.com/vi/8of5w7RgcTc/hqdefault.jpg', channel: 'Afusic', 'views': '85K views' },
      
      {
        id:4,title: 'Watch This Before Buying a new Laptop in 2025 | Laptop Buying Guide',embed:'https://www.youtube.com/embed/ITkIdDyXeag?si=0sMm6',thumb: 'https://i.ytimg.com/vi/ITkIdDyXeag/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC-4WMMe9EOz5teDgW1sWZhuXicHQ', channel:'Code With Harry', 'views': '150K views' 
      },
    {
           id:4,title: 'Watch This Before Buying a new Laptop in 2025 | Laptop Buying Guide',embed:'https://www.youtube.com/embed/ITkIdDyXeag?si=0sMm6',thumb: 'https://i.ytimg.com/vi/ITkIdDyXeag/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC-4WMMe9EOz5teDgW1sWZhuXicHQ', channel:'Code With Harry', 'views': '150K views' 
    }
    ];

    // DOM refs
    const grid = document.getElementById('videoGrid');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    const overlay = document.getElementById('playerOverlay');
    const overlayTitle = document.getElementById('overlayTitle');
    const videoMeta = document.getElementById('videoMeta');
    const closeOverlay = document.getElementById('closeOverlay');
    const mainIframe = document.getElementById('mainIframe');

    // Render grid
    function renderVideos(list) {
      grid.innerHTML = '';
      list.forEach(v => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = v.id;

        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        const img = document.createElement('img');
        img.src = v.thumb;
        img.alt = v.title;
        thumb.appendChild(img);

        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.innerHTML = `<h3>${v.title}</h3><p class="muted">${v.channel} • ${v.views}</p>`;

        // When thumbnail clicked -> open overlay player
        thumb.addEventListener('click', () => {
          openPlayer(v);
        });

        card.appendChild(thumb);
        card.appendChild(meta);
        grid.appendChild(card);
      });
    }

    // Open overlay player (handles ? or & for autoplay)
    function openPlayer(v) {
      overlayTitle.textContent = v.title;
      videoMeta.textContent = `${v.channel} • ${v.views}`;

      // if embed already has query params (like ?si=...) use & otherwise ?
      const sep = v.embed.includes('?') ? '&' : '?';
      mainIframe.src = v.embed + sep + 'autoplay=1';

      overlay.style.display = 'flex';
      overlay.setAttribute('aria-hidden', 'false');
    }

    // Close overlay and stop video
    function closePlayer() {
      mainIframe.src = '';
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
    }

    // Search (live filtering)
    function handleSearch(e) {
      const q = e.target.value.trim().toLowerCase();
      if (!q) { renderVideos(videos); return; }
      const filtered = videos.filter(v => v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q));
      renderVideos(filtered);
    }

    // allow pressing Enter in search input to focus on results (optional)
    searchBtn.addEventListener('click', () => {
      const ev = new Event('input');
      searchInput.dispatchEvent(ev);
    });

    // Event listeners
    searchInput.addEventListener('input', handleSearch);
    closeOverlay.addEventListener('click', closePlayer);

    // Close overlay when clicking outside player-box (optional convenience)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePlayer();
    });

    // Initial render
    renderVideos(videos);

    // Optional: stop video when user presses Escape (good UX)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.style.display === 'flex') closePlayer();
    });
  