CC = gcc
CFLAGS = -O3 -Wall -Wextra -std=c99
EXE = test_sha256
SRC = ./tests/test.c
EXE_CLI = test_cli_runner
SRC_CLI = ./tests/cli.c

all: $(EXE)

$(EXE): $(SRC) nanosha256.h
	$(CC) $(CFLAGS) -o $(EXE) $(SRC)

test: $(EXE)
	./$(EXE)

test-bun: $(SRC_CLI) nanosha256.h
	$(CC) $(CFLAGS) -o $(EXE_CLI) $(SRC_CLI)
	bun tests/verify.js
	rm -f $(EXE_CLI) $(EXE_CLI).exe

docs:
	bun docs/build.js

clean:
	rm -f $(EXE) $(EXE).exe $(EXE_CLI) $(EXE_CLI).exe docs/dist/*

.PHONY: all test test-bun clean docs
