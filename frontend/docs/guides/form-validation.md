# ✅ Form Validation

Complete guide to implementing form validation in Admindek VanillaJS using Bouncer.js validation library.

## Overview

Admindek includes **formbouncerjs 1.4.6** as the primary form validation library, providing lightweight form validation that augments native HTML5 form validation elements and attributes.

## Bouncer.js Validation

### 1. HTML Structure

```html
<!-- Bouncer validated form (actual Admindek implementation) -->
<form class="validate-me" id="validate-me" data-validate>
  <div class="mb-3 row">
    <label class="col-lg-4 col-form-label text-lg-end">Upload any file:</label>
    <div class="col-lg-6">
      <input name="file" id="file" type="file" class="form-control" 
             data-bouncer-target="#file-error-msg" required />
      <small id="file-error-msg" class="form-text text-danger"></small>
    </div>
  </div>

  <div class="mb-3 row">
    <label class="col-lg-4 col-form-label text-lg-end">Email:</label>
    <div class="col-lg-6">
      <input type="email" name="email" id="email" class="form-control" required />
    </div>
  </div>
  
  <div class="mb-3 row">
    <label class="col-lg-4 col-form-label text-lg-end">Date:</label>
    <div class="col-lg-6">
      <input type="date" class="form-control" name="date" id="date" required />
    </div>
  </div>
  
  <button class="btn btn-primary" type="submit">Submit form</button>
</form>
```

### 2. JavaScript Initialization (Actual Implementation)

```javascript
'use strict';
(function () {
  var bouncer = new Bouncer('[data-validate]', {
    disableSubmit: true,
    customValidations: {
      valueMismatch: function (field) {
        var selector = field.getAttribute('data-bouncer-match');
        if (!selector) return false;
        var otherField = field.form.querySelector(selector);
        if (!otherField) return false;
        return otherField.value !== field.value;
      }
    },
    messages: {
      valueMismatch: function (field) {
        var customMessage = field.getAttribute('data-bouncer-mismatch-message');
        return customMessage ? customMessage : 'Please make sure the fields match.';
      }
    }
  });

  document.addEventListener(
    'bouncerFormInvalid',
    function (event) {
      window.scrollTo(0, event.detail.errors[0].offsetTop);
    },
    false
  );

  document.addEventListener(
    'bouncerFormValid',
    function () {
      alert('Form submitted successfully!');
      window.location.reload();
    },
    false
  );
})();
```

## Advanced Validation Patterns

### Real-time Validation

```javascript
// Real-time validation for better UX
function initRealtimeValidation() {
  const forms = document.querySelectorAll('.needs-validation');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Validate on blur (when user leaves field)
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      // Clear validation on input (as user types)
      input.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
          validateField(this);
        }
      });
    });
  });
}

function validateField(field) {
  const form = field.closest('form');
  const isValid = field.checkValidity();
  
  // Remove existing validation classes
  field.classList.remove('is-valid', 'is-invalid');
  
  // Add appropriate class based on validity
  if (field.value.trim() !== '') {
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
  }
  
  // Custom validation messages
  updateValidationMessage(field, isValid);
}

function updateValidationMessage(field, isValid) {
  const feedbackElement = field.parentNode.querySelector('.invalid-feedback');
  
  if (!isValid && feedbackElement) {
    const validityState = field.validity;
    let message = '';
    
    if (validityState.valueMissing) {
      message = `${field.labels[0]?.textContent || 'This field'} is required.`;
    } else if (validityState.typeMismatch) {
      message = `Please enter a valid ${field.type}.`;
    } else if (validityState.tooShort) {
      message = `Minimum length is ${field.minLength} characters.`;
    } else if (validityState.tooLong) {
      message = `Maximum length is ${field.maxLength} characters.`;
    } else if (validityState.patternMismatch) {
      message = field.dataset.patternMessage || 'Please match the requested format.';
    } else {
      message = field.validationMessage;
    }
    
    feedbackElement.textContent = message;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initRealtimeValidation);
```

### Custom Validation Rules

