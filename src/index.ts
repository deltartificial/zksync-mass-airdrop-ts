import addresses from "./addresses.json";

async function checkEachEligibility() {
  for (const addr of addresses) {
    await checkEligibility(addr);
  }
}

async function checkEligibility(accountAddress: string) {
  const response = await fetch(
    `https://api.zknation.io/eligibility?id=${accountAddress}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        Origin: "https://claim.zknation.io",
        Referer: "https://claim.zknation.io/",
        "Sec-Ch-Ua":
          '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        "Sec-Ch-Ua-Mobile": "?1",
        "Sec-Ch-Ua-Platform": '"Android"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
        "X-Api-Key": "46001d8f026d4a5bb85b33530120cd38",
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Failed to send eligibility check for account:",
      accountAddress,
      response.status,
      response.statusText
    );
    return;
  }

  const data = await response.json();
  const allocations = data.allocations;
  if (allocations.length === 0) {
    console.log(
      response.status,
      `Account Address: ${accountAddress}`,
      "No allocations"
    );
    return;
  }
  console.log(
    response.status,
    `Account Address: ${accountAddress}`,
    "Allocations:" + allocations + "$ZK"
  );
}

checkEachEligibility();
