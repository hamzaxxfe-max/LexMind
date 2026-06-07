$env:PYTHONPATH = Split-Path -Parent $MyInvocation.MyCommand.Path
& ".\lexmind-venv\Scripts\python" -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8081
