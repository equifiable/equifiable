FROM --platform=linux/amd64 ubuntu:22.04

RUN apt update && \
    apt install -y python3-launchpadlib software-properties-common && \
    add-apt-repository ppa:serokell/tezos && \
    apt update 
    
RUN touch /.containerenv

RUN apt install -y curl netbase npm wget apt-transport-https tezos-client 

RUN wget -O /usr/bin/archetype-x64-linux https://github.com/completium/archetype-lang/releases/download/1.5.1/archetype-x64-linux && \
    npm install -g @completium/completium-cli && \
    completium-cli init && \
    completium-cli set binary path archetype /usr/bin/archetype-x64-linux && \
    completium-cli set mode archetype binary

RUN chmod +x /usr/bin/archetype-x64-linux && npm install n -g && n stable

# RUN apt install python3.10 pip

# RUN pip3 install https://smartpy.io/static/tezos_smartpy-0.19.1-py3-none-any.whl


WORKDIR /app
