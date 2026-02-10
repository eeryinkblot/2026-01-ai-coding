# Feature Specification: Printable Todo List

## Overview

Our todo application currently focuses on interactive task management in the browser, but it does not provide a dedicated way to create a clean, printer-friendly list. This feature will add a dedicated page where users can prepare a printable version of their todo items, including an easy option to include or exclude completed tasks.

## Business Need

Users often need a physical checklist for meetings, offline work, or personal planning. Printing directly from the current UI can include controls and layout elements that are not suitable for paper. A dedicated printable page improves readability, reduces clutter, and helps users share or work through tasks away from a screen.

## Feature Requirements

### Printable List Route

Users need a dedicated frontend route where they can create a printer-friendly list of todo items.

**Required Capabilities:**
- Add a frontend route specifically for printable todo lists
- Navigate to this route and see a page optimized for printing
- Render todo items in a clean, paper-friendly layout without unnecessary app controls
- Allow users to trigger browser printing from this page

**Rules:**
- The route must be reachable through the frontend router
- The route must focus on print readability (clear spacing, legible text, minimal visual noise)
- The printable page must show task content that is meaningful on paper even without interactive UI elements

### Include Done Items Toggle

Users need an easy way, at the top of the printable page, to choose whether completed tasks are included.

**Required Capabilities:**
- Provide a clearly visible control at the top of the printable page for including done items
- Let users switch between:
  - showing all relevant tasks including done items
  - showing only not-done tasks
- Update the displayed printable list immediately when the selection changes

**Rules:**
- The include-done control must be placed at the top of the page
- The default state should be clearly defined and consistent
- Done-state filtering must be based on the task completion flag used by the existing todo model

### Printable Content Behavior

Users need printed output that is practical as a checklist.

**Required Capabilities:**
- Display each todo item as a separate, clearly readable line or block
- Preserve a clear distinction between done and not-done tasks when done items are included
- Keep the print layout consistent between on-screen print preview and actual print output

**Rules:**
- Printed output must avoid clipped or overlapping text
- Visual styling should prioritize black-and-white legibility
- The page should avoid elements that do not add value on paper (e.g., decorative UI chrome)
