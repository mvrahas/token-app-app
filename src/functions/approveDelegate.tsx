import * as token from '@solana/spl-token';
import * as web3 from '@solana/web3.js';
import api from './api';


const approveDelegate = async (cluster : string, authorityAddress : string, accountAddress : string, mintAddress : string, delegateAddress : string, amount : number)=>{

    //ADDRESSES
    const authority = new web3.PublicKey(authorityAddress)
    const account = new web3.PublicKey(accountAddress)
    const mint = new web3.PublicKey(mintAddress)
    const delegate = new web3.PublicKey(delegateAddress)

    //CONNECTION INFO
    const blockhash = (await api.post('/rpc/blockhash',{cluster})).data.blockhash

    //CREATE TRANSACTION
    const transaction = new web3.Transaction().add(
      token.createApproveCheckedInstruction(
        account,
        mint,
        delegate,
        authority,
        amount*Math.pow(10,6),
        6,
        [],
        token.TOKEN_2022_PROGRAM_ID
      ),
    )
    transaction.recentBlockhash = blockhash
    transaction.feePayer = authority

    //SIGN AND SEND
    const confirmation = await window.phantom.solana.signAndSendTransaction(transaction)

    //CONFIRMED
    return confirmation

}


export default approveDelegate

