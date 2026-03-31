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
