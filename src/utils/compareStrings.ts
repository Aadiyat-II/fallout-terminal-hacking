export default function compareStrings(target: string, guess: string){
    let numMatches = 0
    const targetChars = target.split('')
    const guessChars = guess.split('')
    targetChars.forEach(
        (char, i) => {
            if (guessChars[i] == char)
                numMatches++;
        }
    )

    return numMatches
}