```javascript
// Custom validation class
class FormValidator {
  constructor(form) {
    this.form = form;
    this.rules = new Map();
    this.init();
  }
  
  // Add custom validation rule
  addRule(fieldName, validator, message) {
    if (!this.rules.has(fieldName)) {
      this.rules.set(fieldName, []);
    }
    this.rules.get(fieldName).push({ validator, message });
    return this;
  }
  
  // Validate single field
  validateField(field) {
    const fieldName = field.name || field.id;
    const rules = this.rules.get(fieldName) || [];
    
    // Check built-in validity first
    if (!field.checkValidity()) {
      return false;
    }
    
    // Check custom rules
    for (let rule of rules) {
      if (!rule.validator(field.value, field)) {
        this.setCustomError(field, rule.message);
        return false;
      }
    }
    
    this.clearCustomError(field);
    return true;
  }
  
  // Validate entire form
  validate() {
    const fields = this.form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  setCustomError(field, message) {
    field.setCustomValidity(message);
    field.classList.add('is-invalid');
    
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.textContent = message;
    }
  }
  
  clearCustomError(field) {
    field.setCustomValidity('');
    field.classList.remove('is-invalid');
    if (field.value.trim()) {
      field.classList.add('is-valid');
    }
  }
  
  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (this.validate()) {
        this.onSuccess();
      } else {
        this.onError();
      }
    });
    
    // Real-time validation
    const fields = this.form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('is-invalid')) {
          this.validateField(field);
        }
      });
    });
  }
  
  onSuccess() {
    // Override in implementation
    console.log('Form is valid');
  }
  
  onError() {
    // Override in implementation
    console.log('Form has errors');
  }
}
```

## Common Validation Scenarios

### User Registration Form

```html
<form class="needs-validation" id="registration-form" novalidate>
  <!-- Username -->
  <div class="mb-3">
    <label for="username" class="form-label">Username</label>
    <input type="text" class="form-control" id="username" name="username" 
           minlength="3" maxlength="20" pattern="^[a-zA-Z0-9_]+$" 
           data-pattern-message="Username can only contain letters, numbers, and underscores" 
           required>
    <div class="invalid-feedback"></div>
  </div>
  
  <!-- Email -->
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name="email" required>
    <div class="invalid-feedback"></div>
  </div>
  
  <!-- Password -->
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name="password" 
           minlength="8" required>
    <div class="invalid-feedback"></div>
    <div class="form-text">Password must be at least 8 characters with letters and numbers.</div>
  </div>
  
  <!-- Confirm Password -->
  <div class="mb-3">
    <label for="confirmPassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="confirmPassword" 
           name="confirmPassword" required>
    <div class="invalid-feedback"></div>
  </div>
  
  <!-- Terms Acceptance -->
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="terms" name="terms" required>
    <label class="form-check-label" for="terms">
      I agree to the <a href="#" target="_blank">Terms and Conditions</a>
    </label>
    <div class="invalid-feedback">
      You must accept the terms and conditions.
    </div>
  </div>
  
  <button type="submit" class="btn btn-primary">Register</button>
</form>
```

```javascript
// Initialize registration form validation
const registrationValidator = new FormValidator(document.getElementById('registration-form'));

// Custom password strength validation
registrationValidator.addRule('password', (value) => {
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  return hasLetter && hasNumber;
}, 'Password must contain both letters and numbers');

// Password confirmation validation
registrationValidator.addRule('confirmPassword', (value, field) => {
  const password = document.getElementById('password').value;
  return value === password;
}, 'Passwords do not match');

// Username availability check (async)
registrationValidator.addRule('username', async (value) => {
  if (value.length < 3) return true; // Let built-in validation handle length
  
  try {
    const response = await fetch(`/api/check-username?username=${encodeURIComponent(value)}`);
    const result = await response.json();
    return result.available;
  } catch (error) {
    console.error('Username check failed:', error);
    return true; // Allow submission if check fails
  }
}, 'Username is already taken');

registrationValidator.onSuccess = function() {
  // Submit form data
  submitRegistration(new FormData(this.form));
};
```

### Contact Form with File Upload

