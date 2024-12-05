# AI Tools Usage Guidelines
> Best Practices for Maintaining Code Quality and Simplicity

## Core Principles

### 1. Preservation of Existing Code
- Never modify or remove existing code without explicit confirmation
- Always suggest changes rather than making direct modifications
- If changes are needed, propose them as additions or alternatives
- Keep original code comments and documentation intact

### 2. Simplicity First
- Implement the simplest solution that meets requirements
- Avoid over-engineering or premature optimization
- Use standard libraries and patterns over complex custom solutions
- Keep code readable and maintainable

### 3. Conservative Dependencies
- Only add new dependencies when absolutely necessary
- Prefer built-in solutions over external packages
- Validate necessity of each proposed package
- Consider long-term maintenance implications

## Implementation Guidelines

### Code Generation
```typescript
// DO - Simple, focused functions
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// DON'T - Overcomplicated solutions
function calculateTotalWithValidationAndCaching(
  items: Item[],
  options: ValidationOptions,
  cache: Cache
): Promise<number> {
  // Unnecessary complexity for simple calculation
}
```

### Database Operations
```sql
-- DO - Simple, clear queries
SELECT user_id, username, email 
FROM users 
WHERE active = true;

-- DON'T - Overcomplicated queries
SELECT 
  u.user_id, 
  u.username,
  u.email,
  (SELECT json_agg(l.login_time) FROM login_history l WHERE l.user_id = u.user_id) as login_history
FROM users u
WHERE active = true AND EXISTS (SELECT 1 FROM preferences p WHERE p.user_id = u.user_id);
```

### API Design
```typescript
// DO - Clear, focused endpoints
app.get('/api/users', getUsers);
app.post('/api/users', createUser);

// DON'T - Overloaded endpoints
app.post('/api/users', async (req, res) => {
  if (req.body.action === 'create') {
    // Create logic
  } else if (req.body.action === 'update') {
    // Update logic
  } else if (req.body.action === 'delete') {
    // Delete logic
  }
});
```

## Review Checklist

### Before Implementation
1. Is this the simplest possible solution?
2. Are all new dependencies necessary?
3. Does this preserve existing functionality?
4. Is the code self-documenting?

### During Implementation
1. Keep functions focused and small
2. Maintain existing naming conventions
3. Preserve existing error handling patterns
4. Follow established project structure

### After Implementation
1. Verify no existing tests were modified
2. Confirm backward compatibility
3. Check for unnecessary complexity
4. Validate documentation accuracy

## Common Pitfalls to Avoid

### 1. Over-Abstraction
```typescript
// DON'T
interface IEntityBaseFactoryBuilderService {
  createEntityBuilderFactory(): IEntityBuilderFactory;
}

// DO
interface UserService {
  createUser(data: UserData): Promise<User>;
}
```

### 2. Excessive Configuration
```typescript
// DON'T
const config = {
  debug: true,
  debugLevel: 'verbose',
  debugOutput: 'console',
  debugFormat: 'json',
  debugTimestamp: true,
  // ... many more options
};

// DO
const config = {
  debug: true,
  logLevel: 'info'
};
```

### 3. Unnecessary Optimization
```typescript
// DON'T - Premature optimization
const memoizedCalculation = memoize(
  (data: ComplexData) => {
    // Complex calculation that rarely changes
  }
);

// DO - Simple, readable code
function calculate(data: ComplexData) {
  return data.value * 2;
}
```

## Maintenance Guidelines

### 1. Documentation
- Keep documentation concise and relevant
- Update only affected sections
- Maintain existing documentation style
- Preserve historical context

### 2. Testing
- Add tests for new functionality only
- Don't modify existing test patterns
- Keep test cases focused and clear
- Maintain existing test organization

### 3. Version Control
- Make small, focused commits
- Keep commit messages clear and consistent
- Don't combine multiple changes
- Preserve git history

## Communication Guidelines

### When Suggesting Changes
1. Explain why changes are needed
2. Present multiple options when applicable
3. Highlight implications and trade-offs
4. Respect existing architectural decisions

### When Reviewing Code
1. Focus on necessary changes only
2. Suggest improvements without forcing changes
3. Respect existing patterns and conventions
4. Maintain code ownership boundaries

## Error Prevention

### 1. Validation
- Validate inputs at system boundaries
- Use type checking effectively
- Maintain existing error patterns
- Don't override error handling

### 2. State Management
- Keep state changes minimal
- Use immutable patterns where established
- Maintain existing state flow
- Don't introduce new state patterns

### 3. Security
- Preserve existing security measures
- Don't bypass established patterns
- Maintain access controls
- Keep security checks intact
