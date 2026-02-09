(function() {
    const footerElement = document.getElementById('footer');
    if (!footerElement) return;

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

    const footerHtml = `
    <div class="footer-newsletter">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-6">
            <h4>Join Our Newsletter</h4>
            <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
            <form action="${basePath}forms/newsletter.php" method="post" class="php-email-form" data-recaptcha-site-key="6Lf79hQsAAAAAEXSdFNqrD1iklP9SdVQ2iZOTHOw">
              <div class="newsletter-form"><input type="email" name="email" required=""><input type="submit" value="Subscribe"></div>
              <div class="loading">Loading</div>
              <div class="error-message"></div>
              <div class="sent-message">Your subscription request has been sent. Thank you!</div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="container footer-top">
      <div class="row gy-4">
        <div class="col-lg-4 col-md-6 footer-about">
          <a href="${basePath}index.html" class="d-flex align-items-center">
            <span class="sitename">Qbnox Systems</span>
          </a>
          <div class="footer-contact pt-3">
            <p>Regus Co-Working Spaces, The District</p>
            <p>Financial District, Hyderabad 500032, India</p>
            <p class="mt-3"><strong>Phone:</strong> <span>+91 900 8511 933</span></p>
            <p><strong>Email:</strong> <span>ugen@qbnox.com</span></p>
          </div>
        </div>

        <div class="col-lg-2 col-md-3 footer-links">
          <h4>Useful Links</h4>
          <ul>
            <li><i class="bi bi-chevron-right"></i> <a href="${basePath}index.html#hero">Home</a></li>
            <li><i class="bi bi-chevron-right"></i> <a href="${basePath}index.html#about">About us</a></li>
            <li><i class="bi bi-chevron-right"></i> <a href="${basePath}index.html#services">Services</a></li>
            <li><i class="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-3 footer-links">
          <h4>Our Services</h4>
          <ul>
            <li><i class="bi bi-chevron-right"></i> <a href="${basePath}wifi/index.html">Managed Hosting</a></li>
            <li><i class="bi bi-chevron-right"></i> <a href="${basePath}index.html#moodle">AI Labs</a></li>
            <li><i class="bi bi-chevron-right"></i> <a href="${basePath}index.html#portfolio">Networking Solutions</a></li>
            <li><i class="bi bi-chevron-right"></i> <a href="#">Cybersecurity</a></li>
          </ul>
        </div>

        <div class="col-lg-4 col-md-12">
          <h4>Follow Us</h4>
          <p>Qbnox Systems, Building excellence for an AI world</p>
          <div class="social-links d-flex">
            <a href="https://www.linkedin.com/company/qbnoxsystems"><i class="bi bi-twitter-x"></i></a>
            <a href="https://www.linkedin.com/company/qbnoxsystems"><i class="bi bi-facebook"></i></a>
            <a href="https://www.linkedin.com/company/qbnoxsystems"><i class="bi bi-instagram"></i></a>
            <a href="https://www.linkedin.com/company/qbnoxsystems"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>

      </div>
    </div>

    <div class="container copyright text-center mt-4">
      <p>© <span>Copyright</span> <strong class="px-1 sitename">Qbnox Systems Private Limited</strong> <span>All Rights Reserved</span></p>
    </div>`;

    footerElement.innerHTML = footerHtml;

})();