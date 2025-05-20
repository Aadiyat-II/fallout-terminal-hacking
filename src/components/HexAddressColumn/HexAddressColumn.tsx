export default function HexAddressColumn({ addresses } : { addresses: number[]}){
    const formattedAddresses = addresses.map((address, _) => <p className="hex-address">0x{address.toString(16).padStart(4, '0')}</p>)

    return <div className="hex-address-column">{formattedAddresses}</div>
}