---
description: Generate detailed implementation plan for a task following Implementation → Test → Review workflow
args:
  task_id:
    description: Task identifier (e.g., TASK-2.1)
    required: true
---

# Planning Command

Read and execute the planning workflow defined in @docs/prompts/PLAN.md for the specified task.

**Task:** {task_id}

**Instructions:**
1. Read `docs/prompts/PLAN.md` completely
2. Read the task file `docs/tasks/TASK-*.md` matching the task_id
3. Follow all required reading (STACK.md, API.md, DATABASE.md)
4. Break down the subtask into atomic implementation steps
5. Define comprehensive test strategy (unit, integration, E2E)
6. Specify review checklist items

**Output:**
- Detailed implementation plan with clear steps (5-15min each)
- Test requirements with Given-When-Then scenarios
- Review criteria and acceptance checklist
- File paths and code structure for each step
- Potential issues and solutions

Begin planning now.
