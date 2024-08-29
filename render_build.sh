#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install

pipenv run upgrade

flask seed-departments

flask seed-localities

flask seed-species-and-breeds

flask seed-users

flask hash-passwords

flask seed-mascotas
