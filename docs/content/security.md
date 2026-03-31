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
