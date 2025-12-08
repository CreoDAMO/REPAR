.PHONY: all build clean test

BUILD_DIR := build
CMD_DIR := cmd/autonomous-agent
BINARY := autonomous-agent

all: build

build:
	@echo "Building Aequitas Autonomous AI Agent..."
	@mkdir -p $(BUILD_DIR)
	@go build -o $(BUILD_DIR)/$(BINARY) ./$(CMD_DIR)
	@echo "✅ Build complete: $(BUILD_DIR)/$(BINARY)"

clean:
	@rm -rf $(BUILD_DIR)
	@echo "Cleaned build directory"

test:
	@go test -v ./...

run: build
	@./$(BUILD_DIR)/$(BINARY)
