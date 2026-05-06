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
      desc: [
        'Eyes blaze in the dark — fear and devotion collide.',
        'A moment where mortals meet the mystical.'
      ],
      images: [
        'Dasara/1_20260419_214054_0000.png',
        'Dasara/2_20260419_214054_0001.png',
        'Dasara/3_20260419_214054_0002.png',
        'Dasara/4_20260419_214054_0003.png',
        'Dasara/5_20260419_214055_0004.png',
        'Dasara/6_20260419_214055_0005.png',
        'Dasara/7_20260419_214055_0006.png',
        'Dasara/8_20260419_214055_0007.png',
        'Dasara/9_20260419_214055_0008.png',
        'Dasara/10_20260419_214055_0009.png',
        'Dasara/11_20260419_214055_0010.png',
        'Dasara/12_20260419_214055_0011.png',
        'Dasara/13_20260419_214055_0012.png',
        'Dasara/14_20260419_214055_0013.png',
        'Dasara/15_20260419_214055_0014.png',
        'Dasara/16_20260419_214055_0015.png',
        'Dasara/17_20260419_214055_0016.png',
        'Dasara/18_20260419_214055_0017.png',
        'Dasara/19_20260419_214055_0018.png',
        'Dasara/20_20260419_214055_0019.png',
        'Dasara/21_20260419_214055_0020.png',
        'Dasara/22_20260419_214055_0021.png',
        'Dasara/23_20260419_214055_0022.png',
        'Dasara/24_20260419_214056_0023.png',
        'Dasara/25_20260419_214056_0024.png',
        'Dasara/26_20260419_214056_0025.png',
        'Dasara/27_20260419_214056_0026.png',
        'Dasara/28_20260419_214056_0027.png',
        'Dasara/29_20260419_214056_0028.png',
        'Dasara/30_20260419_214056_0029.png',
        'Dasara/31_20260419_214056_0030.png',
        'Dasara/32_20260419_214056_0031.png'
      ]
    },
    july2025: {
      title: 'Dhobi Ghat',
      desc: [
        'A living rhythm of labor — cloth, water, and hands moving in unison.',
        'Under open skies, stories are beaten, rinsed, and hung to dry.',
        'Not just a place — Dhobi Ghat is the city\'s raw, breathing backbone.'
      ],
      images: Array.from({length: 24}, (_, i) => `July 2025/${i + 1}.png`)
    },
    kodungallurBharani: {
      title: 'Kodungallur Bharani',
      desc: [
        'When institutional justice failed, Kannagi used her anklet as evidence and her body as the witness stand.',
        'At Kodungallur, devotees continue that same testimony — blood drawn from the crown, offered not to a deity, but to a verdict that was never fully delivered.',
        'The anklet broke a king\'s judgment. The blood continues the case.',
        'This festival is not a ritual — it is an annual hearing where the goddess is still the only judge who listens.'
      ],
      images: [
        'Kodungallur Bharani/1_20260419_174759_0000.png',
        'Kodungallur Bharani/2_20260419_174800_0001.png',
        'Kodungallur Bharani/3_20260419_174800_0002.png',
        'Kodungallur Bharani/4_20260419_174800_0003.png',
        'Kodungallur Bharani/5_20260419_174800_0004.png',
        'Kodungallur Bharani/6_20260419_174800_0005.png',
        'Kodungallur Bharani/7_20260419_174800_0006.png',
        'Kodungallur Bharani/8_20260419_174800_0007.png',
        'Kodungallur Bharani/9_20260419_174800_0008.png',
        'Kodungallur Bharani/10_20260419_174800_0009.png',
        'Kodungallur Bharani/11_20260419_174800_0010.png',
        'Kodungallur Bharani/12_20260419_174800_0011.png',
        'Kodungallur Bharani/13_20260419_174800_0012.png',
        'Kodungallur Bharani/14_20260419_174800_0013.png',
        'Kodungallur Bharani/15_20260419_174800_0014.png',
        'Kodungallur Bharani/16_20260419_174800_0015.png',
        'Kodungallur Bharani/17_20260419_174800_0016.png',
        'Kodungallur Bharani/18_20260419_174800_0017.png',
        'Kodungallur Bharani/19_20260419_174800_0018.png'
      ]
    },
    thankyou: {
      title: 'Nelpettai',
      desc: [
        'Nelpet Mutton Market in Madurai traces its roots to the late 19th century (around 1880s) during the British Colonial period.',
        'As Madurai grew into a major trade city, designated meat markets were established by the Municipal Administration.',
        'Nelpet gradually became one of the city\'s primary centers for mutton trade.'
      ],
      images: Array.from({length: 17}, (_, i) => `THank you/${i + 1}.png`)
    },
    angarikalin: {
      title: 'Avana Padam',
      desc: [
        'Love bloomed like a flower between stones, fragile yet defiant.',
        'Hands meant to nurture became storms that crushed it.',
        'They called the ruins honor, but the roots still ache beneath the soil —',
        'whispering a pain that refuses to die.'
      ],
      images: Array.from({length: 10}, (_, i) => `Angarikalin kadhai/${i + 1}_20260419_133145_000${i}.png`)
    },
    theyyam1: {
      title: 'Theyyam',
      desc: [
        'Capturing the Divine — Kerala\'s sacred ritual art.',
        'My portfolio documents the raw energy, intricate costumes, and spiritual essence of these divine performances.',
        'Each photograph freezes a moment where mortal dancers become gods, revealing the deep cultural roots and hypnotic beauty of this ancient tradition.'
      ],
      images: [
        'Theyyam 1/1_20260419_005909_0000.png',
        'Theyyam 1/2_20260419_005909_0001.png',
        'Theyyam 1/3_20260419_005910_0002.png',
        'Theyyam 1/4_20260419_005910_0003.png',
        'Theyyam 1/5_20260419_005910_0004.png',
        'Theyyam 1/6_20260419_005910_0005.png',
        'Theyyam 1/7_20260419_005910_0006.png',
        'Theyyam 1/8_20260419_005910_0007.png',
        'Theyyam 1/9_20260419_005910_0008.png',
        'Theyyam 1/10_20260419_005910_0009.png',
        'Theyyam 1/11_20260419_005910_0010.png',
        'Theyyam 1/12_20260419_005910_0011.png',
        'Theyyam 1/13_20260419_005910_0012.png',
        'Theyyam 1/14_20260419_005910_0013.png',
        'Theyyam 1/15_20260419_005910_0014.png',
        'Theyyam 1/16_20260419_005910_0015.png',
        'Theyyam 1/17_20260419_005910_0016.png',
        'Theyyam 1/18_20260419_005910_0017.png',
        'Theyyam 1/19_20260419_005911_0018.png'
      ]
    },
    azhagar: {
      title: 'Azhagar Koil',
      desc: [
        'Azhagar Koil Chariot Festival — Madurai.'
      ],
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
      desc: [
        'An auspicious collection — joyful, ceremonial, and intimate moments woven into a tapestry of Tamil celebration and cultural identity.',
        '📍 Madurai'
      ],
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
    textBlock.appendChild(title);

    // Support single string or array of paragraphs
    const descArr = Array.isArray(journal.desc) ? journal.desc : [journal.desc];
    descArr.forEach(paraText => {
      const para = document.createElement('p');
      para.className = 'jlb-desc';
      para.textContent = paraText;
      textBlock.appendChild(para);
    });

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

  // ===== Image Download Protection =====

  // 1. Prevent drag-and-drop saving
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  // 2. Block right-click on images completely
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      if (e.target.closest('.logo')) return;
      e.preventDefault();
    }
  });

  // 3. Block keyboard shortcuts for saving
  document.addEventListener('keydown', (e) => {
    // Block Ctrl+S / Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
    }
    // Block Ctrl+Shift+I / Cmd+Option+I (DevTools)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
      e.preventDefault();
    }
    // Block F12
    if (e.key === 'F12') {
      e.preventDefault();
    }
  });

  // 4. Prevent long-press save on mobile
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });
  });

  // Also apply to dynamically created images
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'IMG') {
          node.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) e.preventDefault();
          }, { passive: false });
        }
        if (node.querySelectorAll) {
          node.querySelectorAll('img').forEach(img => {
            img.addEventListener('touchstart', (e) => {
              if (e.touches.length > 1) e.preventDefault();
            }, { passive: false });
          });
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

});

