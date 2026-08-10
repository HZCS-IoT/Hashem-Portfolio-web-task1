import json
import os
import base64

ROOT = r"C:\Users\hash0\Desktop\projects\hashem-portfolio"
SKIP_DIRS = {"node_modules", ".next", ".git"}
SKIP_FILES = {
    "deploy-payload.json",
    "vercel-deploy-args.json",
    "build-deploy-payload.py",
    "package-lock.json",
    "README.md",
    "eslint.config.mjs",
}
SKIP_FILES.update({f"public/{x}" for x in ["file.svg", "globe.svg", "next.svg", "vercel.svg", "window.svg"]})
BINARY_EXT = {".ico", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf"}

files = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
    for fn in filenames:
        if fn in SKIP_FILES:
            continue
        path = os.path.join(dirpath, fn)
        rel = os.path.relpath(path, ROOT).replace("\\", "/")
        ext = os.path.splitext(fn)[1].lower()
        if ext in BINARY_EXT:
            with open(path, "rb") as f:
                data = base64.b64encode(f.read()).decode("ascii")
            files.append({"file": rel, "data": data, "encoding": "base64"})
        else:
            with open(path, "r", encoding="utf-8") as f:
                data = f.read()
            files.append({"file": rel, "data": data})

payload = {
    "target": "production",
    "name": "hashem-portfolio",
    "files": files,
    "projectSettings": {"framework": "nextjs"},
}

out = os.path.join(ROOT, "deploy-payload.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(payload, f)

print(f"Wrote {len(files)} files, {os.path.getsize(out) // 1024} KB")
