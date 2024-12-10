function validateCIDR(cidr: string): [string, number] {
  const [ip, mask] = cidr.split("/");
  const subnetMask = parseInt(mask, 10);

  if (!ip || isNaN(subnetMask) || subnetMask < 0 || subnetMask > 32) {
    throw new Error("Invalid CIDR notation");
  }

  const ipParts = ip.split(".").map(Number);
  if (ipParts.length !== 4 || ipParts.some((part) => part < 0 || part > 255)) {
    throw new Error("Invalid IP address");
  }

  return [ip, subnetMask];
}

function ipToBinary(ip: string): string {
  return ip
    .split(".")
    .map((part) => parseInt(part).toString(2).padStart(8, "0"))
    .join("");
}

function binaryToDecimal(binary: string): string {
  return binary
    .match(/.{8}/g)!
    .map((octet) => parseInt(octet, 2))
    .join(".");
}

function ipToDecimal(ip: string): number {
  const octets = ip.split(".").map(Number);
  return (
    ((octets[0] << 24) >>> 0) +
    ((octets[1] << 16) >>> 0) +
    ((octets[2] << 8) >>> 0) +
    (octets[3] >>> 0)
  );
}

function calculateRange(
  networkBinary: string,
  broadcastBinary: string,
  subnetMask: number
) {
  const firstIP = binaryToDecimal(networkBinary);
  const lastIP = binaryToDecimal(broadcastBinary);

  const usableStart =
    subnetMask < 31
      ? binaryToDecimal(
          (parseInt(networkBinary, 2) + 1).toString(2).padStart(32, "0")
        )
      : null;

  const usableEnd =
    subnetMask < 31
      ? binaryToDecimal(
          (parseInt(broadcastBinary, 2) - 1).toString(2).padStart(32, "0")
        )
      : null;

  return { firstIP, lastIP, usableStart, usableEnd };
}

function calculateNetmask(subnetMask: number): string {
  return binaryToDecimal("1".repeat(subnetMask).padEnd(32, "0"));
}

function calculateWildcard(subnetMask: number): string {
  return binaryToDecimal("0".repeat(subnetMask).padEnd(32, "1"));
}

function calculateHosts(subnetMask: number): number {
  return subnetMask < 31 ? 2 ** (32 - subnetMask) - 2 : 0;
}

export function calculateCIDR(cidr: string): CIDRCalcResults {
  const [ip, subnetMask] = validateCIDR(cidr);
  const ipBinary = ipToBinary(ip);

  // Calculate Network and Broadcast Addresses
  const networkBinary = ipBinary.substring(0, subnetMask).padEnd(32, "0");
  const broadcastBinary = ipBinary.substring(0, subnetMask).padEnd(32, "1");

  const networkAddress = binaryToDecimal(networkBinary);
  const broadcastAddress = binaryToDecimal(broadcastBinary);

  // Calculate Range (First, Last, Usable)
  const { firstIP, lastIP, usableStart, usableEnd } = calculateRange(
    networkBinary,
    broadcastBinary,
    subnetMask
  );

  // Calculate Netmask, Wildcard Bits, and Total Hosts
  const netmask = calculateNetmask(subnetMask);
  const wildcardBits = calculateWildcard(subnetMask);
  const totalHosts = calculateHosts(subnetMask);

  // Build Result Object
  const CIDRResults: CIDRCalcResults = {
    cidrRange: cidr,
    netmask,
    wildcardBits,
    network: networkAddress,
    usableStart,
    usableEnd,
    broadcast: broadcastAddress,
    firstIPDecimal: ipToDecimal(firstIP),
    usableStartDecimal: usableStart ? ipToDecimal(usableStart) : null,
    usableEndDecimal: usableEnd ? ipToDecimal(usableEnd) : null,
    lastIPDecimal: ipToDecimal(lastIP),
    totalHosts,
  };

  return CIDRResults;
}
