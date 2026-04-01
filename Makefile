CC = gcc
CFLAGS = -O3 -Wall -Wextra -std=c99
EXE = test_sha256
SRC = test.c

all: $(EXE)

$(EXE): $(SRC) nanosha256.h
	$(CC) $(CFLAGS) -o $(EXE) $(SRC)

test: $(EXE)
	./$(EXE)

docs:
	bun docs/build.js

clean:
	rm -f $(EXE) docs/dist/*

.PHONY: all test clean docs
