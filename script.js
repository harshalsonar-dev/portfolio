/* ==========================================================================
   HARSHAL M. SONAR - INTERACTIVE BUSINESS & PORTFOLIO ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".custom-navbar");
    const navbarCollapse = document.getElementById("navbarNav");
    const navClickables = document.querySelectorAll(".nav-link, .nav-btn-hire");
    const contactForm = document.getElementById("contactForm");
    const formAlert = document.getElementById("formStatusAlert");
    const backToTopBtn = document.getElementById("backToTop");

    // 1. Dynamic Navbar & Back-to-Top Styler on Scroll
    function handleScrollState() {
        const scrollY = window.scrollY || window.pageYOffset;

        // Navbar background toggle
        if (navbar) {
            if (scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollY > 350) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }
    }

    window.addEventListener("scroll", handleScrollState, { passive: true });
    handleScrollState(); // Initial check on load

    // 2. Smooth Back to Top Click
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 3. Auto-close Mobile Hamburger Nav on Link Click
    if (navbarCollapse) {
        navClickables.forEach(function (link) {
            link.addEventListener("click", function () {
                if (navbarCollapse.classList.contains("show")) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }

    // 4. Client Project Inquiry & Lead Form Handler
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const clientName = document.getElementById("clientName").value.trim();
            const clientEmail = document.getElementById("clientEmail").value.trim();
            const clientPhone = document.getElementById("clientPhone").value.trim();
            const projectService = document.getElementById("projectService").value;
            const projectMessage = document.getElementById("projectMessage").value.trim();

            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!clientName || !clientEmail || !projectMessage) {
                alert("Please fill in your name, email, and project message.");
                return;
            }

            if (!emailRegex.test(clientEmail)) {
                alert("Please enter a valid email address (e.g., name@domain.com).");
                return;
            }

            // Build encoded mailto URL
            const emailSubject = encodeURIComponent(`Project Inquiry: ${projectService} from ${clientName}`);
            const rawBody = `Hello Harshal,\n\n` +
                `I would like to discuss a project with you.\n\n` +
                `• Name: ${clientName}\n` +
                `• Email: ${clientEmail}\n` +
                `• Phone/WhatsApp: ${clientPhone || 'Not provided'}\n` +
                `• Service Requested: ${projectService}\n\n` +
                `Project Details:\n${projectMessage}\n\n` +
                `Looking forward to connecting!`;

            const emailBody = encodeURIComponent(rawBody);
            const mailtoUrl = `mailto:sonarharshal0609@gmail.com?subject=${emailSubject}&body=${emailBody}`;

            // Build WhatsApp fallback URL
            const whatsappText = encodeURIComponent(
                `*New Project Inquiry*\n` +
                `*Name:* ${clientName}\n` +
                `*Email:* ${clientEmail}\n` +
                `*Service:* ${projectService}\n\n` +
                `*Message:* ${projectMessage}`
            );
            const whatsappUrl = `https://wa.me/918263989274?text=${whatsappText}`;

            // Show confirmation banner with dual quick options
            if (formAlert) {
                formAlert.innerHTML = `
                    <div class="d-flex flex-column gap-2">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-check-circle-fill text-success fs-5"></i>
                            <div>
                                <strong>Thank you, ${clientName}!</strong> Your inquiry for <em>${projectService}</em> is prepared.
                            </div>
                        </div>
                        <div class="d-flex gap-2 mt-2 flex-wrap">
                            <a href="${mailtoUrl}" class="btn btn-sm btn-primary">
                                <i class="bi bi-envelope-fill me-1"></i> Open in Email Client
                            </a>
                            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-success">
                                <i class="bi bi-whatsapp me-1"></i> Send via WhatsApp
                            </a>
                        </div>
                    </div>
                `;
                formAlert.className = "form-status-alert success";
                formAlert.style.display = "block";
            }

            // Launch email client
            setTimeout(function () {
                window.location.href = mailtoUrl;
            }, 600);
        });
    }

    console.log("Harshal Sonar - Professional .NET Solutions Portfolio Engine Active.");
});
