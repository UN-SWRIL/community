# Styles

This directory contains legacy style definitions used in certain parts of the application. 

## Transition Plan

The application is transitioning to use the Theme Context for styling (`src/context/ThemeContext.tsx` and `src/theme/theme.ts`). 

Advantages of using the Theme Context:
- Dynamic theme switching (light/dark mode)
- Centralized style management
- Type safety with TypeScript
- Better support for responsive design

### How to Transition

When updating components:

1. Replace:
```typescript
import { colors } from '../../styles/colors';
```

With:
```typescript
import { useTheme } from '../../hooks/useTheme';
// Then inside your component:
const { colors } = useTheme();
```

2. If your component uses `textLight`, replace it with `textSecondary`:
```typescript
// Before
<Text style={{ color: colors.textLight }}>...</Text>

// After
<Text style={{ color: colors.textSecondary }}>...</Text>
```

3. For dark mode colors, they're now automatically handled by the theme context when dark mode is active.

### Why We're Keeping This Directory

We're keeping the `styles` directory for backward compatibility with existing components. Eventually, all components will be migrated to use the Theme Context. 