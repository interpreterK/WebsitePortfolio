export function RandRange(min, max) {
    return Math.random()*(max-min)+min
}

export function E_clamp(min, x, max) {
    return Math.max(min, Math.min(x, max))
}

// Easings
// https://easings.net/
export function lerp(start, end, t) {
    t=E_clamp(.0,t,1)
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
        }, i*2)
    }
}