/**
 * Management System - Interactivity & Login Script
 * Matches demonstration in Task 2.mp4
 */

document.addEventListener('DOMContentLoaded', function () {
  /* ==========================================================================
     1. Navigation Dropdown
     ========================================================================== */
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
      if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
      }
    });
  }

  /* ==========================================================================
     2. Hero Carousel / Slider (01_index.html)
     ========================================================================== */
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');

  if (slides.length > 0) {
    let currentSlide = 0;
    let autoSlideInterval = null;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      currentSlide = index;
    }

    function nextSlide() {
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }

    function prevSlide() {
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        nextSlide();
        resetTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prevSlide();
        resetTimer();
      });
    }

    function startTimer() {
      autoSlideInterval = setInterval(nextSlide, 4500);
    }

    function resetTimer() {
      clearInterval(autoSlideInterval);
      startTimer();
    }

    startTimer();
  }

  /* ==========================================================================
     3. Login Logic (03_Login.html)
     - Show / Hide password toggle
     - Submit handler with "Login successful!" alert & redirection
     ========================================================================== */
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');

  // Toggle Password Visibility
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
    });
  }

  // Handle Login Submit
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = document.getElementById('email');
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';

      if (!email || !password) {
        alert('Please fill in both email and password.');
        return;
      }

      // Exact alert shown in the demonstration video (00:24 - 00:25)
      alert('Login successful!');

      // Redirect to Courses page (02_Courses.html)
      window.location.href = '02_Courses.html';
    });
  }

  /* ==========================================================================
     4. Courses Modal Popup (02_Courses.html)
     ========================================================================== */
  const modalOverlay = document.getElementById('courseModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCourseName = document.getElementById('modalCourseName');
  const modalCourseDetail = document.getElementById('modalCourseDetail');
  const learnMoreBtns = document.querySelectorAll('.btn-learn-more');

  const courseData = {
    html: {
      name: 'HTML',
      detail: 'HTML stands for HyperText Markup Language. It creates the structure of a web page using headings, paragraphs, images, and links.'
    },
    css: {
      name: 'CSS',
      detail: 'CSS stands for Cascading Style Sheets. It controls the appearance of web pages, including colors, fonts, spacing, and layout.'
    },
    bootstrap: {
      name: 'Bootstrap',
      detail: 'Bootstrap is a front-end framework. It provides ready-made components and a responsive grid system to build websites quickly.'
    },
    javascript: {
      name: 'JavaScript',
      detail: 'JavaScript is a programming language that makes web pages interactive. It can handle button clicks, form validation, popups, and dynamic content.'
    }
  };

  if (modalOverlay && learnMoreBtns.length > 0) {
    learnMoreBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const courseKey = this.getAttribute('data-course');
        const course = courseData[courseKey];

        if (course && modalCourseName && modalCourseDetail) {
          modalCourseName.textContent = course.name;
          modalCourseDetail.textContent = course.detail;
          modalOverlay.classList.add('show');
        }
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', function () {
        modalOverlay.classList.remove('show');
      });
    }

    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('show');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
        modalOverlay.classList.remove('show');
      }
    });
  }
});
