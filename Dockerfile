FROM postgres:latest
ENV POSTGRES_DB spotik
ENV POSTGRES_USER spotikuser
ENV POSTGRES_PASSWORD potikpassword
EXPOSE 5432
CMD ["postgres"]