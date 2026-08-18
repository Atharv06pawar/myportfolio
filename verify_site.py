import os
import re

def verify():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find IDs
    ids = set(re.findall(r'id=["\']([^"\']+)["\']', html))
    print(f"Total IDs found: {len(ids)}")
    
    # Find internal anchors
    hrefs = set(re.findall(r'href=["\'](#[a-zA-Z0-9_-]+)["\']', html))
    print(f"Internal anchors found: {len(hrefs)}")
    
    broken_anchors = []
    for h in hrefs:
        target = h[1:]
        if target not in ids:
            broken_anchors.append(h)
        else:
            print(f"  [OK Anchor] {h} -> #{target}")
            
    if broken_anchors:
        print(f"BROKEN ANCHORS: {broken_anchors}")
    else:
        print("ALL internal anchors point to valid IDs!")

    # Find local assets
    local_refs = set(re.findall(r'(?:src|href)=["\']((?!(?:https?://|mailto:|#|data:))[^"\']+)["\']', html))
    print(f"\nLocal assets referenced ({len(local_refs)}):")
    missing_assets = []
    for asset in local_refs:
        clean_path = asset.lstrip('./').split('?')[0]
        if os.path.exists(clean_path):
            print(f"  [OK Asset] {asset} -> exists ({os.path.getsize(clean_path)} bytes)")
        else:
            print(f"  [MISSING] {asset}")
            missing_assets.append(asset)
            
    if missing_assets:
        print(f"\nERROR: Missing assets found: {missing_assets}")
    else:
        print("\nALL local assets successfully resolved!")

if __name__ == "__main__":
    verify()
