# Linux Performance Tips

I think most of these will work in most distros, but I've only tried on Ubuntu, ymmv.

https://www.zabbix.com/ - big monitoring app

https://nicolargo.github.io/glances/ - looks like htop with more features

# Linux Commands to Optimize Application Performance

## Process Priority

- `nice`: Set the priority of a new process
- `renice`: Alter the priority of an existing process

## CPU Core Usage

- `taskset`: Set or retrieve a process's CPU affinity
- `cgroups`: Control groups for resource allocation

## I/O Throughput

- `ionice`: Set or change the I/O scheduling class and priority
- `iotop`: Monitor I/O usage by processes

## Memory Management

- `ulimit`: Set or get user limits for system resources
- `vmstat`: Report virtual memory statistics
- `free`: Display amount of free and used memory in the system

## Additional Tools

- `top` / `htop`: Monitor system processes and resource usage
- `perf`: Linux profiling tool for performance analysis

---

# Detailed Linux Commands for Performance Optimization

## Process Priority

### nice

Description: Starts a process with a modified scheduling priority.
Example:
`nice -n 10 ./my_script.sh`
This runs `my_script.sh` with a lower priority (nice value of 10).

### renice

Description: Alters the scheduling priority of a running process.
Example:
`renice -n -5 -p 1234`
This increases the priority of process with PID 1234 (nice value of -5).

## CPU Core Usage

### taskset

Description: Sets or retrieves a process's CPU affinity.
Example:
`taskset -c 0,1 ./my_app`
This runs `my_app` on CPU cores 0 and 1 only.

### cgroups

Description: Control groups for resource allocation (more complex, typically configured via system files).
Example:
`echo 950000 > /sys/fs/cgroup/cpu/my_group/cpu.cfs_quota_us`
This limits processes in `my_group` to 95% of one CPU core.

## I/O Throughput

### ionice

Description: Sets or changes the I/O scheduling class and priority of a process.
Example:
`ionice -c 2 -n 0 -p 1234`
This sets process 1234 to use the best-effort I/O scheduling class with highest priority.

### iotop

Description: Monitors I/O usage by processes.
Example:
`iotop -o`
This shows only processes or threads actually doing I/O.

## Memory Management

### ulimit

Description: Sets or gets user limits for system resources.
Example:
`ulimit -v 1000000`
This limits the virtual memory available to the shell and its child processes to 1GB.

### vmstat

Description: Reports virtual memory statistics.
Example:
`vmstat 5 3`
This displays memory statistics every 5 seconds, 3 times.

### free

Description: Displays the amount of free and used memory in the system.
Example:
`free -h`
This shows memory usage in human-readable format.

## Additional Tools

### top / htop

Description: Monitors system processes and resource usage in real-time.
Example:
`top`
or for htop:
`htop`
Both provide an interactive process viewer.

### perf

Description: Linux profiling tool for performance analysis.
Example:
`perf stat ./my_app`
This provides basic performance statistics for `my_app`.

### parallel

Description: Executes jobs in parallel using multiple CPU cores.
Example:
`parallel -j 8 my_script.sh ::: input1 input2 input3 input4`
This runs `my_script.sh` on 8 CPU cores simultaneously, processing different inputs.

### nproc

Description: Print the number of processing units available.
Example:
`nproc`
This prints the number of available cores, which can be used in scripts to dynamically allocate tasks.

---

# Explanation of `ps -o pid,pri,ni,cmd -p 177213`

This command uses the `ps` (process status) utility to display information about a specific process:

- `ps`: The base command to report process status
- `-o pid,pri,ni,cmd`: Specifies the output format
  - `pid`: Process ID
  - `pri`: Priority of the process
  - `ni`: Nice value of the process
  - `cmd`: The command with all its arguments
- `-p 177213`: Selects the process with PID 177213

This command will output a table with four columns:

1. PID (Process ID): The unique identifier for the process
2. PRI (Priority): The current priority of the process
3. NI (Nice Value): The nice value, which affects process scheduling priority
4. CMD (Command): The command that started the process, including its arguments

This is useful for checking the priority and nice value of a specific process, which can be helpful when optimizing system performance or troubleshooting issues related to process scheduling.

---

# Explanation of `top -p 177213`

This command uses the `top` utility to monitor a specific process:

- `top`: The base command that provides a dynamic real-time view of a running system
- `-p 177213`: Specifies the Process ID (PID) to monitor

When executed, this command will:

1. Launch the `top` program in your terminal
2. Display real-time information about only the process with PID 177213
3. Continuously update this information (typically every 3 seconds by default)

The output will include:

- PID: Process ID (177213 in this case)
- USER: User who owns the process
- PR: Priority of the process
- NI: Nice value of the process
- VIRT: Virtual memory used
- RES: Resident memory used
- SHR: Shared memory used
- S: Process status (e.g., R for running, S for sleeping)
- %CPU: Percentage of CPU used by this process
- %MEM: Percentage of memory used by this process
- TIME+: Total CPU time used by the process
- COMMAND: Command used to start the process

This command is useful for monitoring the resource usage of a specific process in real-time, which can be helpful for performance tuning and troubleshooting.

Note: You can exit the `top` display by pressing 'q'.

---

# Explanation of taskset commands

## Command 1: `taskset -cp 177213`

This command displays the current CPU affinity of a specific process:

- `taskset`: The command to set or retrieve the CPU affinity of a process
- `-c`: Interprets mask as a list of CPUs instead of a bitmask
- `-p`: Operates on an existing PID (Process ID)
- `177213`: The PID of the process being queried

This command will show which CPU cores the process with PID 177213 is currently allowed to run on.

## Command 2: `sudo taskset -cp 0-$(nproc --all) 177213`

This command sets the CPU affinity for a specific process to use all available CPU cores:

- `sudo`: Runs the command with root privileges
- `taskset`: The command to set or retrieve the CPU affinity of a process
- `-c`: Interprets mask as a list of CPUs instead of a bitmask
- `-p`: Operates on an existing PID (Process ID)
- `0-$(nproc --all)`: Specifies the range of CPU cores to use
  - `0-`: Starts the range from CPU core 0
  - `$(nproc --all)`: A command substitution that returns the number of available processing units
- `177213`: The PID of the process whose CPU affinity is being set

This command allows the process with PID 177213 to run on all available CPU cores, potentially improving its performance if it can utilize multiple cores effectively.

Note: Using `sudo` may be necessary to change the CPU affinity of processes you don't own.
