#!/bin/bash

source .env
cd app/ && python -m updater.update_firebase
