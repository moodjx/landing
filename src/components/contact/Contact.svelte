<script>
  /**
   * Contact Component - Contact form and social links
   *
   * Features:
   * - Contact form that sends to Google Script
   * - Social media links
   * - Success/error messaging
   * - Form validation (HTML5 required attributes)
   *
   * Svelte 5 Features:
   * - $state() for reactive form data and status
   * - bind:value for two-way data binding
   * - Async/await for form submission
   * - Conditional rendering with {#if}
   *
   * Design Pattern:
   * - Social links from constants file
   * - Separation of form logic and presentation
   */

  import { translations } from "../../lib/translations.js";
  import { SOCIAL_LINKS } from "../../lib/constants.js";
  import {
    GitHubIcon,
    LinkedInIcon,
    EmailIcon,
    PhoneIcon,
    FreelancerIcon,
    UpworkIcon,
  } from "../../lib/icons.js";

  // ============================================================================
  // STATE
  // ============================================================================

  /**
   * Form data object
   * $state() makes it reactive - updates trigger re-renders
   * bind:value in the template creates two-way binding
   */
  let { currentLang = "en" } = $props();
  let formData = $state({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  /**
   * Form submission status
   * Values: '' (none), 'sending', 'success', 'error'
   */
  let submitStatus = $state("");

  // ============================================================================
  // FUNCTIONS
  // ============================================================================

  // PASTE YOUR GOOGLE SCRIPT URL HERE
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyzi1UKqjq0w3HPAZ46CaJ3aLFv6T81_KIbbQt-vvZK5fJJbsBrt-tRqXfx8hIb1E1S/exec";

  /**
   * Handles form submission
   * Sends data to Google Script endpoint
   *
   * @param {Event} e - Form submit event
   */
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    submitStatus = "sending";

    try {
      // Send form data to Google Script
      // Using new FormData(e.target) to automatically capture all named inputs
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new FormData(e.target),
      });

      // Google Apps Script returns 200 for success
      // We assume success if the fetch completes without throwing
      submitStatus = "success";
      formData = { name: "", email: "", subject: "", message: "" };
    } catch (error) {
      console.error("Error!", error.message);
      submitStatus = "error";
    }

    // Clear status message after 5 seconds
    setTimeout(() => {
      if (submitStatus === "success" || submitStatus === "error") {
        submitStatus = "";
      }
    }, 5000);
  }
</script>

<!--
  CONTACT SECTION
  id="contact" allows navigation to scroll to this section
