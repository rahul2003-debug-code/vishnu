#!/usr/bin/env python3
import os
import sys
import json
import base64
import urllib.request
import urllib.error

REPO = "rahul2003-debug-code/vishnu"
BRANCH = "main"

def get_token():
    if len(sys.argv) > 1:
        return sys.argv[1].strip()
    return input("Enter your GitHub Personal Access Token: ").strip()

def upload_file(token, file_path, repo_path):
    with open(file_path, "rb") as f:
        content_bytes = f.read()
    
    b64_content = base64.b64encode(content_bytes).decode("utf-8")
    
    url = f"https://api.github.com/repos/{REPO}/contents/{repo_path}"
    
    # Check if file already exists to get SHA
    sha = None
    req = urllib.request.Request(
        f"{url}?ref={BRANCH}",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "VPS-Deployer"
        }
    )
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            sha = data.get("sha")
    except urllib.error.HTTPError as e:
        if e.code != 404:
            print(f"Warning checking {repo_path}: {e.code}")

    payload = {
        "message": f"feat: add {repo_path}",
        "content": b64_content,
        "branch": BRANCH
    }
    if sha:
        payload["sha"] = sha

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "VPS-Deployer",
            "Content-Type": "application/json"
        },
        method="PUT"
    )

    try:
        with urllib.request.urlopen(req) as response:
            print(f"✓ Uploaded {repo_path}")
            return True
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode()
        print(f"✗ Failed {repo_path}: {e.code} - {err_msg}")
        return False

def main():
    token = get_token()
    if not token:
        print("Error: No GitHub token provided.")
        sys.exit(1)

    print(f"Uploading files to https://github.com/{REPO} (branch: {BRANCH})...\n")

    files_to_upload = []
    for root, dirs, files in os.walk("."):
        # Skip git and python script itself
        if ".git" in root or "__pycache__" in root:
            continue
        for file in files:
            if file == "push_via_token.py":
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, ".").replace("\\", "/")
            files_to_upload.append((full_path, rel_path))

    success_count = 0
    for full_path, rel_path in files_to_upload:
        if upload_file(token, full_path, rel_path):
            success_count += 1

    print(f"\nCompleted! {success_count}/{len(files_to_upload)} files uploaded successfully.")
    print(f"\nNext Steps:\n1. Open https://github.com/{REPO}/settings/pages")
    print("2. Set Source to 'Deploy from a branch', Branch: 'main', Folder: '/ (root)'")
    print("3. In 1-2 minutes, your website will be live at: https://rahul2003-debug-code.github.io/vishnu/")

if __name__ == "__main__":
    main()