```html
<form class="needs-validation" id="contact-form" novalidate>
  <div class="row">
    <div class="col-md-6 mb-3">
      <label for="firstName" class="form-label">First Name</label>
      <input type="text" class="form-control" id="firstName" name="firstName" required>
      <div class="invalid-feedback">First name is required.</div>
    </div>
    
    <div class="col-md-6 mb-3">
      <label for="lastName" class="form-label">Last Name</label>
      <input type="text" class="form-control" id="lastName" name="lastName" required>
      <div class="invalid-feedback">Last name is required.</div>
    </div>
  </div>
  
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name="email" required>
    <div class="invalid-feedback">Please provide a valid email address.</div>
  </div>
  
  <div class="mb-3">
    <label for="subject" class="form-label">Subject</label>
    <select class="form-control" id="subject" name="subject" required>
      <option value="">Choose a subject...</option>
      <option value="general">General Inquiry</option>
      <option value="support">Technical Support</option>
      <option value="billing">Billing Question</option>
      <option value="other">Other</option>
    </select>
    <div class="invalid-feedback">Please select a subject.</div>
  </div>
  
  <div class="mb-3">
    <label for="message" class="form-label">Message</label>
    <textarea class="form-control" id="message" name="message" rows="5" 
              minlength="10" maxlength="1000" required></textarea>
    <div class="form-text">
      <span id="char-count">0</span>/1000 characters
    </div>
    <div class="invalid-feedback">Message must be between 10 and 1000 characters.</div>
  </div>
  
  <div class="mb-3">
    <label for="attachment" class="form-label">Attachment (optional)</label>
    <input type="file" class="form-control" id="attachment" name="attachment" 
           accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png" 
           data-max-size="5242880">
    <div class="form-text">Max file size: 5MB. Allowed: PDF, DOC, DOCX, TXT, JPG, PNG</div>
    <div class="invalid-feedback"></div>
  </div>
  
  <button type="submit" class="btn btn-primary">
    <span class="btn-text">Send Message</span>
    <span class="btn-loading d-none">
      <span class="spinner-border spinner-border-sm me-2"></span>
      Sending...
    </span>
  </button>
</form>
```

```javascript
// Contact form validation
const contactValidator = new FormValidator(document.getElementById('contact-form'));

// Character count for textarea
const messageField = document.getElementById('message');
const charCount = document.getElementById('char-count');

messageField.addEventListener('input', function() {
  charCount.textContent = this.value.length;
  
  // Color coding for character count
  if (this.value.length > 900) {
    charCount.className = 'text-danger';
  } else if (this.value.length > 800) {
    charCount.className = 'text-warning';
  } else {
    charCount.className = 'text-muted';
  }
});

// File validation
contactValidator.addRule('attachment', (value, field) => {
  if (!field.files.length) return true; // Optional field
  
  const file = field.files[0];
  const maxSize = parseInt(field.dataset.maxSize) || 5242880; // 5MB default
  
  if (file.size > maxSize) {
    return false;
  }
  
  return true;
}, 'File size must be less than 5MB');

contactValidator.onSuccess = async function() {
  const button = this.form.querySelector('button[type="submit"]');
  const btnText = button.querySelector('.btn-text');
  const btnLoading = button.querySelector('.btn-loading');
  
  // Show loading state
  button.disabled = true;
  btnText.classList.add('d-none');
  btnLoading.classList.remove('d-none');
  
  try {
    const formData = new FormData(this.form);
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      showSuccessMessage('Message sent successfully!');
      this.form.reset();
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    showErrorMessage('Failed to send message. Please try again.');
  } finally {
    // Restore button state
    button.disabled = false;
    btnText.classList.remove('d-none');
    btnLoading.classList.add('d-none');
  }
};
```

## Dynamic Form Fields

### Add/Remove Field Groups

