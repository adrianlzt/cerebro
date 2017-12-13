#!/bin/bash
echo "$@" >> /tmp/debug_params
cat - | tee -a /tmp/debug_input | /usr/bin/programa_original $@ | tee -a /tmp/debug_output
