import { Dispatch, SetStateAction, useState } from "react";
import { calculateCIDR } from "@/utils/utils";
import { Button } from "./Button";
import { motion } from "motion/react";

export function CIDRCalculator() {
  const [cidrResults, setCidrResults] = useState<CIDRCalcResults>({
    cidrRange: null,
    netmask: null,
    wildcardBits: null,
    usableStart: null,
    usableEnd: null,
    firstIPDecimal: null,
    lastIPDecimal: null,
    usableStartDecimal: null,
    usableEndDecimal: null,
    totalHosts: null,
    network: null,
    broadcast: null,
  });

  const [cidrAddress, setCidrAddress] = useState("");
  return (
    <motion.div
      layout
      className="bg-white rounded-lg m-6 sm:py-16 sm:px-10 sm:w-1/2"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">
              IPv4 CIDR Range Calculator
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              CIDR stands for Classless Inter-Domain Routing. It is a method of
              IP addressing that replaces the older class-based system (A, B,
              C). CIDR allows a single IP address to represent many addresses
              using a network prefix, written after a slash. For example,
              192.168.1.0/24. CIDR reduces routing table size and provides more
              IP addresses for organizations.
            </p>
          </div>
        </div>
      </div>
      <CIDRForm
        cidrAddress={cidrAddress}
        setCidrAddress={setCidrAddress}
        setCidrResults={setCidrResults}
      />
      <CIDRDisplayPanel results={cidrResults} />
    </motion.div>
  );
}

export function CIDRForm({
  cidrAddress,
  setCidrAddress,
  setCidrResults,
}: Readonly<{
  cidrAddress: string;
  setCidrAddress: Dispatch<SetStateAction<string>>;
  setCidrResults: Dispatch<SetStateAction<CIDRCalcResults>>;
}>) {
  const setResults = () => {
    try {
      setCidrResults(calculateCIDR(cidrAddress));
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setResults();
    }
  };
  return (
    <div className="flex flex-col sm:flex-row mt-4 sm:mt-10 px-4 sm:px-6 lg:px-8 gap-4">
      <input
        type="text"
        placeholder="Enter CIDR Address"
        onKeyDown={handleKeyDown}
        value={cidrAddress}
        onChange={(e) => setCidrAddress(e.target.value)}
        className="border rounded px-4 py-2 w-80"
      />
      <div>
        <Button onClick={setResults}>Calculate</Button>
      </div>
    </div>
  );
}

export default function CIDRDisplayPanel({
  results,
}: Readonly<{ results: CIDRCalcResults }>) {
  const keyNames = {
    cidrRange: "CIDR Range",
    netmask: "Netmask",
    wildcardBits: "Wildcard Bits",
    network: "Network Address",
    usableStart: "First Usable IP",
    usableEnd: "Last Usable IP",
    broadcast: "Broadcast Address",
    firstIPDecimal: "Network Decimal",
    usableStartDecimal: "First IP Decimal",
    usableEndDecimal: "Last IP Decimal",
    lastIPDecimal: "Broadcast Decimal",
    totalHosts: "Total Usable Hosts",
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-4 sm:mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Result Type
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Result Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {results.cidrRange === null ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"
                    >
                      Enter a CIDR address above to calculate
                    </td>
                  </tr>
                ) : (
                  Object.entries(results).map(([key, value]) => {
                    return (
                      <tr key={key}>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                          {keyNames[key as keyof typeof keyNames]}:
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                          {key === "totalHosts" && typeof value === "number"
                            ? new Intl.NumberFormat("en-US", {
                                notation: "standard",
                              }).format(value)
                            : String(value)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