```javascript
// Dynamic form field management
class DynamicFormManager {
  constructor(container, template) {
    this.container = container;
    this.template = template;
    this.fieldIndex = 0;
    this.init();
  }
  
  init() {
    // Add field button
    const addButton = this.container.querySelector('.add-field-btn');
    if (addButton) {
      addButton.addEventListener('click', () => this.addField());
    }
    
    // Initial remove button setup
    this.setupRemoveButtons();
  }
  
  addField() {
    this.fieldIndex++;
    
    // Clone template
    const newField = this.template.cloneNode(true);
    newField.classList.remove('d-none');
    
    // Update field attributes
    const inputs = newField.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const baseName = input.name.replace(/\[\d+\]/, '');
      input.name = `${baseName}[${this.fieldIndex}]`;
      input.id = `${input.id}_${this.fieldIndex}`;
      input.value = '';
      
      // Update associated label
      const label = newField.querySelector(`label[for="${input.id.replace('_' + this.fieldIndex, '')}"]`);
      if (label) {
        label.setAttribute('for', input.id);
      }
    });
    
    // Add to container
    this.container.insertBefore(newField, this.container.querySelector('.add-field-btn').parentNode);
    
    // Setup remove button
    this.setupRemoveButtons();
    
    // Initialize validation for new fields
    initRealtimeValidation();
  }
  
  removeField(fieldGroup) {
    if (this.container.querySelectorAll('.field-group:not(.d-none)').length > 1) {
      fieldGroup.remove();
    }
  }
  
  setupRemoveButtons() {
    const removeButtons = this.container.querySelectorAll('.remove-field-btn');
    removeButtons.forEach(btn => {
      btn.replaceWith(btn.cloneNode(true)); // Remove existing listeners
      
      const newBtn = this.container.querySelector(`[data-field-id="${btn.dataset.fieldId}"]`) || btn;
      newBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const fieldGroup = newBtn.closest('.field-group');
        this.removeField(fieldGroup);
      });
    });
  }
}

// Initialize dynamic forms
document.addEventListener('DOMContentLoaded', function() {
  const dynamicContainers = document.querySelectorAll('[data-dynamic-form]');
  
  dynamicContainers.forEach(container => {
    const template = container.querySelector('.field-template');
    if (template) {
      new DynamicFormManager(container, template);
    }
  });
});
```

## Accessibility Features

### Screen Reader Support

```javascript
// Enhance validation for screen readers
function enhanceAccessibility() {
  const forms = document.querySelectorAll('.needs-validation');
  
  forms.forEach(form => {
    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
      // Add ARIA attributes
      const invalidFeedback = field.parentNode.querySelector('.invalid-feedback');
      if (invalidFeedback) {
        const feedbackId = `${field.id}-feedback`;
        invalidFeedback.id = feedbackId;
        field.setAttribute('aria-describedby', feedbackId);
      }
      
      // Announce validation changes
      field.addEventListener('invalid', function() {
        this.setAttribute('aria-invalid', 'true');
        
        // Announce error to screen readers
        const message = this.validationMessage;
        announceToScreenReader(`Error: ${message}`);
      });
      
      field.addEventListener('input', function() {
        if (this.validity.valid) {
          this.setAttribute('aria-invalid', 'false');
        }
      });
    });
  });
}

function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
```

## Utility Functions

### Success and Error Messages

```javascript
// Toast notifications for form feedback
function showSuccessMessage(message) {
  showToast(message, 'success');
}

function showErrorMessage(message) {
  showToast(message, 'danger');
}

function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${type} border-0`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" 
              data-bs-dismiss="toast"></button>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  
  // Remove from DOM after hiding
  toast.addEventListener('hidden.bs.toast', () => {
    toast.remove();
  });
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container position-fixed top-0 end-0 p-3';
  document.body.appendChild(container);
  return container;
}
```

---

## Summary

Admindek's form validation system provides:

- **Bootstrap 5 integration** with built-in validation classes
- **Real-time validation** for immediate user feedback
- **Custom validation rules** for complex business logic
- **Accessibility compliance** with ARIA attributes and screen reader support
- **Dynamic form management** for adding/removing fields
- **File upload validation** with size and type checking
- **Professional error handling** with toast notifications
- **Async validation support** for server-side checks

This comprehensive validation system ensures forms are user-friendly, accessible, and robust for professional applications.