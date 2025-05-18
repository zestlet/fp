# Zestlet FP

A modern TypeScript functional programming utility library built with AI assistance, focusing on precise type inference and currying support.

> This is currently in testing and subject to change, please proceed with caution.

## AI-Assisted Development Approach

This library is built using an AI-assisted development method:

- Core functions and type definitions generated with AI assistance
- Manual review and optimization of critical components
- Comprehensive test suite to ensure code quality
- Type system designed by AI and validated by humans

## Features

- **Development Stage**: Current version is being continuously improved, API may change
- **Type Safety**: Complete TypeScript support with precise type inference
- **Pure Functions**: Immutable operations with no side effects
- **Curried Design**: All functions support currying for partial application
- **Point-Free Friendly**: Optimized for functional composition patterns
- **Modern TypeScript**: Leverages latest TS features including const generics
- **Lightweight**: Focused API with no external dependencies

## Installation

```bash
npm install @zestlet/fp
# or
yarn add @zestlet/fp
# or
pnpm add @zestlet/fp
```

## Usage Example

```typescript
import { filter, map, path, flow, pluck, prop, sortBy } from '@zestlet/fp';

const getNamesByCompose = map(prop('name'));
// const getNamesByCompose: <T, K2 extends keyof T & "name">(array: ArrayContainer<T>) => T[K2][]

const getNames = pluck('name');
// const getNames: <T2 extends Record<PropertyKey, unknown>>(array: readonly T2[]) => T2["name"][]

const example = [
  { name: 'Alice', age: 18 },
  { name: 'Bob', age: 20 },
] as const;

const names = getNames(example);
// const names: ("Alice" | "Bob")[]

const namesByCompose = getNamesByCompose(example);
// const namesByCompose: ("Alice" | "Bob")[]

// Getting all valid order customer names, sorted by name
const getSortedCustomerNames = flow(
  filter(path(['status', 'isValid'])),
  map(path(['customer', 'name'])),
  sortBy((a: string) => a.toLowerCase())
);

const orders = [
  { id: 1, customer: { name: 'Dave', id: 101 }, status: { isValid: true } },
  { id: 2, customer: { name: 'Alice', id: 102 }, status: { isValid: true } },
  { id: 3, customer: { name: 'Bob', id: 103 }, status: { isValid: false } },
] as const;

const customerNames = getSortedCustomerNames(orders);
// const customerNames: string[]

console.log(customerNames); // [ "Alice", "Dave" ]
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
