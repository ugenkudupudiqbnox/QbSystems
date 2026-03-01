/**
 * Header Loader
 * Injects the common header into the <header id="header"> element.
 */
(function() {
    const headerElement = document.getElementById('header');
    if (!headerElement) return;

    // Detect project root relative to current file
    let basePath = './';
    const path = window.location.pathname;
    
    // Check for "wifi/blogs" (nested 2 levels)
    if (path.includes('/wifi/blogs/')) {
        basePath = '../../';
    } 
    // Check for 1 level subdirectories
    else if (path.includes('/ai/') || path.includes('/wifi/') || path.includes('/services/') || path.includes('/templates/')) {
        basePath = '../';
    }

    const headerHtml = `
    <div class="container-fluid container-xl position-relative d-flex align-items-center">

      <a href="${basePath}index.html" class="logo d-flex align-items-center me-auto">
      <img src="${basePath}assets/img/logo.png" alt="Qbnox Logo">
      </a>

      <nav id="navmenu" class="navmenu">
      <ul>
        <li><a href="${basePath}index.html#hero">Home<br></a></li>
        <li><a href="${basePath}index.html#about">About</a></li>
        <li class="dropdown"><a href="#"><span>Products</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
        <ul>
          <li><a href="${basePath}wifi/index.html">Enterprise Wi-Fi</a></li>
          <li class="dropdown"><a href="#"><span>AI Servers</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
          <ul>
            <li><a href="${basePath}ai/qs4059.html">QS 4059</a></li>
            <li><a href="${basePath}ai/qs2059.html">QS 2059</a></li>
            </ul>
          </li>
        </ul>
        </li>
        <li class="dropdown"><a href="#"><span>Services</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
        <ul>
          <li class="dropdown"><a href="#"><span>Managed Hosting</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
          <ul>
            <li><a href="${basePath}services/service-details.html">Moodle</a></li>
            <li><a href="${basePath}services/service-details.html">Pressbooks</a></li>
          </ul>
          </li>
          <li class="dropdown"><a href="#"><span>Plugin Development</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
          <ul>
            <li><a href="${basePath}services/service-details.html">Qbnox LTI 1.3</a></li>
            <li><a href="${basePath}services/service-details.html">Pressbooks SMTP</a></li>
          </ul>
          </li>
          <li><a href="${basePath}services/moodle-instructors.html">Moodle Instructors</a></li>
        </ul>
        </li>
        <li><a href="${basePath}index.html#team">Team</a></li>
        <li><a href="${basePath}index.html#contact">Contact</a></li>
      </ul>
      <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>

      <a class="btn-getstarted flex-md-shrink-0" href="${basePath}index.html#about">Get Started</a>

    </div>`;

    headerElement.innerHTML = headerHtml;

    // Handle Active Class
    const currentHref = window.location.href;
    const navLinks = headerElement.querySelectorAll('.navmenu a');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && !linkHref.startsWith('#')) {
             if (currentHref.endsWith(linkHref.replace('./', ''))) {
                link.classList.add('active');
            }
        }
    });

})();
