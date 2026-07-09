# n8n Setup Guide with Docker Desktop

Run n8n locally using Docker Desktop and persist your workflows and credentials using Docker volumes.

## Prerequisites

Before starting, make sure you have:

* Docker Desktop installed and running
* WSL 2 installed and configured
* Docker Engine running successfully

Verify Docker installation:

```powershell
docker --version
```

Example output:

```powershell
Docker version 28.x.x, build xxxxxxx
```

If a version number is displayed, you're ready to continue.

---

## Step 1: Pull the n8n Docker Image

Open PowerShell and run:

```powershell
docker pull docker.n8n.io/n8nio/n8n
```

This downloads the latest n8n image to your machine.

---

## Step 2: Create and Run the n8n Container

Run the following command:

```powershell
docker run -d `
  --name n8n `
  -p 5678:5678 `
  -v n8n_data:/home/node/.n8n `
  --restart unless-stopped `
  docker.n8n.io/n8nio/n8n
```

### Command Breakdown

| Option                        | Description                             |
| ----------------------------- | --------------------------------------- |
| `-d`                          | Runs the container in the background    |
| `--name n8n`                  | Names the container "n8n"               |
| `-p 5678:5678`                | Maps local port 5678 to the container   |
| `-v n8n_data:/home/node/.n8n` | Persists workflows and credentials      |
| `--restart unless-stopped`    | Automatically restarts n8n after reboot |

---

## Step 3: Verify the Container is Running

Run:

```powershell
docker ps
```

You should see a container named:

```text
n8n
```

with a status similar to:

```text
Up
```

This confirms that n8n is running successfully.

---

## Step 4: Open n8n

Open your browser and visit:

```text
http://localhost:5678
```

The n8n setup page should appear.

---

## Step 5: Create Your Owner Account

On first launch:

1. Enter your name.
2. Enter your email address.
3. Create a password.
4. Complete the setup process.

This account will be used to access your local n8n instance.

---

## Step 6: Test Your Installation

After logging in:

1. Click **Create Workflow**.
2. Add a **Manual Trigger** node.
3. Execute the workflow.

If the workflow runs successfully, your n8n installation is working correctly.

---

## Common Docker Commands

### Stop n8n

```powershell
docker stop n8n
```

### Start n8n

```powershell
docker start n8n
```

### Restart n8n

```powershell
docker restart n8n
```

### View Logs

```powershell
docker logs -f n8n
```

### Remove Container

```powershell
docker rm -f n8n
```

---

## Updating n8n

Pull the latest image:

```powershell
docker pull docker.n8n.io/n8nio/n8n
```

Stop and remove the existing container:

```powershell
docker stop n8n
docker rm n8n
```

Create a new container using the command from Step 2.

Because your data is stored in the Docker volume, your workflows, credentials, and settings will remain intact.

---

## How n8n Data is Stored

```text
Docker Image
      │
      ▼
n8n Container
      │
      ▼
n8n_data Volume
```

The Docker volume ensures your workflows and credentials are preserved even if the container is recreated.

---

## Accessing n8n

By default, n8n is available locally at:

```text
http://localhost:5678
```

For remote access, you can later configure:

* Cloudflare Tunnel
* Reverse Proxy (Nginx)
* VPS Hosting
* Custom Domain

---

## Installation Complete

n8n is now running locally inside Docker Desktop.

You can start building:

* Workflow automations
* API integrations
* AI agents
* Data pipelines
* Scheduled jobs
* Business process automations