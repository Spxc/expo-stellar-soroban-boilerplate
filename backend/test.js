const SorobanClient = require('soroban-client');

// XXX need http to not crash with unsecure connection error
const server = new SorobanClient.Server('https://rpc-futurenet.stellar.org', { allowHttp: true })

// (async function main() {
  // // XXX getAccount (as used in readme.md) doesn't return an Account so build will fail
  server.getAccount("GCDU6USHPKLZGIBYNLCZM7KRUVWLCUUHTTAS7YJWJ5MXFVWZNKTNH3WX")
  .then(_account => {
    console.log("BIG INT", BigInt(_account.sequence))
    const account = new SorobanClient.Account(_account._accountId, "0");
    console.log("ACCOUNT: ",account)
    // server.getEvents({"startLedger": "578511", filters: []})
    // // server.getLatestLedger()
    // .then(response => {
    //     console.log(response) // 588511
    // })
    // .catch(error => {
    //     console.log(error)
    // })
    // const key = SorobanClient.xdr.LedgerKey.account(
    //     new SorobanClient.xdr.LedgerKeyAccount({accountId: _account._accountId})
    // );
    // console.log(key)
    // server.getLedgerEntries([key]).then(function (response) {
    // //     const ledgerEntry = response.entries[0];
    // //     // const parsed = SorobanClient.xdr.LedgerEntryData.fromXDR(ledgerEntry.xdr, 'base64');
    // //     // console.log( JSON.stringify(parsed) );
    // });
    // const account = new SorobanClient.Account(_account._accountId, _account.sequence);

    return
  })
// const t = async() => {
//     const account = await server.getAccount("GCDU6USHPKLZGIBYNLCZM7KRUVWLCUUHTTAS7YJWJ5MXFVWZNKTNH3WX");

//     console.log("account:", account)
//     return
// }

  
// t()

// const key = SorobanClient.xdr.LedgerKey.account(
//     new SorobanClient.xdr.LedgerKeyAccount({
//       accountId: 'GASOCNHNNLYFNMDJYQ3XFMI7BYHIOCFW3GJEOWRPEGK2TDPGTG2E5EDW'
//     })
// );

// server.getLedgerEntries([key]).then(function (response) {
//     const ledgerEntry = response.entries[0];
//     const parsed = SorobanClient.xdr.LedgerEntryData.fromXDR(ledgerEntry.xdr, 'base64');
//     console.log( JSON.stringify(parsed) );
// });

  /// XXX: loadAccount (as used https://github.com/stellar/js-soroban-client/blob/main/docs/reference/examples.md) is not a method on server 

  // Right now, this is just the default fee for this example.
// })()