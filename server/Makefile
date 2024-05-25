.PHONY: all
all: build HATCH=false run

# Default value for HATCH variable
HATCH ?= false

# Build Docker image based on the HATCH value
.PHONY: build
build:
ifeq ($(HATCH),true)
	docker build -f Dockerfile.hatch -t app .
else
	docker build -f Dockerfile -t app .
endif

# Additional targets for clean or run can be defined here

	
.PHONY: run
run:
	docker run app
