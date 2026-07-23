#!/usr/bin/env bash
set -e

python -m pip install --upgrade pip
python -m pip install --prefer-binary -r requirements.txt
python -m pip install --no-deps app-store-scraper==0.3.5
