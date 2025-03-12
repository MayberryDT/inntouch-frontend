# InnTouch Project Boards

This directory contains markdown-based project boards for tracking development tasks for the InnTouch project. These boards provide a simple, version-controlled alternative to GitHub Projects.

## Available Boards

- [Frontend Development Board](./frontend_board.md) - Tracks tasks for the frontend repository
- [Backend Development Board](./backend_board.md) - Tracks tasks for the backend repository

## Why Markdown-Based Project Boards?

While GitHub Projects provides a rich UI for project management, using markdown files for project boards offers several advantages:

1. **Version Control** - Changes to the project board are tracked in git history
2. **Offline Access** - Boards can be viewed and updated without internet access
3. **Simplicity** - No need for additional permissions or complex setup
4. **Portability** - Easy to move between repositories or export
5. **Integration with Documentation** - Boards live alongside other project documentation

## How to Use These Boards

### Viewing Tasks

Each board is organized into columns representing different stages of work:

- **To Do** - Tasks that are planned but not yet started
- **In Progress** - Tasks that are currently being worked on
- **Review** - Tasks that are completed and awaiting review
- **Blocked** - Tasks that are blocked by dependencies or other issues
- **Done** - Tasks that are completed

### Updating Tasks

To update the status of a task:

1. Edit the appropriate markdown file
2. Cut and paste the task item between sections
3. Update the task details as needed
4. Commit the changes to the repository

### Task Format

Tasks follow this format:

```markdown
- [ ] Task name
  - **Labels**: label1, label2
  - **Milestone**: Milestone name
  - **Assignee**: @username (when assigned)
  - **Issue**: #issue_number (if applicable)
  - **PR**: #PR_number (when in review)
  - **Started**: YYYY-MM-DD (when in progress)
  - **Completed**: YYYY-MM-DD (when done)
  - **Blocked by**: Description or #issue_number (when blocked)
```

When a task is completed, change `- [ ]` to `- [x]`.

### Integration with GitHub Issues

These boards reference GitHub issues by their number (e.g., `#1`). When viewing the markdown files on GitHub, these will automatically link to the corresponding issues.

## Synchronization with GitHub

While these boards are maintained separately from GitHub Projects, they reference the same issues and pull requests. To keep everything in sync:

1. When creating a new issue on GitHub, add it to the appropriate board
2. When updating an issue status on GitHub, update the board accordingly
3. When moving a task on the board, update the issue status on GitHub

## Board Maintenance

Periodically, the boards should be cleaned up:

1. Archive completed tasks to an archive file (e.g., `frontend_board_archive_2025Q1.md`)
2. Remove tasks that are no longer relevant
3. Add new tasks from the roadmap

## Getting Started

To start using these boards:

1. Clone the repository
2. Navigate to the `docs/project_boards` directory
3. Open the relevant board in your favorite markdown editor
4. Update tasks as you work on them
5. Commit and push your changes 