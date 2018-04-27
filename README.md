# IfxTestCon
Basic Connectivity Test with Informix Database


### DB Server Setup
```
sudo -u informix bash
dbaccess 


CREATE   database   db1  with log;

create user dbuser1 with password 'mypwd123' properties USER nobody authorization (DBSA);

GRANT CONNECT TO dbuser1;
GRANT DBA     TO dbuser1;
```


