#!/usr/bin/env python
#
# https://claude.site/artifacts/5b227790-1f9c-40e7-ae7f-f6f1878929d2
#
# Example output:
# INFO:__main__:Processing batch 1 of 4
# INFO:__main__:Making request 0 to first endpoint
# INFO:__main__:Making request 1 to first endpoint
# INFO:__main__:Making request 2 to first endpoint
# INFO:__main__:Making request 3 to first endpoint
# INFO:__main__:Making request 4 to first endpoint
# INFO:__main__:Forwarding data from request 4 to second endpoint
# INFO:__main__:Forwarding data from request 2 to second endpoint
# INFO:__main__:Forwarding data from request 0 to second endpoint
# INFO:__main__:Forwarding data from request 1 to second endpoint
# INFO:__main__:Forwarding data from request 3 to second endpoint
# INFO:__main__:Processing batch 2 of 4
# INFO:__main__:Making request 5 to first endpoint
# INFO:__main__:Making request 6 to first endpoint
# INFO:__main__:Making request 7 to first endpoint
# ...
#

import aiohttp
import asyncio
from typing import List
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
FIRST_ENDPOINT = "https://httpbin.org/delay/1"
SECOND_ENDPOINT = "https://httpbin.org/delay/1"
TOTAL_CALLS = 20
CONCURRENT_LIMIT = 5  # Limit concurrent connections

async def fetch_and_forward(session: aiohttp.ClientSession, request_id: int) -> dict:
    """
    Fetch data from first endpoint and forward it to second endpoint.
    Returns both responses for logging purposes.
    """
    try:
        # First API call
        logger.info(f"Making request {request_id} to first endpoint")
        async with session.get(FIRST_ENDPOINT) as response:
            response.raise_for_status()
            first_response = await response.json()

        # Second API call with data from first call
        logger.info(f"Forwarding data from request {request_id} to second endpoint")
        async with session.post(SECOND_ENDPOINT, json=first_response) as response:
            response.raise_for_status()
            second_response = await response.json()

        return {
            "request_id": request_id,
            "first_response": first_response,
            "second_response": second_response
        }
    except Exception as e:
        logger.error(f"Error in request {request_id}: {e}")
        raise

async def process_batch(session: aiohttp.ClientSession, batch: List[int]) -> List[dict]:
    """Process a batch of request pairs."""
    tasks = [fetch_and_forward(session, request_id) for request_id in batch]
    return await asyncio.gather(*tasks, return_exceptions=True)

async def main():
    # Configure timeout and retry strategy
    timeout = aiohttp.ClientTimeout(total=60)  # Increased timeout for sequential calls

    async with aiohttp.ClientSession(timeout=timeout) as session:
        # Split requests into batches to limit concurrent connections
        all_batches = [list(range(i, min(i + CONCURRENT_LIMIT, TOTAL_CALLS)))
                      for i in range(0, TOTAL_CALLS, CONCURRENT_LIMIT)]

        all_results = []
        for batch_num, batch in enumerate(all_batches):
            logger.info(f"Processing batch {batch_num + 1} of {len(all_batches)}")
            batch_results = await process_batch(session, batch)

            # Filter out exceptions and add successful results
            valid_results = [r for r in batch_results if not isinstance(r, Exception)]
            all_results.extend(valid_results)

        # Log summary
        successful_calls = len(all_results)
        logger.info(f"Completed {successful_calls} out of {TOTAL_CALLS} request pairs successfully")

        # Log any failed requests
        failed_calls = TOTAL_CALLS - successful_calls
        if failed_calls > 0:
            logger.warning(f"Failed to complete {failed_calls} request pairs")

if __name__ == "__main__":
    asyncio.run(main())