-->
<section id="contact" class="contact section">
  <div class="container">
    <div class="contact-content">
      <!-- Contact form -->
      <div class="contact-wrapper">
        <!-- Professional Links Section -->
        <div class="professional-links">
          <a href="mailto:contact@example.com" class="prof-link-card">
            <div class="icon-wrapper">
              {@html EmailIcon("32")}
            </div>
            <div class="link-content">
              <h3>{translations[currentLang].contact.links.email.title}</h3>
              <span>{translations[currentLang].contact.links.email.desc}</span>
            </div>
          </a>

          <a
            href={SOCIAL_LINKS.freelancer}
            target="_blank"
            rel="noopener noreferrer"
            class="prof-link-card"
          >
            <div class="icon-wrapper">
              {@html FreelancerIcon("32")}
            </div>
            <div class="link-content">
              <h3>
                {translations[currentLang].contact.links.freelancer.title}
              </h3>
              <span
                >{translations[currentLang].contact.links.freelancer.desc}</span
              >
            </div>
          </a>

          <a
            href={SOCIAL_LINKS.upwork}
            target="_blank"
            rel="noopener noreferrer"
            class="prof-link-card"
          >
            <div class="icon-wrapper">
              {@html UpworkIcon("32")}
            </div>
            <div class="link-content">
              <h3>{translations[currentLang].contact.links.upwork.title}</h3>
              <span>{translations[currentLang].contact.links.upwork.desc}</span>
            </div>
          </a>
        </div>

        <div class="contact-form-wrapper">
          <h2>{translations[currentLang].contact.title}</h2>
          <p class="form-intro">
            {translations[currentLang].contact.intro}
          </p>

          <!--
          Form with onsubmit handler
          onsubmit is Svelte 5's event handler syntax
        -->
          <form onsubmit={handleSubmit} class="contact-form">
            <!-- Name field -->
            <div class="form-group">
              <label for="name"
                >{translations[currentLang].contact.form.name}</label
              >
              <!--
              bind:value creates two-way data binding
              Changes to input update formData.name
              Changes to formData.name update input
            -->
              <input
                type="text"
                id="name"
                name="name"
                bind:value={formData.name}
                required
                placeholder={translations[currentLang].contact.form.name}
              />
            </div>

            <!-- Email field -->
            <div class="form-group">
              <label for="email"
                >{translations[currentLang].contact.form.email}</label
              >
              <input
                type="email"
                id="email"
                name="email"
                bind:value={formData.email}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <!-- Subject field -->
            <div class="form-group">
              <label for="subject"
                >{translations[currentLang].contact.form.subject}</label
              >
              <input
                type="text"
                id="subject"
                name="subject"
                bind:value={formData.subject}
                required
                placeholder={translations[currentLang].contact.form.subject}
              />
            </div>

            <!-- Message field -->
            <div class="form-group">
              <label for="message"
                >{translations[currentLang].contact.form.message}</label
              >
              <textarea
                id="message"
                name="message"
                bind:value={formData.message}
                required
                placeholder={translations[currentLang].contact.form.message +
                  "..."}
              ></textarea>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              class="btn-submit"
              disabled={submitStatus === "sending"}
            >
              {submitStatus === "sending"
                ? translations[currentLang].contact.form.sending
                : translations[currentLang].contact.form.submit}
            </button>

            <!--
            Success message
            {#if} is Svelte's conditional rendering
            Only shows when submitStatus === 'success'
          -->
            {#if submitStatus === "success"}
              <div class="status-message success">
                {translations[currentLang].contact.form.success}
              </div>
            {/if}

            <!-- Error message -->
            {#if submitStatus === "error"}
              <div class="status-message error">
                {translations[currentLang].contact.form.error}
              </div>
            {/if}
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .contact {
    background: var(--color-bg);
  }

  .contact-content {
    display: flex;
    justify-content: center;
    padding: var(--space-xl) 0;
  }

  .contact-wrapper {
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  /* Professional Links Section */
  .professional-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
    width: 100%;
  }

  .prof-link-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-lg);
    background: #000000;
    border: 2px solid #000000;
    border-radius: 50px;
    text-decoration: none;
    color: #ffffff;
    transition: all 0.3s ease;
    gap: var(--space-sm);
    font-family: var(--font-mono);
  }

  .prof-link-card:hover {
    background: #1a1a1a;
    transform: translateY(-1px);
    border-color: var(--color-primary);
    box-shadow: none;
  }

  .prof-link-card .icon-wrapper {
    color: #ffffff;
    margin-bottom: var(--space-xs);
  }

  .prof-link-card h3 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #ffffff;
  }

  .prof-link-card span {
    font-size: 0.8rem;
    color: #ffffff;
    opacity: 0.8;
  }

  /* Contact Form - Matching "Get In Touch" button style */
  .contact-form-wrapper {
    width: 100%;
    padding: var(--space-xl);
    background: transparent !important;
    color: var(--color-text);
    border: 2px solid #000000;
    border-radius: 50px;
    box-shadow: none;
    font-family: var(--font-mono);
  }

  .contact-form-wrapper h2 {
    margin-bottom: var(--space-sm);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
  }

  .form-intro {
    text-align: center;
    margin-bottom: var(--space-xl);
    color: var(--color-text-light);
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .form-group label {
    font-weight: 700;
    font-size: 0.875rem; /* Reduced for compact feel */
  }

  /* Submit Button - Matching "Get In Touch" button style */
  .btn-submit {
    background: transparent !important;
    color: var(--color-text);
    border: 2px solid #000000;
    border-radius: 50px;
    padding: var(--space-sm) var(--space-lg);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-family: var(--font-mono);
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-submit:hover {
    background: rgba(0, 0, 0, 0.05);
    border: 2px solid var(--color-primary);
    transform: translateY(-1px);
  }

  .btn-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .status-message {
    padding: var(--space-md);
    border: none;
    border-radius: 4px;
    font-weight: 600;
    text-align: center;
    margin-top: var(--space-md);
  }

  .status-message.success {
    background: rgba(0, 255, 0, 0.1);
    color: var(--color-success);
    border: 1px solid var(--color-success);
  }

  .status-message.error {
    background: rgba(255, 50, 50, 0.1);
    color: var(--color-danger);
    border: 1px solid var(--color-danger);
  }

  @media (max-width: 768px) {
    .professional-links {
      grid-template-columns: 1fr;
    }
  }
</style>
