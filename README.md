# Zestlet FP

A modern TypeScript functional programming utility library built with AI assistance, focusing on precise type inference and currying support.

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
import { filter, map, path, pipe, pluck, prop, sortBy } from '@zestlet/fp';

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
const getSortedCustomerNames = pipe(
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

## Core Design Principles

### Advanced Type Inference

Unlike other functional libraries, fp-ts-utils implements a sophisticated type inheritance system that enables precise type inference in point-free compositions:

```typescript
// The library maintains type information throughout the entire chain
const getNames = pipe(
  filter((user: User) => user.active),
  map(user => user.name),
  map(name => name.toUpperCase())
);

// TypeScript correctly infers: (users: User[]) => string[]
```

### Curried Functions with Type Overloads

All multi-parameter functions support fully type-safe currying:

```typescript
// All these calling styles have correct type inference
const result1 = map(x => x * 2, [1, 2, 3]);
const result2 = map(x => x * 2)([1, 2, 3]);
const mapDouble = map(x => x * 2);
const result3 = mapDouble([1, 2, 3]);
```

### Data-Last Parameter Order

Functions follow the data-last convention, making them ideal for composition:

```typescript
// Data parameter comes last, facilitating composition
const processNumbers = pipe(
  filter(x => x > 0),
  map(x => x * 2),
  reduce((acc, x) => acc + x, 0)
);

// Apply the composed function to data
processNumbers([-1, 2, 3, 4]); // 18
```

## Comparison with Other Libraries

| Feature                   | fp-ts-utils           | lodash/fp      | ramda              |
| ------------------------- | --------------------- | -------------- | ------------------ |
| Currying                  | ✅ Automatic          | ✅ Automatic   | ✅ Automatic       |
| TypeScript                | ✅ Advanced inference | ⚠️ Basic types | ⚠️ Community types |
| Point-free type inference | ✅ Precise inference  | ⚠️ Limited     | ⚠️ Limited         |

## Type System Features

The type system leverages advanced TypeScript features:

- Continuous generic type inheritance (`T2 extends T`)
- Strategic const modifier placement for literal type preservation
- Optimized generic parameter declarations for maximum inference
- Complete support for data-last style delayed type inference

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
