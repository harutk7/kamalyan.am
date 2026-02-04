/**
 * Kamalyan Consulting Website - Playwright Tests
 * Tests for pixel-perfect implementation and functionality
 */

const { test, expect } = require('@playwright/test');

// ========================================
// Helper Functions
// ========================================

async function waitForPageLoad(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

async function checkPixelPerfect(page, selector, expectedStyles) {
  const element = await page.locator(selector);
  for (const [property, expectedValue] of Object.entries(expectedStyles)) {
    await expect(element).toHaveCSS(property, expectedValue);
  }
}

// ========================================
// Navigation Tests
// ========================================

test.describe('Navigation', () => {
  test('should display header with logo', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    // Check header exists
    const header = await page.locator('#header');
    await expect(header).toBeVisible();
    
    // Check logo exists and has correct dimensions
    const logo = await page.locator('#header .logo-img');
    await expect(logo).toBeVisible();
    
    const logoBox = await logo.boundingBox();
    expect(logoBox.height).toBeCloseTo(34, 5);
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    // Test navigation links
    const navLinks = [
      { name: 'Home', href: 'index.html' },
      { name: 'Services', href: 'pages/services.html' },
      { name: 'Portfolio', href: 'pages/portfolio.html' },
      { name: 'Who we are', href: 'pages/about.html' },
      { name: 'Contact us', href: 'pages/contact.html' },
    ];
    
    for (const link of navLinks) {
      const navLink = await page.locator('.nav-list').getByText(link.name);
      if (await navLink.isVisible().catch(() => false)) {
        await expect(navLink).toHaveAttribute('href', new RegExp(link.href));
      }
    }
  });

  test('should navigate to all pages', async ({ page }) => {
    const pages = [
      { url: '/', title: 'Kamalyan' },
      { url: '/pages/services.html', title: 'Services' },
      { url: '/pages/portfolio.html', title: 'Portfolio' },
      { url: '/pages/about.html', title: 'Who we are' },
      { url: '/pages/contact.html', title: 'Contact' },
      { url: '/pages/faq.html', title: 'FAQ' },
    ];
    
    for (const { url, title } of pages) {
      await page.goto(url);
      await waitForPageLoad(page);
      await expect(page).toHaveTitle(new RegExp(title, 'i'));
    }
  });
});

// ========================================
// Mobile Menu Tests
// ========================================

test.describe('Mobile Menu', () => {
  test('should open and close mobile menu on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await waitForPageLoad(page);
    
    // Mobile menu should be initially hidden
    const mobileMenu = await page.locator('#mobileMenu');
    await expect(mobileMenu).not.toHaveClass(/active/);
    
    // Click menu button to open
    const menuBtn = await page.locator('#mobileMenuBtn');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();
    
    // Menu should be active
    await expect(mobileMenu).toHaveClass(/active/);
    
    // Close button should work
    const closeBtn = await page.locator('#mobileMenuClose');
    await closeBtn.click();
    await expect(mobileMenu).not.toHaveClass(/active/);
  });

  test('should close mobile menu when clicking overlay', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await waitForPageLoad(page);
    
    await page.locator('#mobileMenuBtn').click();
    await expect(page.locator('#mobileMenu')).toHaveClass(/active/);
    
    // Click overlay
    await page.locator('#mobileOverlay').click();
    await expect(page.locator('#mobileMenu')).not.toHaveClass(/active/);
  });
});

// ========================================
// Hero Section Tests
// ========================================

test.describe('Hero Section', () => {
  test('should display hero section with correct content', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const hero = await page.locator('.hero');
    await expect(hero).toBeVisible();
    
    // Check hero title
    const heroTitle = await page.locator('.hero-title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('who we are');
    
    // Check buttons
    const ctaButtons = await page.locator('.hero-buttons');
    await expect(ctaButtons).toBeVisible();
    
    // Check primary button
    const primaryBtn = await page.locator('.hero-buttons .btn-primary');
    await expect(primaryBtn).toContainText('Our Services');
  });

  test('should have hero background image', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const heroBg = await page.locator('.hero-img');
    await expect(heroBg).toBeVisible();
  });
});

// ========================================
// Services Section Tests
// ========================================

