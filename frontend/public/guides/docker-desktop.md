## Prerequisites

Before starting, make sure you have:

- Windows 10 or Windows 11
- Administrator access
- Internet connection

---

## Step 1: Install WSL

Docker Desktop uses WSL 2 as its backend on Windows.

### Install WSL

Open PowerShell as Administrator and run:

```powershell
wsl --install
```

Restart your computer if prompted.

### Verify Installation

After restarting, open PowerShell and run:

```powershell
wsl --version
```

Example output:

```powershell
WSL version: 2.x.x.x
Kernel version: x.x.x
```

If version information is displayed, WSL has been installed successfully.

---

## Step 2: Download Docker Desktop

Visit the official Docker Desktop download page:

https://www.docker.com/products/docker-desktop/

Download the Windows installer and wait for the download to complete.

---

## Step 3: Install Docker Desktop

Open the downloaded installer and follow the setup wizard.

Keep the default settings enabled, including:

- Use WSL 2 instead of Hyper-V (recommended)
- Add Docker Desktop shortcuts

Complete the installation and restart your computer if prompted.

---

## Step 4: Launch Docker Desktop

Open **Docker Desktop** from the Start Menu.

During the first launch:

1. Wait for Docker Desktop to initialize.
2. Accept any required permissions or agreements.
3. Allow Docker to finish setting up its WSL integration.

Once Docker starts successfully, the Docker Desktop dashboard will appear.

---

## Step 5: Verify Docker Installation

Open PowerShell and run:

```powershell
docker --version
```

Example output:

```powershell
Docker version 28.x.x, build xxxxxxx
```

To verify Docker can run containers, execute:

```powershell
docker run hello-world
```

If Docker is configured correctly, you will see a welcome message from the container.

---

## Troubleshooting

### WSL Not Detected

If Docker reports that WSL is not installed:

1. Open PowerShell as Administrator.
2. Run:

```powershell
wsl --install
```

3. Restart your computer.
4. Launch Docker Desktop again.

### Docker Desktop Fails to Start

Try the following:

1. Restart Docker Desktop.
2. Restart your computer.
3. Ensure WSL is installed correctly.
4. Verify virtualization is enabled in BIOS/UEFI.

### Verify WSL Distribution

Run:

```powershell
wsl -l -v
```

You should see at least one Linux distribution installed and running with Version 2.

---

## Installation Complete

Docker Desktop is now installed and ready to use.

You can now run containers and development tools such as:

- n8n
- PostgreSQL
- MySQL
- MongoDB
- Redis
- Node.js applications
- Other containerized services