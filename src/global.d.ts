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
    wallet:{
        publicKey:string
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
    tokenUSDValue : number,
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

interface Method {
    name : string,
    symbol : string,
    address : string,
}

interface PaymentPortalInfo {
    name : string,
    amountUSD : number,
    returnURL : string|null,
    token : {
        metadata : {
            name : string,
            symbol : string,
            description : string,
            image : string
        },
        tokenUSDValue : number
    }
    methods : Method[], 
    processed : boolean,
    confirmed : boolean,
    sandbox : boolean,
}

