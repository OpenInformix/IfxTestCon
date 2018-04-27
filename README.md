# testconn
Basic Connectivity Test with Informix Database




### DB Server Setup
```
sudo -u informix bash
dbaccess 

--drop database db1;
CREATE   database   db1  with log;

create user dbuser1 with password 'mypwd123' properties USER 
nobody authorization (DBSA);

GRANT CONNECT TO dbuser1;
GRANT DBA     TO dbuser1;
```

```bash
git clone https://github.com/OpenInformix/testconn.git
cd testconn

# to install latest version of Informix node.js driver
npm install ifxnjs

# if you are using old node.js then specify the version of Inforix node.js,
# say if you are using node.js 6.x then
# npm install ifxnjs@^6.0.0
```

### Client environment
```bash
export INFORMIXDIR=/opt/informix
export LD_LIBRARY_PATH=${INFORMIXDIR}/lib:${INFORMIXDIR}/lib/esql:${INFORMIXDIR}/lib/cli

```