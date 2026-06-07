import subprocess, sys, re

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8081

result = subprocess.run(
    ["netstat", "-ano"], capture_output=True, text=True, shell=True
)
for line in result.stdout.splitlines():
    if rf":{port}" in line and "LISTENING" in line:
        parts = line.strip().split()
        pid = parts[-1]
        subprocess.run(["taskkill", "/F", "/PID", pid], capture_output=True)
        print(f"Killed process {pid} on port {port}")
