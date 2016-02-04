#!/bin/bash
cat - | tee /tmp/debug_input | /usr/bin/programa_original $@ | tee /tmp/debug_output
