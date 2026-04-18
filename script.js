document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMenu = () => {
    hamburgerBtn.classList.toggle('open');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  hamburgerBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // --- Navbar Scroll Effect ---
  const nav = document.querySelector('.nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // --- Scroll Reveal Animation ---
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // ===== Hero Carousel =====
  (function () {
    const slides  = document.querySelectorAll('.hc-slide');
    const dots    = document.querySelectorAll('.hc-dot');
    const track   = document.getElementById('hc-track');

    if (!slides.length) return;

    const DURATION = 4000; // 4 seconds per slide
    let current = 0;
    let timer   = null;

    function goTo(index) {
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots[current].classList.add('active');
      clearTimeout(timer);
      timer = setTimeout(() => goTo(current + 1), DURATION);
    }

    // Dot clicks
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    // Touch swipe
    let touchX = 0;
    const carousel = document.getElementById('hero-carousel');
    carousel.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? goTo(current + 1) : goTo(current - 1);
    });

    // Start auto-play
    timer = setTimeout(() => goTo(1), DURATION);
  })();

  // ===== Journal Lightbox =====

  const JOURNALS = {
    dasara: {
      title: 'Dasara',
      desc: 'A grand visual chronicle of the Dasara celebrations — elephants, processions, and the luminous grandeur of Karnataka\'s royal festival.',
      images: [
        'Dasara-20260418T161010Z-3-001/Dasara/IMG-20251001-WA0046.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG-20251001-WA0048.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_0021.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_0054.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1493.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1497.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1499.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1557.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1587.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1606.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1612 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1614.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1618.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1625.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1628.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1630.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1636.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1637.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1639.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1644.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1645.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1652.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1665.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1805.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_1958.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_20241025_101619_817 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_2180.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9136.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9254 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9288 (1) (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9289 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9293 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9295 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9296 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9297 (1) (1)(1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9302 (1) (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9312 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9356 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9356.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9360 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9364 (2).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9370.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9385.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9389 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9399 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9399.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9409 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9412.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9414.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9417 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9419.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9422 (2).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9432.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9436 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9467 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9520.jpeg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9521.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9533.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9630 (1).jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9711.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9715.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9838.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/IMG_9856.jpg',
        'Dasara-20260418T161010Z-3-001/Dasara/Shared from Lightroom mobile.jpg'
      ]
    },
    july2025: {
      title: 'Everyday Moments',
      desc: 'Mid-year field notes and candid photography capturing the everyday pulse of life — streets, faces, and fleeting moments suspended in time.',
      images: Array.from({length: 24}, (_, i) => `July 2025/${i + 1}.png`)
    },
    kodungallur: {
      title: 'Kodungallur',
      desc: 'An immersive document of the Kodungallur Bharani — the sacred sickles, chanting devotees, and the electrifying intensity of an ancient ritual.',
      images: [
        'Kodungallur-20260418T161011Z-3-001/Kodungallur/1_20260418_175911_0000.png',
        'Kodungallur-20260418T161011Z-3-001/Kodungallur/20_20260418_175912_0019.png',
        'Kodungallur-20260418T161011Z-3-001/Kodungallur/DSC01146.png',
        'Kodungallur-20260418T161011Z-3-001/Kodungallur/DSC01154.png',
        'Kodungallur-20260418T161011Z-3-001/Kodungallur/DSC01197.png'
      ]
    },
    thankyou: {
      title: 'Nelpettai',
      desc: 'A vivid look into the heart of Nelpettai — capturing the raw warmth, resilience, and the spark of traditional ironwork.',
      images: Array.from({length: 17}, (_, i) => `THank you/${i + 1}.png`)
    },
    theyyam: {
      title: 'Theyyam',
      desc: 'High-resolution documentation of the Theyyam ritual — the painted faces, blazing torches, and transcendent energy of Kerala\'s living deity worship.',
      images: [
        'Theyyam-20260418T161013Z-3-001/Theyyam/DSC01146.png',
        'Theyyam-20260418T161013Z-3-001/Theyyam/DSC01154.png',
        'Theyyam-20260418T161013Z-3-001/Theyyam/Hand holds.jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/IMG_3523.png',
        'Theyyam-20260418T161013Z-3-001/Theyyam/Low exposure .jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/White and black.jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_3418.png',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_3497.jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_3525.jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_3527 (2).jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_3605.jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_3705.jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_3707.jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_3726 (1).jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_3798.jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_3853.jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_3991.png',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_4004.png',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_4134 (1).jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_4186.jpg',
        'Theyyam-20260418T161013Z-3-001/Theyyam/_MG_4522.jpg'
      ]
    },
    untitled: {
      title: 'Sacred Offerings',
      desc: 'Raw, unfiltered frames of ancient sacrifice rituals and village deity worship — documenting moments of intense devotion.',
      images: [
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/1000255950.jpg',
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/1000264662.jpg',
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/20240718225226_IMG_6054.JPG',
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/20251114_225952.jpg',
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/IMG_0960.JPG',
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/IMG_20251215_090329_944.jpg',
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/IMG_4235(1).jpg',
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/IMG_4237(1).jpg',
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/IMG_4281(1).jpg',
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/IMG_6891.jpg',
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/IMG_6899.JPG',
        'Untitled folder-20260418T161018Z-3-001/Untitled folder/IMG_9236.jpg'
      ]
    },
    azhagar: {
      title: 'Azhagar Koil',
      desc: 'A pilgrimage in frames — the sacred Azhagar Koil temple, its devotees, and the timeless architecture cradled in the Madurai hills.',
      images: [
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122711_0000.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122711_0001.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122711_0002.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122711_0003.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122711_0004.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122712_0005.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122712_0006.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122712_0007.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122712_0008.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122713_0009.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122713_0010.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122713_0011.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122713_0012.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122713_0013.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122713_0014.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122713_0015.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122713_0016.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122713_0017.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122713_0018.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122714_0019.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122714_0020.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122714_0021.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122714_0022.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122714_0023.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122714_0024.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122714_0025.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122715_0026.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122715_0027.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122715_0028.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122715_0029.png',
        'azhagar koil-20260417T141902Z-3-001/Thank you_20250811_122715_0030.png'
      ]
    },
    subam: {
      title: 'சுபம் (Subam)',
      desc: 'An auspicious collection — joyful, ceremonial, and intimate moments woven into a tapestry of Tamil celebration and cultural identity.',
      images: Array.from({length: 13}, (_, i) => `சுபம்/${i + 1}.png`)
    }
  };

  const lightbox = document.getElementById('journal-lightbox');
  const jlbClose = document.getElementById('jlb-close');
  const blogContent = document.getElementById('jlb-blog-content');

  window.openJournal = function(key) {
    const journal = JOURNALS[key];
    if (!journal || journal.images.length === 0) return;

    blogContent.innerHTML = ''; // clear previous

    // 1. Hero Image
    const hero = document.createElement('img');
    hero.src = journal.images[0];
    hero.className = 'jlb-hero';
    hero.alt = journal.title + ' Cover';
    if (typeof applyWatermark === 'function') applyWatermark(hero);
    blogContent.appendChild(hero);

    // 2. Text Block
    const textBlock = document.createElement('div');
    textBlock.className = 'jlb-text-block';
    
    const title = document.createElement('h2');
    title.className = 'jlb-title';
    title.textContent = journal.title;
    
    const desc = document.createElement('p');
    desc.className = 'jlb-desc';
    desc.textContent = journal.desc;
    
    textBlock.appendChild(title);
    textBlock.appendChild(desc);
    blogContent.appendChild(textBlock);

    // 3. Grid for the remainder of images
    if (journal.images.length > 1) {
      const grid = document.createElement('div');
      grid.className = 'jlb-grid';
      
      for (let i = 1; i < journal.images.length; i++) {
        const img = document.createElement('img');
        img.src = journal.images[i];
        img.className = 'jlb-block-img';
        img.loading = 'lazy';
        img.alt = `${journal.title} image ${i}`;
        if (typeof applyWatermark === 'function') applyWatermark(img);
        grid.appendChild(img);
      }
      blogContent.appendChild(grid);
    }

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Reset scroll to top
    lightbox.scrollTop = 0;
  };

  function closeJournal() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { blogContent.innerHTML = ''; }, 400); // clear after fade out
  }

  jlbClose.addEventListener('click', closeJournal);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeJournal();
  });

  // ===== On-Demand Watermarking (Zero Load Overhead) =====
  
  // 1. Prevent drag-and-drop saving of raw images to desktop
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // 2. Intercept Right-Click / Long-Press and serve custom watermarked download
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      // Allow right clicks on UI elements like the top-left Logo
      if (e.target.closest('.logo')) return;

      e.preventDefault(); // Block native "Save Image As"
      
      const img = e.target;
      try {
        if (!img.naturalWidth) return;
        
        let targetWidth = img.naturalWidth;
        let targetHeight = img.naturalHeight;
        
        // Since we are only processing 1 image deeply, we can allow high-res (up to 2400px)
        const maxRes = 2400;
        if (targetWidth > maxRes) {
          const ratio = maxRes / targetWidth;
          targetWidth = maxRes;
          targetHeight = targetHeight * ratio;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        ctx.font = `bold ${Math.max(16, targetWidth * 0.025)}px "Inter", sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        const padding = Math.max(15, targetWidth * 0.02);
        ctx.fillText("© VASANTHRAJU", targetWidth - padding, targetHeight - padding);
        
        canvas.toBlob((blob) => {
          if (!blob) return;
          const blobUrl = URL.createObjectURL(blob);
          
          // Force a programmatic download of the watermarked file
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `VasanthRaju_Photography_${Date.now()}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        }, 'image/jpeg', 0.90);
        
      } catch(err) {
        console.error("Watermark generation failed", err);
      }
    }
  });

});

