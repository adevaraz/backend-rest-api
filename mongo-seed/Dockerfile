FROM mongo

ARG DB_HOST
ARG DB_PORT
ARG DB_NAME

ENV DB_HOST ${DB_HOST}
ENV DB_PORT ${DB_PORT}
ENV DB_NAME ${DB_NAME}

COPY users.json /users.json

CMD mongoimport --host ${DB_HOST} --port ${DB_PORT} --db ${DB_NAME} --collection users --drop --file users.json --jsonArray