# Task: Authentication Pages (Login & Register)

## Goal

Develop Login and Register pages using Next.js, **React Hook Form**, and Sass modules for styling, integrating with the API at [https://taysatest.pythonanywhere.com/](https://taysatest.pythonanywhere.com/).

## Acceptance Criteria

### Register Page

- Form fields:

  - nickname (string, required)
  - email (valid email, required)
  - password (string, min 8 characters, must include letters and numbers)

- Use **React Hook Form** for form management and validation.
- Field validation:

  - nickname: required
  - email: must be valid
  - password: min 8 chars, letters + numbers

- On successful registration:

  - Store returned token (or user info) in cookies
  - Show toast notification
  - Redirect to Login page

- On error:
  - Show toast with error message from API

### Login Page

- Form fields:

  - email (valid email, required)
  - password (min 8 characters, letters + numbers)

- Use **React Hook Form** for form management and validation.
- API Endpoint: [https://share.apidog.com/4b7ea7f3-044c-4fa5-934b-3ad39e0f9619/user-info-20619547e0](https://share.apidog.com/4b7ea7f3-044c-4fa5-934b-3ad39e0f9619/user-info-20619547e0)

### Styling

- Use Sass modules: LoginPage.module.scss and RegisterPage.module.scss
- Responsive and modern design
- Input errors styled in red below inputs
- Buttons disabled during API request

### Toast Notifications

- Use react-hot-toast for success and error messages

### Cookies

- Store authentication info after login/registration:

  - Key: auth_token or user_info
  - Use js-cookie for browser-side storage

- Optional: set expiration (e.g., 7 days)

### Navigation / Redirect

- After registration → redirect to Login page
- After successful login → redirect to Dashboard page

### Bonus / Optional

- Add show/hide password toggle
- Add loading spinner in button during API requests
- Add client-side validation before API call
- Handle API errors and show under each input
