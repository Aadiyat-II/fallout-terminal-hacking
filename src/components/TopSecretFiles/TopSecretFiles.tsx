import './TopSecretFiles.css'

export default function TopSecretFiles({ reset } : { reset: CallableFunction }){
    return <div className="top-secret-screen">
                <div className="top-secret-text">
                    <p>
                        As our tests suggested, the immediate vicinity of the vault is no longer dangerously irradiated, although the background radiation is still well above safe levels. Pockets of more intense radiation appear to still be common, and all surface water seems to be undrinkable. We will need to carry ample supplies of Rad-X with us on all future surveys. But hazard suits do not seem to be necessary for general exploration.
                    </p>
                    <p>
                        Our old maps are largely useless. The town of Springvale is an abandoned ruin, and all pre-War roads have disappeared or are no longer passable.
                    </p>
                    <p>
                        We encountered a group of monstrous ants which appeared to confirm Mackay's theories of mutation due to extended exposure to radiation. We drove off the ants with gunfire and collected several specimens for study upon return to the vault (see Exhibit A).
                    </p>
                    <p>
                        The good news is that human civilization still survives, despite everything! We discovered a settlement known as "Megaton" (see Exhibit B), whose inhabitants, although somewhat wary at first, soon welcomed us into their town.
                    </p>
                    <p>
                        We spent a good deal of time in Megaton, and learned a great deal about the "Capital Wasteland" (as the area around Washington D.C. is now called) from them. Megaton is a fortified outpost of "civilization" (of sorts), but it seems that Giant Ants are the least of the dangers of this new world. We agreed that it was prudent to return to the Vault immediately to revise our survey plans in light of what we have learned. Lewis and Agnes remained in Megaton to serve as "ambassadors" and continue to collect information until we return.
                    </p>
                    <p>
                        Anne Palmer, Survey Team Leader
                    </p>
                    <p>
                        February 10, 2241
                    </p>
                </div>
                <button onClick={()=>reset()}>&gt; EXIT</button>
            </div>
}