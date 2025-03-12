## SpecStory

## Creating cursor.rules for Project Guidelines (3/10/2025, 9:39:26 PM)

_**User**_

@development_roadmap.md @project_board_setup.md @project_structure.md @specification.md @technical_architecture.md @ui_ux_guidelines.md 

Using these documents as guidelines, create a cursor.rules file that keep everything in line@backend_board.md @frontend_board.md @README.md @README.md 

---

_**Assistant**_

I'll help you create a `cursor.rules` file that enforces consistent coding standards and project organization based on the provided documentation. I'll first search through the documents to gather relevant rules and guidelines.

---

_****_

<details>
            <summary>Searched codebase "rules style guidelines formatting standards" • **25** results</summary>
        
| File | Lines |
|------|-------|
| `docs/ui_ux_guidelines.md` | L1-267 |
| `docs/ui_ux_guidelines.md` | L1-267 |
| `inntouch-frontend/README.md` | L127-180 |
| `docs/ui_ux_guidelines.md` | L267-339 |
| `docs/ui_ux_guidelines.md` | L267-339 |
| `InnTouch-Backend/.eslintrc.js` | L1-39 |
| `inntouch-frontend/.eslintrc.json` | L1-48 |
| `inntouch-frontend/.prettierrc` | L1-10 |
| `docs/project_structure.md` | L1-246 |
| `InnTouch-Backend/.prettierrc` | L1-10 |
| `inntouch-frontend/README.md` | L1-127 |
| `docs/project_board_setup.md` | L198-305 |
| `InnTouch-Backend/server-test.html` | L1-60 |
| `inntouch-frontend/src/theme/index.js` | L1-72 |
| `docs/project_boards/README.md` | L46-87 |
| `docs/project_boards/frontend_board.md` | L61-100 |
| `README.md` | L1-156 |
| `docs/specification.md` | L47-144 |
| `inntouch-frontend/package.json` | L1-52 |
| `docs/project_boards/README.md` | L1-46 |
| `docs/technical_architecture.md` | L315-382 |
| `docs/technical_architecture.md` | L1-67 |
| `docs/project_board_setup.md` | L135-198 |
| `docs/technical_architecture.md` | L113-209 |
| `docs/technical_architecture.md` | L209-315 |

</details>

---

_****_

Based on the documentation and existing configuration files, I'll create a comprehensive `cursor.rules` file that enforces consistent coding standards and project organization. I'll write this file to ensure it aligns with the modular architecture and best practices outlined in the documentation.

---

_****_

```diff
- 
+ # InnTouch Project Rules
+ 
+ # Project Structure Rules
+ root_dirs:
+   - frontend: inntouch-frontend
+   - backend: inntouch-backend
+   - docs: docs
+ 
+ # File Organization
+ file_structure:
+   frontend:
+     src:
+       - components/
+       - contexts/
+       - hooks/
+       - pages/
+       - services/
+       - utils/
+       - theme/
+       - App.js
+       - index.js
+       - routes.js
+   backend:
+     src:
+       - config/
+       - controllers/
+       - middleware/
+       - models/
+       - routes/
+       - services/
+       - utils/
+       - app.js
+       - server.js
+ 
+ # Naming Conventions
+ naming:
+   components: PascalCase
+   functions: camelCase
+   variables: camelCase
+   constants: UPPER_SNAKE_CASE
+   files:
+     components: PascalCase.jsx
+     hooks: camelCase.js
+     utils: camelCase.js
+     styles: camelCase.css
+   css_classes: kebab-case
+ 
+ # Code Style
+ style:
+   indent: 2
+   quotes: single
+   semicolons: true
+   max_line_length: 100
+   trailing_comma: all
+   bracket_spacing: true
+   jsx_bracket_same_line: false
+   arrow_parens: avoid
+   end_of_line: lf
+ 
+ # TypeScript Configuration
+ typescript:
+   strict: true
+   target: ES2020
+   module: ESNext
+   jsx: react-jsx
+   allowJs: true
+   esModuleInterop: true
+ 
+ # Testing Requirements
+ testing:
+   frontend:
+     framework: jest
+     coverage_threshold: 80
+     required_tests:
+       - components
+       - hooks
+       - services
+   backend:
+     framework: jest
+     coverage_threshold: 80
+     required_tests:
+       - controllers
+       - services
+       - middleware
+ 
+ # Documentation Requirements
+ documentation:
+   components:
+     required:
+       - description
+       - props
+       - examples
+   functions:
+     required:
+       - description
+       - parameters
+       - return value
+   api_endpoints:
+     required:
+       - description
+       - method
+       - path
+       - request body
+       - response format
+       - authentication requirements
+ 
+ # Git Workflow
+ git:
+   branch_naming:
+     feature: feature/
+     bugfix: bugfix/
+     hotfix: hotfix/
+     release: release/
+   commit_message:
+     format: "<type>(<scope>): <description>"
+     types:
+       - feat
+       - fix
+       - docs
+       - style
+       - refactor
+       - test
+       - chore
+     max_length: 72
+ 
+ # Dependencies
+ dependencies:
+   frontend:
+     required:
+       - react
+       - react-dom
+       - react-router-dom
+       - @mui/material
+       - @emotion/react
+       - @emotion/styled
+       - firebase
+       - axios
+   backend:
+     required:
+       - express
+       - mongoose
+       - firebase-admin
+       - jsonwebtoken
+       - cors
+       - helmet
+ 
+ # Security Rules
+ security:
+   authentication:
+     jwt_expiration: 1h
+     refresh_token_expiration: 7d
+     password_requirements:
+       min_length: 8
+       require_uppercase: true
+       require_lowercase: true
+       require_number: true
+       require_special: true
+   api:
+     rate_limiting:
+       window_ms: 900000  # 15 minutes
+       max_requests: 100
+     required_headers:
+       - Authorization
+       - Content-Type
+     cors:
+       allowed_origins:
+         - http://localhost:3000
+         - https://*.inntouch.com
+       allowed_methods:
+         - GET
+         - POST
+         - PUT
+         - DELETE
+       allowed_headers:
+         - Authorization
+         - Content-Type
+ 
+ # Performance Requirements
+ performance:
+   frontend:
+     bundle_size_limit: 500KB
+     first_contentful_paint: 1.5s
+     time_to_interactive: 3.0s
+   backend:
+     response_time: 200ms
+     memory_usage: 512MB
+ 
+ # Accessibility Requirements
+ accessibility:
+   wcag_level: AA
+   color_contrast: 4.5:1
+   min_touch_target: 44px
+   keyboard_navigation: true
+   aria_labels: required
+ 
+ # UI/UX Standards
+ ui:
+   colors:
+     primary: "#1976D2"
+     secondary: "#00796B"
+     error: "#F44336"
+     warning: "#FFC107"
+     success: "#4CAF50"
+     text:
+       primary: "#212121"
+       secondary: "#757575"
+   typography:
+     font_family: "Roboto, Arial, sans-serif"
+     sizes:
+       h1: 24px
+       h2: 20px
+       h3: 18px
+       h4: 16px
+       h5: 14px
+       h6: 12px
+       body1: 16px
+       body2: 14px
+   spacing:
+     unit: 8px
+     grid: true
+   breakpoints:
+     xs: 0
+     sm: 600
+     md: 960
+     lg: 1280
+     xl: 1920
+ 
+ # Error Handling
+ error_handling:
+   frontend:
+     required_error_boundaries: true
+     error_reporting: true
+     fallback_ui: required
+   backend:
+     logging:
+       level: info
+       format: json
+     response_format:
+       success: boolean
+       message: string
+       data: object
+       errors: array
+ 
+ # Code Quality Tools
+ tools:
+   required:
+     - eslint
+     - prettier
+     - husky
+     - lint-staged
+   configurations:
+     eslint:
+       extends:
+         - eslint:recommended
+         - plugin:react/recommended
+         - plugin:react-hooks/recommended
+         - prettier
+     prettier:
+       singleQuote: true
+       trailingComma: all
+       tabWidth: 2
+       semi: true
+       printWidth: 100
+     husky:
+       hooks:
+         - pre-commit: lint-staged
+         - pre-push: npm test
+     lint_staged:
+       "*.{js,jsx,ts,tsx}":
+         - eslint --fix
+         - prettier --write
+       "*.{json,css,md}":
+         - prettier --write 
```

