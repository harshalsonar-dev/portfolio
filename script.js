/* ==========================================================================
   HARSHAL M. SONAR - INTERACTIVE BUSINESS & PORTFOLIO ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".custom-navbar");
    const navbarCollapse = document.getElementById("navbarNav");
    const navLinks = document.querySelectorAll(".nav-link");
    const contactForm = document.getElementById("contactForm");
    const formAlert = document.getElementById("formStatusAlert");

    // 1. Dynamic Navbar Styler on Scroll
    function handleNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);
    handleNavbarScroll(); // Initial invocation on load

    // 2. Auto-close Mobile Hamburger Nav on Link Click
    if (navbarCollapse) {
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                if (navbarCollapse.classList.contains("show")) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }

    // 3. Client Project Inquiry & Lead Form Handler
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const clientName = document.getElementById("clientName").value.trim();
            const clientEmail = document.getElementById("clientEmail").value.trim();
            const clientPhone = document.getElementById("clientPhone").value.trim();
            const projectService = document.getElementById("projectService").value;
            const projectMessage = document.getElementById("projectMessage").value.trim();

            if (!clientName || !clientEmail || !projectMessage) {
                alert("Please fill in your name, email, and project message.");
                return;
            }

            // Show confirmation banner
            if (formAlert) {
                formAlert.innerHTML = `
                    <div class="d-flex align-items-center gap-2">
                        <i class="bi bi-check-circle-fill text-success fs-5"></i>
                        <div>
                            <strong>Thank you, ${clientName}!</strong> Your inquiry for <em>${projectService}</em> is ready.
                            Opening email client to finalize sending...
                        </div>
                    </div>
                `;
                formAlert.className = "form-status-alert success";
                formAlert.style.display = "block";
            }

            // Build encoded mailto URL
            const emailSubject = encodeURIComponent(`Project Inquiry: ${projectService} from ${clientName}`);
            const emailBody = encodeURIComponent(
                `Hello Harshal,\n\n` +
                `I would like to discuss a project with you.\n\n` +
                `• Name: ${clientName}\n` +
                `• Email: ${clientEmail}\n` +
                `• Phone/WhatsApp: ${clientPhone || 'Not provided'}\n` +
                `• Service Requested: ${projectService}\n\n` +
                `Project Details:\n${projectMessage}\n\n` +
                `Looking forward to connecting!`
            );

            // Trigger mailto after brief UI acknowledgment
            setTimeout(function () {
                window.location.href = `mailto:sonarharshal0609@gmail.com?subject=${emailSubject}&body=${emailBody}`;
            }, 600);
        });
    }

    console.log("Harshal Sonar - Professional .NET Solutions Portfolio Loaded Successfully.");
});
