# -*- mode: python ; coding: utf-8 -*-

block_cipher = None


a = Analysis(['server.py'],
             pathex=['/home/paul/Documents/code/Computer-Vision-Emergency-Response-Toolkit/python-server'],
             binaries=[],
             datas=[('Algorithms/pretrained_aod_net_numpy.npy', 'Algorithms')],
             hiddenimports=[
              "Algorithms.DXDetector",
              "Algorithms.RXDetector",
              "Algorithms.AODNet"
             ],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [],
          name='server',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=False )
