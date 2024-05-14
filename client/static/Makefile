.PHONY: all
all: build run

# Default value for HATCH variable
HATCH ?= true

# Build Docker image based on the HATCH value
.PHONY: build
build:
	docker build -t app .


# Additional targets for clean or run can be defined here

	
.PHONY: run
run:
	docker run -p 9000:9000 app
