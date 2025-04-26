import * as token from '@solana/spl-token';
import * as web3 from '@solana/web3.js';
import * as metadata from '@solana/spl-token-metadata'
import api from './api'


const createToken = async (wallet : string, cluster : string, metaplexMetadata : MetaplexMetadata, metaplexMetadataURI : string)=>{

    //IDENTIFIERS
    const owner = new web3.PublicKey(wallet)
    const mint = web3.Keypair.generate()

    //METADATA
    const tokenMetadata : metadata.TokenMetadata = {
      updateAuthority: owner,
      mint: mint.publicKey,
      name: metaplexMetadata.name,
      symbol: metaplexMetadata.symbol,
      uri: metaplexMetadataURI,
      additionalMetadata: [],
    }
    
    //ACCOUNT SIZE
    const tokenMetadataExtensionSize = token.TYPE_SIZE + token.LENGTH_SIZE
    const tokenMetadataSize = metadata.pack(tokenMetadata).length
    const mintSize = token.getMintLen([token.ExtensionType.MetadataPointer])
    const space = mintSize + tokenMetadataExtensionSize + tokenMetadataSize

    //CONNECTION INFO
    const lamports = (await api.post('/rpc/rent',{cluster,space})).data.lamports
    const blockhash = (await api.post('/rpc/blockhash',{cluster})).data.blockhash

    //ASSOCIATED TOKEN ACCOUNT ADDRESS (PDA)
    const [account] = web3.PublicKey.findProgramAddressSync(
      [owner.toBuffer(), token.TOKEN_2022_PROGRAM_ID.toBuffer(), mint.publicKey.toBuffer()],
      token.ASSOCIATED_TOKEN_PROGRAM_ID
    )
    
    //CREATE TRANSACTION
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: mint.publicKey,
        space:mintSize,
        lamports,
        programId:token.TOKEN_2022_PROGRAM_ID,
      }),
      token.createInitializeMetadataPointerInstruction(
        mint.publicKey,
        owner,
        mint.publicKey,
        token.TOKEN_2022_PROGRAM_ID
      ),
      token.createInitializeMintInstruction(
        mint.publicKey,
        6,
        owner,
        owner,
        token.TOKEN_2022_PROGRAM_ID,
      ),
      metadata.createInitializeInstruction({
        programId:token.TOKEN_2022_PROGRAM_ID,
        metadata:mint.publicKey,
        updateAuthority:owner,
        mint:mint.publicKey,
        mintAuthority:owner,
        name:tokenMetadata.name,
        symbol:tokenMetadata.symbol,
        uri:tokenMetadata.uri
      }),
      token.createAssociatedTokenAccountInstruction(
        owner,
        account,
        owner,
        mint.publicKey,
        token.TOKEN_2022_PROGRAM_ID,
        token.ASSOCIATED_TOKEN_PROGRAM_ID,
      ),
    )
    transaction.recentBlockhash = blockhash
    transaction.feePayer = owner
    transaction.sign(mint)

    //SIGN AND SEND
    await window.phantom.solana.signAndSendTransaction(transaction)

    //CONFIRMED
    return {
      address: mint.publicKey.toString(),
      authority: owner.toString(),
      account : account.toString(),
      cluster,
      metadata:metaplexMetadata,
      metadataURI:metaplexMetadataURI,
      tokenUSDValue:.01,
      tokenDecimals:6,
    }

}


export default createToken

