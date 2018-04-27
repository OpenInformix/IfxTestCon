
var format = require("string-template")
var ifxobj = require('ifxnjs');




class CBasicTest 
{
    constructor() {  }

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

    DoSomeWork(err, dbCon)
    {
        DirExec(dbCon, 1, "drop table t1");
        DirExec(dbCon, 0, "create table t1 ( c1 int, c2 char(20) ) ");
        DirExec(dbCon, 0, "insert into t1 values( 1, 'val-1' )");
        DirExec(dbCon, 0, "insert into t1 values( 2, 'val-2' )");
        DirExec(dbCon, 0, "insert into t1 values( 3, 'val-3' )");
        DirExec(dbCon, 0, "insert into t1 values( 4, 'val-4' )");
        DirExec(dbCon, 0, "insert into t1 values( 5, 'val-5' )");

        console.log();
        console.log(" --- SELECT * FROM t1 ------ ");

        var rows = dbCon.querySync("SELECT * FROM t1");
        console.log();
        console.log(rows);
    };

    RunTest1(ConStr, drda=false)
    {

        console.log(" --- Executing SqliBasicTest ....");
        var dbCon;
        try
        {
            if( drda )
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

        DoSomeWork(dbCon);

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
        myHost : "ec2-52-207-237-201.compute-1.amazonaws.com",
        myServer :  "ol_aws",
        myDb: "db1",
        myUser: "dbuser1",
        myPwd: "mypwd123",

        //////////////////
        sqliPort: 9088,
        sslPort:9089,
        sqliProto: "onsoctcp",
        sslProto: "olsocssl"
    };


    ////////////////////////////////////////////////
const Connectivitys = {
    SQLI: 'sqli',
    SQLI_SSL: 'sqli_ssl',
    DRDA: 'drda',
    DRDA_SSL: 'drda_ssl'
}




    ////////////////////////////////////////////////

    var ConnStr  =  "SERVER=ids0;DATABASE=db1;HOST=127.0.0.1;SERVICE=9088;PROTOCOL=onsoctcp;UID=informix;PWD=xxxx;";
    var sslConStr = 'HOST={myHost};SERVER={myServer}; SERVICE={sslPort}; PROTOCOL={sslProto}; DATABASE={myDb};UID={myUser};PWD={myPwd};CLIENT_LOCALE=en_us.8859-1;DB_LOCALE=en_us.utf8';
    var sqliConStr = 'HOST={myHost};SERVER={myServer};SERVICE={sqliPort};PROTOCOL={sqliProto};DATABASE={myDb};UID={myUser};PWD={myPwd};CLIENT_LOCALE=en_us.8859-1;DB_LOCALE=en_us.utf8';


    for (let item in Connectivitys)
    {
        isDrda = false;
        let ConnType = Connectivitys[item];

        switch (ConnType)
        {
            case Connectivitys.SQLI:
                isDrda = false;
                ConnStr = format(sqliConStr, conInfo);
                // mTest.RunTest1(SqliConStr, isDrda);
                break;

            case Connectivitys.SQLI_SSL:
                isDrda = false;
                ConnStr = format(sslConStr, conInfo);
                // mTest.RunTest1(SqliConStr, isDrda);
                break;


            case Connectivitys.DRDA:
                isDrda = true;
                ConnStr = " Connection string for DRDA"
                // mTest.RunTest1(SqliConStr, isDrda);
                break;

            case Connectivitys.DRDA_SSL:
                isDrda = true;
                ConnStr = " Connection string for DRDA SSL"
                // mTest.RunTest1(SqliConStr, isDrda);
                break;
        }
        console.log(ConnStr);
    }

}

main();