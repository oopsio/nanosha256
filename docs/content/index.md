# nanosha256 Documentation Overview

Welcome to the **nanosha256** documentation. This library is a high-performance, memory-safe, single-header C implementation of the SHA-256 cryptographic hash algorithm.

## Key Features

- **Portability**: Pure C99, requires only `<stdint.h>` and `<string.h>`.
- **Zero Allocation**: No use of `malloc()` or `free()`. All memory is stack-allocated or user-provided.
- **Speed**: Fully unrolled 64-round compression loop and inlined macros.
- **Safety**:
    - **Pointer protection**: All API functions check for NULL before use.
    - **Overflow guards**: Track and prevent integer overflow of total length.
    - **Secure memory**: Automatic zeroing of internal states after finalization.
- **Endianness Optimized**: Fast intrinsic-based byte swapping for little-endian targets (x86, ARM).

## Quick Start

Include the header in your project:

```c
#include "nanosha256.h"
```
