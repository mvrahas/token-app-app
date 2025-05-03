interface Window {
    phantom: {
        solana: {
            isConnected : boolean,
            connect : Function,
            signTransaction: Function,
            signAndSendTransaction : Function,
        }
    }
}

interface Props {
    children : React.ReactNode,
}

interface User {
    firstName:string
    lastName:string
}

interface Organization {
    name:string,
    billing:{
        customerId:string,
        isSubscribed:boolean,
    }
}

interface Key {
    _id : string,
    name : string,
    expired : boolean,
    createdAt : Date,
}

interface Mint {
    _id : string,
    metadata : {
        name : string,
        symbol : string,
        image : string,
        description : string,
    },
    address : string,
    authority : string,
    account : string,
    createdAt : Date
}

interface Balance {
    uiAmount : number,
    uiDelegatedAmount : number
}

interface AuthContextType {
    user: User|null,
    organization : Organization|null,
    isAuthenticated : boolean,
    isLoaded : boolean,
    login: () => Promise<void>
}

interface MetaplexMetadata {
    name: string,
    symbol: string,
    description: string,
    image: string,
}

interface ImageDimensions {
    width: number,
    height: number,
}

interface PortalInfo {
    metadata : {
        image : string,
        name : string,
        symbol : string,
    }
    balance : number,
    expiration : string,
}

interface GiftPortalInfo {
    metadata : {
        image : string,
        name : string,
        symbol : string,
        description : string,
    }
    tokenUSDValue : number,
}

interface PaymentPortalInfo {
    name : string,
    amountUSD : number,
    returnURL : string,
    token : {
        metadata : {
            name : string,
            symbol : string,
            description : string,
            image : string
        },
        tokenUSDValue : number
    }
}