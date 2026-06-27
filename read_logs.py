import sys

with open('project_logs.txt', 'r', encoding='utf-16le') as f:
    lines = f.readlines()
    with open('project_logs_utf8.txt', 'w', encoding='utf-8') as out:
        out.write("".join(lines[-100:]))
