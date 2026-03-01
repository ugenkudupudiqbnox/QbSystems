/**
 * Instructors Loader
 * Dynamically loads instructor data from JSON and renders cards
 */
(function() {
    const instructorsContainer = document.getElementById('instructors-container');
    if (!instructorsContainer) return;

    // Detect project root
    let basePath = './';
    const path = window.location.pathname;
    
    if (path.includes('/wifi/blogs/')) {
        basePath = '../../';
    } else if (path.includes('/services/')) {
        basePath = '../';
    }

    // Fetch and load instructors data
    fetch(basePath + 'assets/data/instructors.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const instructors = Array.isArray(data?.instructors) ? data.instructors : [];
            renderInstructors(instructors, basePath);
        })
        .catch(error => {
            console.error('Error loading instructors:', error);
            instructorsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning" role="alert">
                        <h5>Unable to load instructor data</h5>
                        <p>Please ensure you are running this site from a web server. Error: ${error.message}</p>
                        <p><small>If viewing locally, try running: <code>python3 -m http.server 8000</code> from the public_html directory.</small></p>
                    </div>
                </div>
            `;
        });

    function renderInstructors(instructors, basePath) {
        let html = '';

        instructors.forEach(instructor => {
            const expertiseList = Array.isArray(instructor?.expertise) ? instructor.expertise : [];
            const expertise = expertiseList.join(' • ');
            const imagePath = basePath + (instructor?.image || '');
            const certificatePath = basePath + (instructor?.certificate || '');
            
            // Encode URL parameters for contact form
            const contactSubject = encodeURIComponent(`Inquiry about hiring ${instructor?.name || 'this instructor'} - ${instructor?.title || ''}`);
            const contactMessage = encodeURIComponent(`Hello,\n\nI am interested in hiring ${instructor?.name || 'this instructor'} (${instructor?.title || 'Instructor'}) for my organization.\n\nExpertise areas: ${expertiseList.join(', ')}\n\nPlease provide more information about:\n- Availability\n- Hourly/daily rates\n- Duration of engagement\n\nThank you.`);
            const contactUrl = `${basePath}index.html?subject=${contactSubject}&message=${contactMessage}#contact`;
            const encodedCertificatePath = encodeURIComponent(certificatePath);
            const encodedInstructorName = encodeURIComponent(instructor?.name || 'Certificate');

            html += `
            <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="${instructor.delay}">
              <div class="team-member">
                <div class="member-img">
                  <img src="${imagePath}" class="img-fluid" alt="${instructor.name}">
                  <div class="social">
                    <a href="${instructor.twitter}"><i class="bi bi-twitter-x"></i></a>
                    <a href="${instructor.linkedin}"><i class="bi bi-linkedin"></i></a>
                    <a href="mailto:${instructor.email}"><i class="bi bi-envelope"></i></a>
                  </div>
                </div>
                <div class="member-info text-center">
                  <h4>${instructor.name}</h4>
                  <span>${instructor.title}</span>
                  <p>${instructor.description}</p>
                  <div class="mt-3 text-center">
                    <p class="mb-2"><strong>Expertise</strong></p>
                    <p class="small">${expertise}</p>
                  </div>
                  <div class="mt-3 download-catalog text-center">
                    <div style="display: flex; justify-content: center; align-items: center; padding: 10px 0; border-top: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);">
                      <strong style="margin-right: 8px; color: color-mix(in srgb, var(--default-color), transparent 30%);">Certificate:</strong>
                      <a href="#" class="js-open-pdf" data-pdf="${encodedCertificatePath}" data-name="${encodedInstructorName}" style="margin-right: 8px;"><span>View</span></a>
                      <span style="margin: 0 4px; color: color-mix(in srgb, var(--default-color), transparent 70%);">|</span>
                      <a href="${instructor?.verifyUrl || '#'}" target="_blank" rel="noopener noreferrer"><span>Verify</span></a>
                      <span style="margin: 0 4px; color: color-mix(in srgb, var(--default-color), transparent 70%);">|</span>    
                      <a href="${contactUrl}"><span>Hire</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
        });

        instructorsContainer.innerHTML = html;

        instructorsContainer.querySelectorAll('.js-open-pdf').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const pdfPath = decodeURIComponent(this.getAttribute('data-pdf') || '');
                const instructorName = decodeURIComponent(this.getAttribute('data-name') || 'Certificate');
                window.openPdfModal(pdfPath, instructorName);
            });
        });

        // Reinitialize AOS for newly added elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    // Create PDF modal if it doesn't exist
    function createPdfModal() {
        if (document.getElementById('pdfModal')) return;
        
        const modalHtml = `
            <div class="modal fade" id="pdfModal" tabindex="-1" aria-labelledby="pdfModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="pdfModalLabel">Certificate</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0">
                            <iframe id="pdfViewer" style="width: 100%; height: 80vh; border: none;"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // Global function to open PDF modal
    window.openPdfModal = function(pdfPath, instructorName) {
        if (!pdfPath) return;
        createPdfModal();
        const modalEl = document.getElementById('pdfModal');
        const titleEl = document.getElementById('pdfModalLabel');
        const viewerEl = document.getElementById('pdfViewer');
        if (!modalEl || !titleEl || !viewerEl) return;
        if (typeof bootstrap === 'undefined' || !bootstrap.Modal) {
            window.open(pdfPath, '_blank', 'noopener,noreferrer');
            return;
        }
        const modal = new bootstrap.Modal(modalEl);
        titleEl.textContent = (instructorName || 'Certificate') + ' - Certificate';
        viewerEl.src = pdfPath;
        modal.show();
    };
})();
