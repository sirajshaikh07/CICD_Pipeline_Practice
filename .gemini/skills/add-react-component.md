# Skill: Add React Component + API Integration

Use this skill when the user asks to add a new frontend feature connected to the backend.

## Steps

1. **Add API functions** in `todo-frontend/src/api/`
   - Create a new file `{entity}Api.js` if it's a different entity
   - Use axios instance with `baseURL: http://localhost:8080/api/{entities}`
   - Export functions: `getAll`, `getById`, `create`, `update`, `delete`
   - **Never use trailing slashes** in paths

2. **Create Component(s)** in `todo-frontend/src/components/`
   - Functional components with hooks
   - Destructure props
   - Add unique `id` attributes to all interactive elements
   - Handle loading, error, and empty states

3. **Add Styles** in `todo-frontend/src/App.css`
   - Use BEM naming: `.component__element--modifier`
   - Use CSS variables from `index.css` — never hardcode colors
   - Add hover effects, transitions, and animations
   - Include mobile breakpoint at `max-width: 600px`

4. **Integrate in App.jsx**
   - Import the component
   - Add state management with `useState`
   - Fetch data with `useEffect`
   - Handle CRUD operations with toast feedback

## Template: API Service
```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api/{entities}',
  headers: { 'Content-Type': 'application/json' },
});

export const getAll{Entities} = () => API.get('');
export const get{Entity}ById = (id) => API.get(`/${id}`);
export const create{Entity} = (data) => API.post('', data);
export const update{Entity} = (id, data) => API.put(`/${id}`, data);
export const delete{Entity} = (id) => API.delete(`/${id}`);
```

## Template: Component
```jsx
import { useState } from 'react';

export default function {Entity}Item({ item, onUpdate, onDelete }) {
  // component logic

  return (
    <div className="{entity}-item" id={`{entity}-${item.id}`}>
      {/* content */}
    </div>
  );
}
```

## Design Guidelines
- Dark theme with indigo/violet palette
- Cards with `.bg-card` background, subtle borders
- Custom checkboxes with gradient
- Slide-in animations for new items
- Hover-reveal action buttons
- Toast notifications for all user actions
