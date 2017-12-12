FROM python:3.6-slim
WORKDIR /app/
COPY requirements_dev.txt /
RUN pip install -r /requirements_dev.txt
COPY main.py /app/
RUN flake8
# ignore long lines
#RUN flake8 --ignore=ES501
RUN pylint
RUN pydocstyle

FROM python:3.6-slim
CMD python /main.py
COPY requirements.txt /
RUN pip install -r /requirements.txt
COPY main.py /
