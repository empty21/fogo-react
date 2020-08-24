#!/bin/bash
docker login
docker build -t empty21/fogo-react .
docker push empty21/fogo-react