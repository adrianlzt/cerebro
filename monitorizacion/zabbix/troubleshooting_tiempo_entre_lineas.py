#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

"""
Nos permite obtener las líneas entre las que hay un tiempo superior a un valor dado.
"""

import datetime
import sys

def parse_line(line):
    line = line.strip()
    parts = line.split(' ', 1)
    timestamp_parts = parts[0].split(':')
    pid = int(timestamp_parts[0].strip())
    date = datetime.datetime.strptime(timestamp_parts[1], '%Y%m%d')
    time = datetime.datetime.strptime(timestamp_parts[2], '%H%M%S.%f')
    text = parts[1].rstrip()

    return pid, date + (time - datetime.datetime(1900, 1, 1)), text


def process_file(file_name, max_time):
    prev_line_info = None

    with open(file_name, 'r') as file:
        for line in file:
            if not line.strip():
                continue

            try:
                        curr_line_info = parse_line(line)
            except Exception as ex:
                        print(f"problema parseo linea {ex}: {line}")
                        sys.exit(1)

            if prev_line_info is not None:
                time_diff = curr_line_info[1] - prev_line_info[1]
                if time_diff.total_seconds() > max_time:
                    print('-' * 40)
                    print(prev_line_info[1], prev_line_info[2])
                    print(curr_line_info[1], curr_line_info[2])
                    print(f'Time spent: {time_diff}')

            prev_line_info = curr_line_info


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python script_name.py filename max_time")
        exit()

    file_name = sys.argv[1]
    max_time = float(sys.argv[2])
    process_file(file_name, max_time)
