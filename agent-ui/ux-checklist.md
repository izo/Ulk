# UX Checklist

## Table of Contents
1. [Navigation & Information Architecture](#navigation--information-architecture)
2. [User Flows](#user-flows)
3. [Accessibility (a11y)](#accessibility-a11y)
4. [Interactions & Feedback](#interactions--feedback)
5. [Forms & Input](#forms--input)
6. [Performance Perception](#performance-perception)
7. [Error Handling](#error-handling)
8. [Mobile UX](#mobile-ux)

---

## Navigation & Information Architecture

### Critical 🔴
- [ ] Primary navigation is immediately visible and accessible
- [ ] Current location is clearly indicated (active states, breadcrumbs)
- [ ] All interactive elements are keyboard accessible
- [ ] Skip links present for screen readers

### Major 🟠
- [ ] Navigation hierarchy reflects user mental models
- [ ] Maximum 3 clicks to reach any content
- [ ] Back button works as expected
- [ ] Search functionality if content is extensive (>20 pages)

### Minor 🟡
- [ ] Hover states clearly indicate clickable elements
- [ ] Navigation is consistent across all pages
- [ ] Logo links to homepage
- [ ] 404 page provides helpful navigation options

---

## User Flows

### Critical 🔴
- [ ] Primary user journey completes without errors
- [ ] No dead ends in critical flows
- [ ] Clear call-to-action on each step
- [ ] Progress indication for multi-step processes

### Major 🟠
- [ ] Confirmation before destructive actions
- [ ] Ability to undo recent actions
- [ ] Clear success/completion states
- [ ] Recovery path from errors

### Minor 🟡
- [ ] Optional shortcuts for power users
- [ ] Remember user preferences/state
- [ ] Contextual help available
- [ ] Onboarding for new users

---

## Accessibility (a11y)

### Critical 🔴
- [ ] All images have meaningful alt text
- [ ] Color contrast ratio ≥ 4.5:1 (text), ≥ 3:1 (large text)
- [ ] Focus indicators visible and clear
- [ ] Semantic HTML structure (headings, landmarks, lists)
- [ ] ARIA labels on interactive elements without visible text

### Major 🟠
- [ ] Tab order follows visual layout
- [ ] No content relies solely on color
- [ ] Forms have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Modals trap focus appropriately

### Minor 🟡
- [ ] Reduced motion preference respected
- [ ] Text resizable to 200% without breaking layout
- [ ] Touch targets ≥ 44x44px
- [ ] Links distinguished from regular text (not just color)

### Info 🔵
- [ ] WCAG 2.1 AA compliance documented
- [ ] Accessibility statement present
- [ ] Skip to main content link

---

## Interactions & Feedback

### Critical 🔴
- [ ] Loading states for async operations
- [ ] Immediate feedback on user actions (<100ms)
- [ ] No interaction without visual confirmation

### Major 🟠
- [ ] Hover/focus/active states clearly different
- [ ] Disabled states clearly communicate unavailability
- [ ] Animations don't block user input
- [ ] Drag-and-drop has keyboard alternative

### Minor 🟡
- [ ] Micro-interactions enhance understanding
- [ ] Consistent animation timing (200-300ms typical)
- [ ] Skeleton loaders for content
- [ ] Optimistic UI updates where appropriate

---

## Forms & Input

### Critical 🔴
- [ ] All inputs have visible labels
- [ ] Error messages specific and actionable
- [ ] Required fields clearly marked
- [ ] Form submits correctly

### Major 🟠
- [ ] Inline validation with clear timing
- [ ] Input types match data (email, tel, number)
- [ ] Autofill/autocomplete enabled appropriately
- [ ] Multi-step forms save progress

### Minor 🟡
- [ ] Placeholder text as example, not label
- [ ] Input masks for formatted data (phone, card)
- [ ] Character/word count for limited fields
- [ ] Smart defaults reduce input effort

---

## Performance Perception

### Critical 🔴
- [ ] First contentful paint < 2s
- [ ] Time to interactive < 5s
- [ ] No layout shift after content loads (CLS < 0.1)

### Major 🟠
- [ ] Above-the-fold content prioritized
- [ ] Progress indicators for long operations
- [ ] Lazy loading for below-fold content
- [ ] Responsive feedback under slow connections

### Minor 🟡
- [ ] Skeleton screens during loading
- [ ] Perceived progress (don't show 0-100 instantly)
- [ ] Preloading for predictable next actions

---

## Error Handling

### Critical 🔴
- [ ] Errors don't crash the application
- [ ] Error messages are user-friendly (not stack traces)
- [ ] Clear recovery path from any error

### Major 🟠
- [ ] Specific error messages per error type
- [ ] Retry mechanism for network errors
- [ ] Form errors preserved on page refresh
- [ ] Graceful degradation without JavaScript

### Minor 🟡
- [ ] Error logging for debugging
- [ ] Helpful 404/500 pages
- [ ] Offline state handling

---

## Mobile UX

### Critical 🔴
- [ ] Responsive layout works on common breakpoints
- [ ] Touch targets minimum 44x44px
- [ ] No horizontal scroll on mobile
- [ ] Viewport meta tag correctly set

### Major 🟠
- [ ] Mobile navigation accessible (hamburger, bottom nav)
- [ ] Forms usable on mobile (appropriate keyboards)
- [ ] Images scale appropriately
- [ ] Text readable without zooming (16px+ base)

### Minor 🟡
- [ ] Pull-to-refresh where expected
- [ ] Swipe gestures for common actions
- [ ] Orientation changes handled smoothly
- [ ] Thumb-zone optimization for primary actions
