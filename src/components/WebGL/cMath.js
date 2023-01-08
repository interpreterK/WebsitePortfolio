export function RandArbitrary(min, max) {
    return Math.random()*(max-min)+min
}

/*
    Easings
    https://easings.net/
*/
export function lerp(start, end, t) {
    return start*(1-t)+end*t
}

export function easeOutQuad(x) {
    return 1-(1-x)*(1-x)
}
// End Easings

export function FadeIn(Element) {
    setTimeout(() => {
        for (let i = 0; i <= 100; i++) {
            setTimeout(() => {
                Element.style.filter = `opacity(${i}%)`
            }, i*2)
        }
    }, 2000)
}

export function FadeOut(Element) {
    for (let i = 100; i >= 0; i--) {
        setTimeout(() => {
            Element.style.filter = `opacity(${i}%)`
            console.log(i)
        }, i*2)
    }
}