# syntax=docker/dockerfile:1

## Build
FROM golang:1.20-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /server ./main.go

FROM golang:1.20-alpine AS builder

# Move to working directory (/build).
WORKDIR /build

# Copy and download dependency using go mod.
COPY go.mod go.sum ./
RUN go mod download

# Copy the code into the container.
COPY . .

# Set necessary environment variables needed for our image and build the API server.
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
RUN go build -ldflags="-s -w" -o apiserver .

FROM golang:1.20-alpine

EXPOSE 8080

# Build arguments
ARG blob_service_url
ARG blob_acc_key
ARG mssql_conn
ARG cors
ARG resend_key
ARG verification_key
ARG google_token

# Set environment variables
ENV blob_service_url ${blob_service_url}
ENV blob_acc_key ${blob_acc_key}
ENV mssql_conn ${mssql_conn}
ENV cors ${cors}
ENV resend_key ${resend_key}
ENV verification_key ${verification_key}
ENV google_token ${google_token}

COPY --from=builder ["/build/apiserver", "/"]

ENTRYPOINT ["/apiserver"]
