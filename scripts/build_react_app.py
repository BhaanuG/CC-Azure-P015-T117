import os, shutil, json

dashboard_dir = r'E:\Azure-AVD-Hackathon\dashboard'
src_dir = os.path.join(dashboard_dir, 'src')

for folder in ['data', 'engine', 'context', 'components', 'pages', 'styles', 'utils']:
    os.makedirs(os.path.join(src_dir, folder), exist_ok=True)

print('Directory structure created successfully')
