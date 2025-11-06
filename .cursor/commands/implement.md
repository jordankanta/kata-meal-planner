---
description: Execute implementation workflow following Code → Test → Commit → Review process
args:
  task_id:
    description: Task identifier (e.g., TASK-2.1)
    required: true
---

# Implementation Command

Read and execute the workflow defined in @docs/prompts/IMPLEMENT.md for the specified task.

**Task:** {task_id}

**Instructions:**
1. Read `docs/prompts/IMPLEMENT.md` completely
2. Read the task file `docs/tasks/TASK-*.md` matching the task_id
3. Follow all required reading (STACK.md, API.md, DATABASE.md)
4. Execute the workflow: Setup → Implementation → Testing → Commit → Quality Review → Documentation
5. Apply all rules and standards from IMPLEMENT.md

**Process:**
- Follow Code → Test → Commit → Review workflow
- Make atomic commits with conventional commit format
- Write tests achieving 80%+ coverage
- Complete quality checklist before finishing
- Handle all edge cases and error states

Begin implementation now.
