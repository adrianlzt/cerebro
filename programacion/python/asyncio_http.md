http://aiohttp.readthedocs.io/en/stable/
https://docs.aiohttp.org/en/stable/client_quickstart.html#make-a-request

pip install aiohttp aiodns cchardet

import asyncio
import aiohttp

async def main():
    async with aiohttp.ClientSession() as session:
        url = f'https://httpbin.org/get'
        async with session.get(url) as resp:
            r = await resp.json()
            print(r)

asyncio.run(main())



# Timeout
timeout = aiohttp.ClientTimeout(total=60)
async with aiohttp.ClientSession(timeout=timeout) as session:


async def check_internet_availability() -> bool:
    """
    Comprueba si hay conexión a internet.
    """
    try:
        async with aiohttp.ClientSession() as session:
            url = 'http://XXconnectivitycheck.gstatic.com/generate_204'
            async with session.get(url, timeout=2) as resp:
               print("internet available ", resp.status)
               return True
    except asyncio.TimeoutError:
        print(f"TIMEOUT")
        return False

