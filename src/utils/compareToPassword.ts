export default function compareToPassword(password: string, guess: string){
    let numMatches = 0
    const passwordChars = password.split('')
    const guessChars = guess.split('')
    passwordChars.forEach(
        (char, i) => {
            if (guessChars[i] == char)
                numMatches++;
        }
    )

    return numMatches
}