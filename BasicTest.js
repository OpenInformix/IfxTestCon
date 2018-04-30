
var ifxobj = require('ifxnjs');
const util = require('util');

class CBasicTest
{
    constructor() { }

    DirExec(dbCon, ErrIgn, sql)
    {
        try
        {
            var result = dbCon.querySync(sql);
            console.log(sql);
        }
        catch (e)
        {
            console.log("--- " + sql);
            if (ErrIgn != 1)
            {
                console.log(e);
                console.log();
            }
        }
    }

    DoSomeWork(dbCon)
    {
        this.DirExec(dbCon, 1, "drop table t1");
        this.DirExec(dbCon, 0, "create table t1 ( c1 int, c2 char(20) ) ");
        this.DirExec(dbCon, 0, "insert into t1 values( 1, 'val-1' )");
        this.DirExec(dbCon, 0, "insert into t1 values( 2, 'val-2' )");
        this.DirExec(dbCon, 0, "insert into t1 values( 3, 'val-3' )");
        this.DirExec(dbCon, 0, "insert into t1 values( 4, 'val-4' )");
        this.DirExec(dbCon, 0, "insert into t1 values( 5, 'val-5' )");

        console.log();
        console.log(" --- SELECT * FROM t1 ------ ");

        var rows = dbCon.querySync("SELECT * FROM t1");
        console.log();
        console.log(rows);
    };

    RunTest1(ConStr, drda = false)
    {

        console.log(" --- Executing SqliBasicTest ....");
        var dbCon;
        try
        {
            if (drda)
            {
                // This is for DRDA
                dbCon = null;
            }
            else
            {
                dbCon = ifxobj.openSync(ConStr);
            }
        }
        catch (e)
        {
            console.log(e);
            return;
        }

        this.DoSomeWork(dbCon);

        try
        {
            dbCon.closeSync();
        }
        catch (e)
        {
            console.log(e);
        }
        console.log(" --- End ifxnjs.openSync()");
    }

}




function main()
{
    var mTest = new CBasicTest();

    conInfo =
        {
            myHost: "ec2-52-207-237-201.compute-1.amazonaws.com",
            myServer: "ol_aws",
            myDb: "db1",
            myUser: "dbuser1",
            myPwd: "mypwd123",

            ///////// SQLI /////////
            sqliPort: 9088,
            sslPort: 9089,
            sqliProto: "onsoctcp",
            sslProto: "olsocssl",

            //////// DRDA //////////
            drdaPort: 9090,
            drda_sslPort: 9091,
            drdaProto: "onsoctcp",
            drda_sslProto: "olsocssl"

            /////// Mongo 27017  27018
            /////// HTTP/REST  26001 26002
        };

    ////////////////////////////////////////////////
    const Connectivitys =
    {
        SQLI: 'sqli',
        SQLI_SSL: 'sqli_ssl',
        DRDA: 'drda',
        DRDA_SSL: 'drda_ssl'
    }

    ////////////////////////////////////////////////

    // var ConnStr  =  "SERVER=ids0;DATABASE=db1;HOST=127.0.0.1;SERVICE=9088;PROTOCOL=onsoctcp;UID=informix;PWD=xxxx;";
    // var ConnStr0 = 'HOST=%s;SERVER=%s;SERVICE=%i;PROTOCOL=%s;DATABASE=%s;UID=%s;PWD=%s;CLIENT_LOCALE=en_us.8859-1;DB_LOCALE=en_us.utf8';
    var ConnStr0 = 'HOST=%s;SERVER=%s;SERVICE=%i;PROTOCOL=%s;DATABASE=%s;UID=%s;PWD=%s';


    const ConnStr_sqli = util.format(ConnStr0,
        conInfo.myHost,
        conInfo.myServer,
        conInfo.sqliPort,
        conInfo.sqliProto,
        conInfo.myDb,
        conInfo.myUser,
        conInfo.myPwd);

    const ConnStr_sqli_ssl = util.format(ConnStr0,
        conInfo.myHost,
        conInfo.myServer,
        conInfo.sslPort,
        conInfo.sslProto,
        conInfo.myDb,
        conInfo.myUser,
        conInfo.myPwd);

    const ConnStr_drda = util.format(ConnStr0,
        conInfo.myHost,
        conInfo.myServer,
        conInfo.drdaPort,
        conInfo.drdaProto,
        conInfo.myDb,
        conInfo.myUser,
        conInfo.myPwd);


    const ConnStr_drda_ssl = util.format(ConnStr0,
        conInfo.myHost,
        conInfo.myServer,
        conInfo.drda_sslPort,
        conInfo.drda_sslProto,
        conInfo.myDb,
        conInfo.myUser,
        conInfo.myPwd);



    for (let item in Connectivitys)
    {
        isDrda = false;
        let ConnType = Connectivitys[item];

        if (ConnType == Connectivitys.SQLI)
        {
            console.log("SQLI :");
            isDrda = false;
            ConnStr = ConnStr_sqli;

            console.log(ConnStr);
            mTest.RunTest1(ConnStr, isDrda);

        }

        if (ConnType == Connectivitys.SQLI_SSL)
        {
            console.log("SQLI_SSL : ");
            isDrda = false;
            ConnStr = ConnStr_sqli_ssl;

            console.log(ConnStr);
            //mTest.RunTest1(ConnStr, isDrda);
        }

        if (ConnType == Connectivitys.DRDA)
        {
            console.log("DRDA : ");
            isDrda = true;
            ConnStr = ConnStr_drda;

            console.log(ConnStr);
            //mTest.RunTest1(ConnStr, isDrda);
        }

        if (ConnType == Connectivitys.DRDA_SSL)
        {
            console.log("DRDA_SSL : ");
            isDrda = true;
            ConnStr = ConnStr_drda_ssl;

            console.log(ConnStr);
            //mTest.RunTest1(ConnStr, isDrda);
        }

    }

}

main();