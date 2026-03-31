CC = gcc
CFLAGS = -O3 -Wall -Wextra -std=c99
EXE = test_sha256.exe
SRC = test.c

all: $(EXE)

$(EXE): $(SRC) sha256.h
	$(CC) $(CFLAGS) -o $(EXE) $(SRC)

test: $(EXE)
	./$(EXE)

clean:
	rm -f $(EXE)

.PHONY: all test clean
