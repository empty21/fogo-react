#!/bin/bash
docker login
docker pull empty21/fogo-react
docker-compose up -d