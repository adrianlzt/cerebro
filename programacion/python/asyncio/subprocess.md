https://docs.python.org/3/library/asyncio-subprocess.html

async def run(cmd):
    proc = await asyncio.create_subprocess_shell(
        cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE)

    stdout, stderr = await proc.communicate()



async def exec_cmd(cmd: list, timeout: int = 10):
    """
    Ejecuta un comando con timeout.
    Devuelve el stdout+stderr y el exit code.
    """
    try:
        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT) # Mezclar stdout y stderr

        stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=timeout)
        return stdout.decode('utf-8'), proc.returncode
    except asyncio.exceptions.TimeoutError:
        proc.kill()
        return '', -1

