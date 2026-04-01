#include <stdio.h>
#include <string.h>
#include "../nanosha256.h"

int main(int argc, char *argv[]) {
    if (argc < 2) {
        return 1;
    }

    const char *input = argv[1];
    size_t len = strlen(input);
    uint8_t hash[32];
    SHA256_CTX ctx;

    SHA256_Init(&ctx);
    SHA256_Update(&ctx, input, len);
    SHA256_Final(hash, &ctx);

    for (int i = 0; i < 32; i++) {
        printf("%02x", hash[i]);
    }
    printf("\n");

    return 0;
}
