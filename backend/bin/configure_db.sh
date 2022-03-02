#!/bin/bash

export PGPASSWORD='Reenukoju7$'

echo "Configuring database"

mysql -u root -p < ./bin/sql/account.sql
mysql -u root -p < ./bin/sql/costumer.sql

echo "fyp database modified"