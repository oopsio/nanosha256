#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include "../nanosha256.h"

void print_hash(const char *label, uint8_t hash[32]) {
    printf("%-15s: ", label);
    for (int i = 0; i < 32; i++) {
        printf("%02x", hash[i]);
    }
    printf("\n");
}

bool verify(const char *label, uint8_t hash[32], const char *expected) {
    char hex[65];
    for (int i = 0; i < 32; i++) {
        sprintf(hex + (i * 2), "%02x", hash[i]);
    }
    hex[64] = '\0';
    if (strcmp(hex, expected) == 0) {
        printf("[PASS] %s\n", label);
        return true;
    } else {
        printf("[FAIL] %s\n", label);
        printf("  Got:      %s\n", hex);
        printf("  Expected: %s\n", expected);
        return false;
    }
}

int main() {
    uint8_t hash[32];
    SHA256_CTX ctx;
    bool all_passed = true;

    // Test 1: Empty string
    printf("Running Test 1 (Empty String):\n");
    if (SHA256_Init(&ctx) != 0) return 1;
    if (SHA256_Final(hash, &ctx) != 0) return 1;
    all_passed &= verify("Empty string", hash, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");

    // Test 2: "abc"
    printf("\nRunning Test 2 (\"abc\"):\n");
    if (SHA256_Init(&ctx) != 0) return 1;
    if (SHA256_Update(&ctx, "abc", 3) != 0) return 1;
    if (SHA256_Final(hash, &ctx) != 0) return 1;
    all_passed &= verify("\"abc\"", hash, "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");

    const char *long_str = "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmonlopnopq";

    printf("\nRunning Test 3 (56-byte string):\n");
    if (SHA256_Init(&ctx) != 0) return 1;
    if (SHA256_Update(&ctx, long_str, strlen(long_str)) != 0) return 1;
    if (SHA256_Final(hash, &ctx) != 0) return 1;
    all_passed &= verify("Long string", hash, "ab967423f5ddddb43646665caadececae5a1fadac2d4a831b1ebc4f5f90e5e46");

    if (all_passed) {
        printf("\nALL TESTS PASSED SUCCESSFULLY!\n");
    } else {
        printf("\nSOME TESTS FAILED.\n");
    }

    return all_passed ? 0 : 1;
}
