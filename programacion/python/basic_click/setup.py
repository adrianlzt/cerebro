from setuptools import setup

setup(
    name='GrafanaAdmin',
    version='0.1',
    py_modules=['gradmin'],
    install_requires=[
        'click',
    ],
    entry_points='''
        [console_scripts]
        gradmin=gradmin:main
    ''',
)
