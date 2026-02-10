# Feature Specification: Task Assignment to People

## Overview

Our todo application currently allows users to create and manage tasks, but there's no way to track who is responsible for completing each task. This feature will enable users to manage a list of team members and assign tasks to specific people, making it clear who is accountable for what work.

## Business Need

In team environments, it's essential to know who is responsible for each task. Without this capability, teams must rely on external tools or manual tracking to assign work, which creates friction and reduces the value of the todo application.

## Feature Requirements

### Person Management

Users need the ability to maintain a list of people who can be assigned to tasks.

**Required Capabilities:**
- Add a new person by providing their name
- View the complete list of all people
- Edit a person's name if it was entered incorrectly or if they change their name
- Remove a person from the list when they leave the team or are no longer needed

**Rules:**
- Each person must have a name
- Person names should be unique to avoid confusion
- Removing a person should only be possible if they are not currently assigned to any tasks.

### Task Assignment

Users need the ability to link tasks with specific people.

**Required Capabilities:**
- When creating a new task, optionally select a person to assign it to
- If no person is selected, store `NULL` in the corresponding database field
- When editing an existing task, assign it to a person or change the current assignment
- Remove the assignment from a task (make it unassigned)
- View who a task is assigned to when looking at the task list

**Rules:**
- A task can be assigned to at most one person (no shared assignments)
- A task does not have to be assigned to anyone - assignments are optional
- The same person can be assigned to multiple tasks
- If a task is already assigned and we assign it to someone else, the previous assignment is replaced

### Filtering Tasks by Person

Users need the ability to view only the tasks assigned to a specific person.

**Required Capabilities:**
- Select a person from the list and see all tasks assigned to them
- See unassigned tasks (tasks not assigned to anyone, i.e. `NULL` in the assignment field)
- Make sure to align the _unassigned_ view with checking for `NULL` in the database. Design the API and frontend accordingly.
- Clear the filter to see all tasks again

**Rules:**
- The filter should show current assignments only
- When a person is selected, only their tasks should be visible
- The count of tasks should reflect the filtered view

## Required Quality Assurance

Once the entire code has been written, perform the following quality assurance steps:

* Use the database-filler subagent to fill the database with meaningful demo data
* Run the application (backend and frontend).
* Use the browser subagent to test the application. The test must include at least the following steps:
  * Create a new person
  * Create a new task assigned to the person
  * Filter the list of tasks to show only the tasks assigned to the person. Make sure the new task is listed as assigned to the person.
  * Mark a task as done
  * Unassign the task from the person
  * Filter the list of tasks to show only the unassigned tasks. Make sure the new task is listed as unassigned.
  * Delete the task from the list.
