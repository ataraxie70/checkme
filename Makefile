.DEFAULT_GOAL := help
SHELL := /bin/sh

NPM ?= npm
NODE ?= node
COMPOSE ?= docker compose

.PHONY: help install setup check test architecture runtime typecheck lint build clean api worker up down ps logs db-up db-down db-logs

help:
	@printf '%s\n' \
		'CheckMe! developer commands:' \
		'  make setup       Install dependencies and prepare local environment' \
		'  make install     Install exactly from package-lock.json' \
		'  make check       Run architecture, runtime, typecheck, tests and build' \
		'  make architecture Run architecture enforcement' \
		'  make runtime     Run runtime foundation tests' \
		'  make lint        Run lint / architecture checks' \
		'  make typecheck   Run TypeScript type checks' \
		'  make test        Run test suite' \
		'  make build       Build/check project' \
		'  make api         Start API locally' \
		'  make worker      Start worker locally' \
		'  make up          Start local infrastructure' \
		'  make down        Stop local infrastructure' \
		'  make ps          Show infrastructure status' \
		'  make logs        Follow infrastructure logs' \
		'  make db-up      Start PostgreSQL only' \
		'  make db-down    Stop PostgreSQL only' \
		'  make db-logs    Follow PostgreSQL logs' \
		'  make clean       Remove generated local artifacts'

install:
	$(NPM) ci

setup: install
	@test -f .env || cp .env.example .env
	@printf '%s\n' 'Local environment ready.'

architecture:
	$(NPM) run architecture:test

runtime:
	$(NPM) run runtime:test

lint:
	$(NPM) run lint

typecheck:
	$(NPM) run typecheck

test:
	$(NPM) test

build:
	$(NPM) run build

check: architecture runtime lint typecheck test build

api:
	$(NPM) run dev:api

worker:
	$(NPM) run dev:worker

up:
	$(COMPOSE) -f infra/compose/docker-compose.yml up -d

down:
	$(COMPOSE) -f infra/compose/docker-compose.yml down

ps:
	$(COMPOSE) -f infra/compose/docker-compose.yml ps

logs:
	$(COMPOSE) -f infra/compose/docker-compose.yml logs -f

db-up:
	$(COMPOSE) -f infra/compose/docker-compose.yml up -d postgres

db-down:
	$(COMPOSE) -f infra/compose/docker-compose.yml stop postgres

db-logs:
	$(COMPOSE) -f infra/compose/docker-compose.yml logs -f postgres

clean:
	rm -rf dist coverage .next
