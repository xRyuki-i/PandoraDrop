#!/bin/bash

export PGPASSWORD='Reenukoju7$'

echo "Configuring database"

mysql -u root -p < ./bin/sql/account.sql
mysql -u root -p < ./bin/sql/costumer.sql
mysql -u root -p < ./bin/sql/restaurant.sql
mysql -u root -p < ./bin/sql/food.sql

echo "fyp database modified"