# How to Use the LEAD Agent

This guide explains how to use the LEAD agent to generate technical implementation plans from issues.

## Quick Start

### Basic Usage

```bash
# In your AI assistant, invoke the LEAD agent with an issue:
@LEAD.md $issue=docs/issues/issue-1.md
```

The agent will:
1. Read all required documentation
2. Analyze the issue and requirements
3. Design the technical solution
4. Create a detailed task file in `docs/tasks/`

## Example Invocation

```
@LEAD.md please analyze docs/issues/issue-1.md and create an implementation plan
```

## What the Agent Does

### 1. Documentation Review
The agent automatically reads:
- The specified issue file
- `docs/memory-bank/STACK.md` - Technology stack
- `docs/memory-bank/API.md` - Existing API endpoints
- `docs/memory-bank/DATABASE.md` - Database schema
- `docs/memory-bank/PROJECT_BRIEF.md` - Project overview

### 2. Requirements Analysis
- Extracts user stories
- Identifies acceptance criteria
- Analyzes mockups (mobile/desktop)
- Notes technical dependencies

### 3. Technical Design
- Proposes component architecture
- Defines API endpoints needed
- Specifies database changes
- Recommends design patterns

### 4. Task Breakdown
- Creates atomic, testable tasks
- Organizes into phases
- Estimates complexity (S/M/L/XL)
- Defines dependencies

### 5. Output Generation
Creates a file: `docs/tasks/TASK-YYYY-MM-DD-feature-name.md`

## Output Structure

Each generated task file includes:

```markdown
# TASK: Feature Title

📋 Executive Summary
🎯 Objectives
🔍 Technical Analysis
  - Frontend Components
  - Required APIs
  - Database Changes
  - Dependencies
📐 Proposed Architecture
✅ Development Plan
  - Phase 1: Database & Setup
  - Phase 2: API Development
  - Phase 3: Frontend Components
  - Phase 4: Integration & Testing
🛠️ Development Guidelines
✓ Acceptance Criteria
📚 References
📝 Additional Notes
```

## Best Practices

### When to Use the LEAD Agent
- ✅ Before starting implementation of a new feature
- ✅ To break down complex issues
- ✅ To ensure consistent architecture
- ✅ To estimate development time

### After Generation
1. **Review** the generated plan
2. **Adjust** complexity estimates if needed
3. **Share** with the development team
4. **Use** as a reference during implementation
5. **Update** checkboxes as tasks are completed

## Example Workflow

```
1. Product creates issue → docs/issues/issue-X.md
2. Run LEAD agent → @LEAD.md $issue=docs/issues/issue-X.md
3. Agent generates → docs/tasks/TASK-2025-11-XX-feature.md
4. Developer reviews → Makes adjustments if needed
5. Implementation → Follow the phases
6. Testing → Verify acceptance criteria
7. Complete → All checkboxes marked ✓
```

## Tips

- **Specific Issues**: The more detailed the issue, the better the plan
- **Mockups**: Include visual mockups for accurate frontend specs
- **Context**: Ensure memory-bank docs are up-to-date
- **Feedback Loop**: Update the LEAD prompt based on team feedback

## Troubleshooting

### Plan Too Generic?
→ Ensure the issue has detailed user stories and acceptance criteria

### Missing Technical Details?
→ Update `docs/memory-bank/` files with more architecture info

### Wrong Technology Choices?
→ Review and update `docs/memory-bank/STACK.md`

### Tasks Too Large?
→ Ask the agent to break down specific tasks further

## Related Files

- `/docs/agents/LEAD.md` - Agent prompt and configuration
- `/docs/issues/` - Feature issues and requirements
- `/docs/tasks/` - Generated implementation plans
- `/docs/memory-bank/` - Project documentation
