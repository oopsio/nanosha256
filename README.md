# nanosha256 - v1.0.0

A minimal, high-performance, security-hardened single-header C library for SHA-256.

[![Changelog](https://img.shields.io/badge/changelog-v1.0.0-blue.svg)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![C/C++ CI](https://github.com/oopsio/nanosha256/actions/workflows/c-cpp.yml/badge.svg)](https://github.com/oopsio/nanosha256/actions/workflows/c-cpp.yml)
[![Build and Deploy Docs](https://github.com/oopsio/nanosha256/actions/workflows/docs.yml/badge.svg)](https://github.com/oopsio/nanosha256/actions/workflows/docs.yml)
[![Dependabot](https://img.shields.io/badge/dependabot-enabled-green.svg)](https://github.com/oopsio/nanosha256/security/dependabot)

## Features
- **Pure C**: Requires only `stdint.h` and `string.h`.
- **Zero Allocation**: No `malloc` is used.
- **Performance**: Fully unrolled compression rounds and inlined macros.
- **Endianness Optimized**: Fast byte-swapping for little-endian architectures.

## Usage
Simply include `nanosha256.h` in your project.

```c
#include "nanosha256.h"

// Streaming API
SHA256_CTX ctx;
uint8_t hash[32];
SHA256_Init(&ctx);
SHA256_Update(&ctx, "abc", 3);
SHA256_Final(hash, &ctx);

// State-based primitive API (requested)
uint32_t state[8];
sha256_init(state);
sha256_transform(state, some_64_byte_block);
sha256_final(state, hash, total_bits);
```

## Testing
To run the included tests:
```bash
make test
```

## License
MIT License (2026-present oopsio)