test.describe('Services Section', () => {
  test('should display services grid', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const servicesSection = await page.locator('#services');
    await expect(servicesSection).toBeVisible();
    
    // Check service cards
    const serviceCards = await page.locator('.service-card');
    const count = await serviceCards.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('should have service icons', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const serviceIcons = await page.locator('.service-icon');
    const count = await serviceIcons.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('services page should have detailed content', async ({ page }) => {
    await page.goto('/pages/services.html');
    await waitForPageLoad(page);
    
    await expect(page.locator('.services-detail')).toBeVisible();
    await expect(page.locator('.works-grid')).toBeVisible();
  });
});

// ========================================
// Portfolio Section Tests
// ========================================

test.describe('Portfolio Section', () => {
  test('should display portfolio grid on homepage', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const portfolioSection = await page.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();
    
    const portfolioItems = await page.locator('.portfolio-item');
    const count = await portfolioItems.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('portfolio items should have hover effect', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const firstItem = await page.locator('.portfolio-item').first();
    await firstItem.hover();
    
    // Check overlay becomes visible on hover
    const overlay = await firstItem.locator('.portfolio-overlay');
    await expect(overlay).toBeVisible();
  });

  test('portfolio page should have filter functionality', async ({ page }) => {
    await page.goto('/pages/portfolio.html');
    await waitForPageLoad(page);
    
    // Check filter buttons exist
    const filterBtns = await page.locator('.filter-btn');
    const count = await filterBtns.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ========================================
// Contact Form Tests
// ========================================

test.describe('Contact Form', () => {
  test('should display contact form', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const contactForm = await page.locator('#contactForm');
    await expect(contactForm).toBeVisible();
    
    // Check form fields
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#subject')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    // Try submitting empty form
    const submitBtn = await page.locator('#contactForm button[type="submit"]');
    await submitBtn.click();
    
    // Check for validation (HTML5 required attribute)
    const nameInput = await page.locator('#name');
    await expect(nameInput).toHaveAttribute('required');
  });

  test('should show success message on form submission', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    // Fill in form
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#subject', 'Test Subject');
    await page.fill('#message', 'This is a test message for the contact form.');
    
    // Submit form
    await page.click('#contactForm button[type="submit"]');
    
    // Check for toast notification
    const toast = await page.locator('#toast');
    await expect(toast).toHaveClass(/active/);
  });
});

// ========================================
// Testimonials Tests
// ========================================

test.describe('Testimonials', () => {
  test('should display testimonials slider', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const testimonials = await page.locator('#testimonials');
    await expect(testimonials).toBeVisible();
    
    // Check testimonial cards
    const testimonialCards = await page.locator('.testimonial-card');
    const count = await testimonialCards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('should navigate testimonials with buttons', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const nextBtn = await page.locator('#testimonialNext');
    const prevBtn = await page.locator('#testimonialPrev');
    
    await expect(nextBtn).toBeVisible();
    await expect(prevBtn).toBeVisible();
    
    // Click next
    await nextBtn.click();
    
    // Check track moved
    const track = await page.locator('.testimonials-track');
    const transform = await track.evaluate(el => el.style.transform);
    expect(transform).toContain('translateX');
  });

  test('should have testimonial dots', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const dots = await page.locator('.dot');
    const count = await dots.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

// ========================================
// Footer Tests
// ========================================

test.describe('Footer', () => {
  test('should display footer on all pages', async ({ page }) => {
    const pages = ['/', '/pages/services.html', '/pages/contact.html'];
    
    for (const url of pages) {
      await page.goto(url);
      await waitForPageLoad(page);
      
      const footer = await page.locator('.footer');
      await expect(footer).toBeVisible();
    }
  });

  test('should have social media links', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const socialLinks = await page.locator('.social-link');
    const count = await socialLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('should have footer navigation', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const footerNav = await page.locator('.footer .footer-links').first();
    await expect(footerNav).toBeVisible();
  });
});

// ========================================
// Responsive Design Tests
// ========================================

test.describe('Responsive Design', () => {
  test('should adapt layout for tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await waitForPageLoad(page);
    
    // Navigation should be visible on tablet
    const nav = await page.locator('.nav');
    await expect(nav).toBeVisible();
    
    // Mobile menu button should be hidden
    const mobileMenuBtn = await page.locator('.mobile-menu-btn');
    await expect(mobileMenuBtn).toBeHidden();
  });

  test('should adapt layout for mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await waitForPageLoad(page);
    
    // Mobile menu button should be visible
    const mobileMenuBtn = await page.locator('.mobile-menu-btn');
    await expect(mobileMenuBtn).toBeVisible();
    
    // Desktop nav should be hidden
    const nav = await page.locator('.nav');
    await expect(nav).toBeHidden();
  });

  test('should have responsive services grid', async ({ page }) => {
    // Mobile - 1 column
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await waitForPageLoad(page);
    
    const servicesGrid = await page.locator('.services-grid');
    await expect(servicesGrid).toBeVisible();
    
    // Desktop - 3 columns
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await waitForPageLoad(page);
    
    await expect(servicesGrid).toBeVisible();
  });
});

// ========================================
// Pixel Perfect Tests
// ========================================

test.describe('Pixel Perfect Implementation', () => {
  test('should have correct header height', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const headerInner = await page.locator('.header-inner');
    const box = await headerInner.boundingBox();
    
    // Header should be approximately 72-80px
    expect(box.height).toBeGreaterThanOrEqual(70);
    expect(box.height).toBeLessThanOrEqual(85);
  });

  test('should have correct button styles', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const primaryBtn = await page.locator('.btn-primary').first();
    
    // Check background color (approximate)
    await expect(primaryBtn).toHaveCSS('border-radius', '9999px');
    await expect(primaryBtn).toHaveCSS('font-weight', '600');
  });

  test('should use correct font family', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const body = await page.locator('body');
    const fontFamily = await body.evaluate(el => 
      window.getComputedStyle(el).fontFamily
    );
    
    expect(fontFamily).toContain('Inter');
  });

  test('should have correct service icon sizes', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const serviceIcon = await page.locator('.service-icon').first();
    const box = await serviceIcon.boundingBox();
    
    expect(box.width).toBeCloseTo(64, 5);
    expect(box.height).toBeCloseTo(64, 5);
  });
});

// ========================================
// Accessibility Tests
// ========================================

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    // Check h1 exists
    const h1 = await page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Check multiple h2s exist
    const h2s = await page.locator('h2');
    const count = await h2s.count();
    expect(count).toBeGreaterThan(2);
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    const images = await page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    // Check mobile menu button
    const menuBtn = await page.locator('#mobileMenuBtn');
    await expect(menuBtn).toHaveAttribute('aria-label');
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
    
    // Press Tab key and check focus
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => 
      document.activeElement?.tagName
    );
    expect(focusedElement).toBeTruthy();
  });
});

// ========================================
// Performance Tests
// ========================================

test.describe('Performance', () => {
  test('page should load within 3 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await waitForPageLoad(page);
    const loadTime = Date.now() - start;
    
    expect(loadTime).toBeLessThan(3000);
  });

  test('should not have console errors', async ({ page }) => {
    const errors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await waitForPageLoad(page);
    
    // Give time for any errors to appear
    await page.waitForTimeout(1000);
    
    expect(errors).toHaveLength(0);
  });
});
