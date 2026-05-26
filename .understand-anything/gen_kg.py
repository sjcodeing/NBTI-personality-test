import json, os, re
from datetime import datetime, timezone, timedelta

project_root = r"D:\projct\miniprogram"
tz = timezone(timedelta(hours=8))

import subprocess
try:
    commit_hash = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=project_root).decode().strip()
except:
    commit_hash = "unknown"

files = []
for root, dirs, filenames in os.walk(project_root):
    dirs[:] = [d for d in dirs if d not in ('node_modules', '.git', '.understand-anything')]
    for f in filenames:
        full_path = os.path.join(root, f)
        rel_path = os.path.relpath(full_path, project_root).replace('\\', '/')
        ext = os.path.splitext(f)[1]
        
        lang_map = {'.js': 'javascript', '.ts': 'typescript', '.json': 'json',
                    '.wxml': 'wxml', '.wxss': 'wxss', '.md': 'markdown'}
        cat_map = {'.js': 'code', '.ts': 'code', '.json': 'config',
                   '.wxml': 'markup', '.wxss': 'style', '.md': 'docs'}
        
        lang = lang_map.get(ext, 'unknown')
        cat = cat_map.get(ext, 'other')
        node_type = 'file' if cat == 'code' else ('config' if cat in ('config','style') else ('document' if cat in ('markup','docs') else 'file'))
        
        try:
            with open(full_path, 'r', encoding='utf-8') as fp:
                lines = len(fp.readlines())
                content = open(full_path, 'r', encoding='utf-8').read(500)
        except:
            lines = 0
            content = ''
        
        files.append({
            'id': f'{node_type}:{rel_path}',
            'type': node_type,
            'name': f,
            'filePath': rel_path,
            'summary': (content[:150].replace('\n', ' ').strip()) if content else f'{lang} file',
            'tags': [lang, cat],
            'complexity': 'moderate' if lines > 200 else 'simple'
        })

edges = []
js_files = [f for f in files if f['filePath'].endswith('.js')]
for jsf in js_files:
    full_path = os.path.join(project_root, jsf['filePath'])
    try:
        with open(full_path, 'r', encoding='utf-8') as fp:
            content = fp.read()
            for m in re.finditer(r"require\s*\(\s*['\"]([^'\"]+)['\"]\s*\)", content):
                imp = m.group(1)
                base = os.path.dirname(jsf['filePath'])
                resolved = os.path.normpath(os.path.join(base, imp)).replace('\\', '/')
                if not resolved.endswith('.js'):
                    resolved += '.js'
                target_id = f'file:{resolved}'
                source_id = jsf['id']
                if any(f['id'] == target_id for f in files):
                    edges.append({'source': source_id, 'target': target_id, 'type': 'imports', 'weight': 0.7})
    except:
        pass

pages_nodes = [f['id'] for f in files if f['filePath'].startswith('pages/')]
utils_nodes = [f['id'] for f in files if f['filePath'].startswith('utils/')]
data_nodes = [f['id'] for f in files if f['filePath'].startswith('data/')]
root_nodes = [f['id'] for f in files if '/' not in f['filePath']]

layers = [
    {'id': 'layer:pages', 'name': 'Pages', 'description': '小程序页面', 'nodeIds': pages_nodes},
    {'id': 'layer:utils', 'name': 'Utils', 'description': '工具函数', 'nodeIds': utils_nodes},
    {'id': 'layer:data', 'name': 'Data', 'description': '数据文件', 'nodeIds': data_nodes},
    {'id': 'layer:root', 'name': 'Root', 'description': '根目录配置', 'nodeIds': root_nodes}
]

tour = [
    {'order': 1, 'title': '项目概览', 'description': '微信小程序入口和全局配置', 'nodeIds': root_nodes[:5]},
    {'order': 2, 'title': '页面模块', 'description': '小程序各功能页面', 'nodeIds': pages_nodes[:10]},
    {'order': 3, 'title': '工具与数据', 'description': '工具函数和数据定义', 'nodeIds': utils_nodes + data_nodes[:5]}
]

kg = {
    'version': '1.0.0',
    'project': {
        'name': 'miniprogram',
        'languages': ['javascript', 'wxml', 'wxss', 'json'],
        'frameworks': ['wechat-miniprogram'],
        'description': '微信小程序 - 性格测试类应用',
        'analyzedAt': datetime.now(tz).isoformat(),
        'gitCommitHash': commit_hash
    },
    'nodes': files,
    'edges': edges,
    'layers': layers,
    'tour': tour
}

out_dir = os.path.join(project_root, '.understand-anything')
os.makedirs(out_dir, exist_ok=True)

with open(os.path.join(out_dir, 'knowledge-graph.json'), 'w', encoding='utf-8') as f:
    json.dump(kg, f, ensure_ascii=False, indent=2)

meta = {
    'lastAnalyzedAt': datetime.now(tz).isoformat(),
    'gitCommitHash': commit_hash,
    'version': '1.0.0',
    'analyzedFiles': len(files)
}
with open(os.path.join(out_dir, 'meta.json'), 'w', encoding='utf-8') as f:
    json.dump(meta, f, ensure_ascii=False, indent=2)

print(f'Done! Nodes={len(files)}, Edges={len(edges)}, Layers={len(layers)}, Tour={len(tour)}')
