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
            renderInstructors(data.instructors, basePath);
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
            const expertise = instructor.expertise.join(' • ');
            const imagePath = basePath + instructor.image;
            const certificatePath = basePath + instructor.certificate;
            
            // Encode URL parameters for contact form
            const contactSubject = encodeURIComponent(`Inquiry about hiring ${instructor.name} - ${instructor.title}`);
            const contactMessage = encodeURIComponent(`Hello,\n\nI am interested in hiring ${instructor.name} (${instructor.title}) for my organization.\n\nExpertise areas: ${instructor.expertise.join(', ')}\n\nPlease provide more information about:\n- Availability\n- Hourly/daily rates\n- Duration of engagement\n\nThank you.`);
            const contactUrl = `${basePath}index.html?subject=${contactSubject}&message=${contactMessage}#contact`;

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
                <div class="member-info">
                  <h4>${instructor.name}</h4>
                  <span>${instructor.title}</span>
                  <p>${instructor.description}</p>
                  <div class="mt-3">
                    <p class="mb-2"><strong>Expertise:</strong></p>
                    <p class="small">${expertise}</p>
                  </div>
                  <div class="mt-3 download-catalog">
                    <a href="#" onclick="openPdfModal('${certificatePath}', '${instructor.name}'); return false;"><span>View Certificate</span></a>
                    <a href="${contactUrl}"><span>Hire This Instructor</span></a>
                  </div>
                </div>
              </div>
            </div>
            `;
        });

        instructorsContainer.innerHTML = html;

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
        createPdfModal();
        const modal = new bootstrap.Modal(document.getElementById('pdfModal'));
        document.getElementById('pdfModalLabel').textContent = instructorName + ' - Certificate';
        document.getElementById('pdfViewer').src = pdfPath;
        modal.show();
    };
})();
