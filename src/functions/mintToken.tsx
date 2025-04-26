import * as token from '@solana/spl-token'
import * as web3 from '@solana/web3.js'
import api from './api'


const mintToken = async (cluster : string, authorityAddress : string, mintAddress : string, accountAddress : string, amount : number)=>{

    //IDENTIFIERS
    const authority = new web3.PublicKey(authorityAddress)
    const mint = new web3.PublicKey(mintAddress)
    const account = new web3.PublicKey(accountAddress)

    //CONNECTION INFO
    const blockhash = (await api.post('/rpc/blockhash',{cluster})).data.blockhash

    //CREATE TRANSACTION
    const transaction = new web3.Transaction().add(
        token.createMintToCheckedInstruction(
            mint,
            account,
            authority,
            amount*Math.pow(10,6),
            6,
            [],
            token.TOKEN_2022_PROGRAM_ID
        )
    )
    transaction.recentBlockhash = blockhash
    transaction.feePayer = authority

    //SIGN AND SEND
    const confirmation = await window.phantom.solana.signAndSendTransaction(transaction)

    //CONFIRMED
    return confirmation

}


export default mintToken