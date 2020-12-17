#!/bin/sh -e
set -o allexport; . ./secure_var; set +o allexport
sed -i -e "s/{{DR_REDIS_PASSWORD}}/${r_pass}/g" "${1}"
sed -i -e "s/{{DR_RABBIT_MQ_PASSWORD}}/${rab_pass}/g" "${1}"
sed -i -e "s/{{DR_RABBIT_MQ_USER}}/${rab_user}/g" "${1}"
sed -i -e "s/{{DR_MYSQL_USER}}/${sql_user}/g" "${1}"
sed -i -e "s/{{DR_MYSQL_PASSWORD}}/${sql_pass}/g" "${1}"