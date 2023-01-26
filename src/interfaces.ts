interface IMilk {
    "name": string,
    "type": string,
    "storage": number,
    "id": string
}

interface IProduct {
    "product": IMilk
}

export type { IMilk, IProduct }