---

_****_

I've created a comprehensive `cursor.rules` file that defines all the coding standards, project organization rules, and best practices for the InnTouch project. The file is organized into several key sections:

1. **Project Structure Rules**: Defines the root directories and file organization for both frontend and backend.

2. **Naming Conventions**: Establishes consistent naming patterns for components, functions, variables, and files.

3. **Code Style**: Sets up formatting rules that match the existing ESLint and Prettier configurations.

4. **TypeScript Configuration**: Includes TypeScript settings for future TypeScript adoption.

5. **Testing Requirements**: Defines testing frameworks and coverage requirements.

6. **Documentation Requirements**: Establishes documentation standards for components, functions, and API endpoints.

7. **Git Workflow**: Defines branch naming conventions and commit message formats.

8. **Dependencies**: Lists required dependencies for both frontend and backend.

9. **Security Rules**: Establishes security standards for authentication, API access, and data protection.

10. **Performance Requirements**: Sets performance targets for both frontend and backend.

11. **Accessibility Requirements**: Defines WCAG compliance level and accessibility standards.

12. **UI/UX Standards**: Matches the Material-UI theme configuration from the documentation.

13. **Error Handling**: Establishes error handling patterns for both frontend and backend.

14. **Code Quality Tools**: Configures ESLint, Prettier, Husky, and lint-staged.

The rules are based on:
- The existing ESLint and Prettier configurations
- The project structure documentation
- The UI/UX guidelines
- The technical architecture document
- The modular architecture principles

This `cursor.rules` file will help maintain consistency across the codebase and ensure that all developers follow the same standards and best practices.

Would you like me to explain any specific section in more detail or make any adjustments to the rules?

---

_**User**_

Now will cursor chat always have this context for any prompt i give it?

---

_**Assistant**_

No, Cursor Chat won't automatically retain this context for future prompts. Each new chat session starts fresh, and the context needs to be re-established.

If you want Cursor Chat to be aware of these rules and project context in future conversations, you'll need to either:

1. Reference the `cursor.rules` file explicitly in your prompts
2. Add relevant files to your query by including them in the file paths
3. Create a new prompt that includes the necessary context

For example, if you want to discuss something related to the project's UI components, you might need to reference:
```
@cursor.rules
@docs/ui_ux_guidelines.md
```

This helps ensure that the AI has the correct context for providing accurate and consistent responses aligned with your project's standards.

The best practice would be to:
1. Keep the `cursor.rules` file in your project root
2. Reference it when needed along with other relevant documentation
3. Be specific about which parts of the context are relevant to your current query

Would you like me to show you an example of how to properly reference these files in future queries?

---



---

