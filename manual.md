# nanosha256 - Technical Manual

> Generated on: 2026-03-31

---

<!-- Start of index.md -->

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


---

<!-- Start of api.md -->

# API Reference

The **nanosha256** library provides two distinct APIs: a high-level **Streaming API** (using a context struct) and a low-level **State-based API** (primitives).

---

## 1. Streaming API (Recommended)

This API manages a message of arbitrary length by buffering blocks.

### `SHA256_Init(SHA256_CTX *ctx)`
Initializes the context for hashing.
-   **Returns**: `0` on success, `-1` if `ctx` is `NULL`.

### `SHA256_Update(SHA256_CTX *ctx, const void *data, size_t len)`
Processes a chunk of data. Can be called multiple times.
-   **Returns**: `0` on success, `-1` if pointer is `NULL`, `-2` on integer overflow of total length.

### `SHA256_Final(uint8_t hash[32], SHA256_CTX *ctx)`
Finalizes the hash calculation, produces the 32-byte digest, and **securely wipes** the context.
-   **Returns**: `0` on success, `-1` if pointer is `NULL`.

---

## 2. Low-Level Primitives

These functions operate directly on states and 64-byte blocks.

### `sha256_init(uint32_t state[8])`
Sets the 8 initial 32-bit words to the FIPS 180-4 constants.

### `sha256_transform(uint32_t state[8], const uint8_t data[64])`
Performs the 64 compression rounds on a single 512-bit block.
-   **Note**: This function is the performance bottleneck and is heavily optimized with fully unrolled loops.

### `sha256_final(uint32_t state[8], uint8_t hash[32], uint64_t total_bits)`
Converts the final internal 32-bit state words into a Big-Endian byte array.
-   **Note**: Does not perform padding; it only exports the current state.


---

<!-- Start of security.md -->

# Security and Memory Safety

**nanosha256** is designed to avoid common pitfalls in systems programming while maintaining cryptographic speed.

## 1. NULL Pointer Protection
All public API functions test for `NULL` before dereferencing any parameters (`ctx`, `data`, or `hash`). This prevents crashes in the event of logical errors in the caller.

## 2. Integer Overflow Guard
`SHA256_Update` implements an overflow check for the total message length (`ctx->total_len`). If adding a chunk's length to the existing count exceeds 64 bits, the function returns `-2` to prevent wrapping and incorrect hashing.

## 3. Strict Buffer Boundary Tracking
The `ctx->buffer` (64 bytes) is used for residual data between large block transformations. Each `memcpy` is calculated against the remaining space (`64 - left`) to ensure no out-of-bounds writes occur.

## 4. Secure Cleanup
After the 32-byte digest is generated in `SHA256_Final`, the context struct — including the internal state and the residue buffer — is zeroed using `memset(ctx, 0, sizeof(SHA256_CTX))` to prevent sensitive hash fragments from leaking into memory.

## 5. Alignment-Safe Byte Loading
The library avoids direct pointer casting to `uint32_t*`, which can cause alignment or bus errors on certain architectures. All transfers use `memcpy` for portable, safe byte-to-word conversions.


---

