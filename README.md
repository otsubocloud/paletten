# paletten

[//]: # (Sorry for my poor English)

### Lightweight color steps generator

- Automatically generates design-color-tokens from just a color code.
- Zero-dependency **Type-Scriptable** library [gzipped-bundle size is lightly 3.4 kB](https://bundlejs.com/?q=paletten%400.5.0&treeshake=%5B*%5D).
- Multiply supports ESModule and CommonJS. 

```js
const steps = paletten("#22c358")
```
![sample](https://dev.lineheight.cc/src/paletten/__sample.svg)
```js
{
  50: "#e7fbee",
  100: "#cff7dc",
  200: "#a0eeba",
  300: "#70e697",
  400: "#40dd75",
  500: "#22c358",
  600: "#1ea94c",
  700: "#198f41",
  800: "#157535",
  900: "#105b29",
  950: "#0e4e23"
}
```

### Use Cases
- Use as brand-color tokens in your corporate project styled by CSS in JS.
- Use as palette data for theme configuration of CSS/UI frameworks such as tailwindcss and pandacss, MUI, Chakra UI.

## Install

```
$ npm i paletten
```

## Usage

Generate steps from just a color code
```jsx
import { paletten } from 'paletten'

const primary = paletten('#FF0000')

return (
  <div style={{
    color: primary[500],
    background: primary[50]
  }} />
)
```

Generate steps from multiple values
```jsx
const violet = paletten({
    200: 'hsl(260 83% 76%)',
    700: 'hsl(260 79% 38%)',
})

const gray = paletten({
    0: 'hsl(0,0%,100%)',
    1000: 'hsl(0,0%,13%)',
})


return (
  <div style={{
    color: violet[500],
    background: gray[50]
  }} />
)
```


## Options

Set a template of step keys

```jsx
const standard = paletten('#FF0000', { steps: 'standard' })
const coarse = paletten('#FF0000', { steps: 'coarse' })
const fine = paletten('#FF0000', { steps: 'fine' })

console.log(Object.keys(standard))
// result: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
console.log(Object.keys(coarse))
// result: [100, 200, 300, 400, 500, 600, 700, 800, 900]
console.log(Object.keys(fine))
// result: [50, 100, 150, 200, 250, 300, 350, 400, 450,
// 500, 550, 600, 650, 700, 750, 800, 850, 900, 950]
```

Customize step keys as you like
```tsx
const primary = paletten('#FF0000', {
  steps: [200, 400, 600, 800] as const
})

console.log(Object.keys(primary))
// result: [200, 400, 600, 800]
```
Extend step keys

```tsx
const primary = paletten('#FF0000', {
  extend: [10, 75, 150] as const
})

console.log(Object.keys(primary))
// result: [10, 50, 75, 100, 150, 200, 300, 400, ... ]
```

Reverse mapping of step keys

```jsx
const primary = paletten('#FF0000', { reversed: true })

primary[100] // replaced `primary[900]`
```


Finely adjust all colors at once

```jsx
const lightThemePalette = paletten('#FF0000', {
  lighten: 0.1,
  saturate: 0.05,
  rotate: 1,
})

const darkThemePalette = paletten('#FF0000', {
  darken: 0.2,
  desaturate: 0.1,
  rotate: -2,
})

const transparentizedPalette = paletten('hsl(200, 80%, 50%, 0.9)', {
  transparentize: 0.25,
})

const transparencyPalette = paletten('#FF0000', {
  alpha: 0.6,
})

```

Add prefix to object keys

```jsx
const primary = paletten('#FF0000', { prefix: '_' })

return (
  <div style={{ color: primary._500 }}>
    Gray Text
  </div>
)

```

Set a format of color codes 

```jsx
const primary = paletten('#FF0000', { format: 'hsl' })

console.log(primary[500])
// result: 'hsl(0, 100%, 50%)'
```



## Type Guard `(TypeScript Only)`
```jsx
const primary = paletten('#FF0000', {
  steps: [200, 400, 600, 800],
  extend: [25]
})

primary[400] // x type error
primary[25] // x type error
```

You will resolve above error with `as const` suffix, as follows:
```jsx
const primary = paletten('#FF0000', {
  steps: [200, 400, 600, 800] as const,
  extend: [25] as const
})

primary[400] // ○ ok
primary[25] // ○ ok
```


## Standardize Multiple Palettes with `Paletten` Class

```jsx
import { Paletten } from 'paletten'

const { paletten } = new Paletten({
    variant: 'fine',
    format: 'rgb',
    extend: [25]
})

const primary = paletten('hsl(0 100% 60%)')
const secondary = paletten('hsl(200 80% 60%)')

return (
    <>
      <div style={{ background: primary[25] }}>
        Primary Background
      </div>
      <div style={{ background: secondary[25] }}>
        Secondary Background
      </div>
    </>
)
```

## API

```ts
function paletten(

  value: 
       | string                         // set color code: hex or hsl or rgb
       | { [key: number]: string },     // set some amount keys 0-1000

  options?: {
    format?: 'hex' | 'hsl' | 'rgb',              // default: 'hex'
    steps?: 
      'standard' | 'fine' | 'coarse' | number[], // default: 'standard'
    extend?: number[],                           // e.g., [50,150,250]
    prefix?: string,                             // e.g., '_'
    reversed?: boolean                           // default: false

    ligthen?: number                             // amount 0-1 
    darken?: number                              // amount 0-1
    saturate?: number                            // amount 0-1 
    desaturate?: number                          // amount 0-1
    rotate?: number                              // hue deg -360-360 
    transparentize?: number                      // amount 0-1 
    alpha?: number                               // amount 0-1 
  }
)
```

## Designed Coloring Templates

---
![red](https://dev.lineheight.cc/src/paletten/red.svg)
```js
paletten({ 0: "hsl(0 90% 100%)", 100: "hsl(0 90% 94%)", 500: "hsl(0 85% 60%)", 900: "hsl(0 90% 30%)", 1000: "hsl(0 100% 15%)" })
```
---
![deepOrange](https://dev.lineheight.cc/src/paletten/deepOrange.svg)
```js
paletten({ 0: "hsl(15 99% 100%)", 100: "hsl(15 99% 93%)", 500: "hsl(15 99% 55%)", 900: "hsl(18 100% 30%)", 1000: "hsl(20 100% 15%)" })
```
---
![orange](https://dev.lineheight.cc/src/paletten/orange.svg)
```js
paletten({ 0: "hsl(35 98% 100%)", 500: "hsl(30 98% 50%)", 900: "hsl(27 98% 30%)", 1000: "hsl(23 98% 15%)" })
```
---
![amber](https://dev.lineheight.cc/src/paletten/amber.svg)
```js
paletten({ 0: "hsl(50 100% 100%)", 500: "hsl(40 95% 50%)", 900: "hsl(35 100% 30%)", 1000: "hsl(30 100% 10%)" })
```
---
![yellow](https://dev.lineheight.cc/src/paletten/yellow.svg)
```js
paletten({ 0: "hsl(53 100% 100%)", 500: "hsl(53 100% 55%)", 600: "hsl(50 100% 47%)", 900: "hsl(45 100% 25%)", 1000: "hsl(40 100% 15%)" })
```
---
![lime](https://dev.lineheight.cc/src/paletten/lime.svg)
```js
paletten({ 0: "hsl(65 70% 100%)", 500: "hsl(65 70% 50%)", 900: "hsl(65 70% 25%)", 1000: "hsl(70 70% 10%)" })
```
---
![lightGreen](https://dev.lineheight.cc/src/paletten/lightGreen.svg)
```js
paletten({ 0: "hsl(95 70% 100%)", 200: "hsl(95 65% 85%)", 500: "hsl(95 60% 50%)", 900: "hsl(100 60% 25%)", 1000: "hsl(105 60% 10%)" })
```
---
![green](https://dev.lineheight.cc/src/paletten/green.svg)
```js
paletten({ 0: "hsl(140 60% 100%)", 100: "hsl(140 70% 93%)", 200: "hsl(140 70% 88%)", 500: "hsl(140 70% 45%)", 900: "hsl(140 70% 20%)", 1000: "hsl(120 70% 10%)" })
```
---
![emerald](https://dev.lineheight.cc/src/paletten/emerald.svg)
```js
paletten({ 0: "hsl(160 55% 100%)", 100: "hsl(160 60% 90%)", 400: "hsl(160 75% 47%)", 500: "hsl(160 85% 40%)", 900: "hsl(165 100% 15%)", 1000: "hsl(170 100% 5%)" })
```
---
![teal](https://dev.lineheight.cc/src/paletten/teal.svg)
```js
paletten({ 0: "hsl(175 60% 100%)", 400: "hsl(175 60% 53%)", 500: "hsl(175 80% 40%)", 900: "hsl(180 75% 20%)", 1000: "hsl(185 70% 10%)" })
```
---
![cyan](https://dev.lineheight.cc/src/paletten/cyan.svg)
```js
paletten({ 0: "hsl(190 95% 100%)", 300: "hsl(190 90% 70%)", 400: "hsl(190 85% 55%)", 500: "hsl(190 95% 45%)", 900: "hsl(195 95% 20%)", 1000: "hsl(200 95% 10%)" })
```
---
![sky](https://dev.lineheight.cc/src/paletten/sky.svg)
```js
paletten({ 0: "hsl(200 100% 100%)", 100: "hsl(200 100% 93%)", 500: "hsl(200 95% 48%)", 900: "hsl(200 95% 25%)", 1000: "hsl(205 95% 10%)" })
```
---
![blue](https://dev.lineheight.cc/src/paletten/blue.svg)
```js
paletten({ 0: "hsl(215 100% 100%)", 100: "hsl(215 100% 93%)", 500: "hsl(215 90% 60%)", 900: "hsl(215 95% 25%)", 1000: "hsl(220 100% 10%)" })
```
---
![indigo](https://dev.lineheight.cc/src/paletten/indigo.svg)
```js
paletten({ 0: "hsl(220 100% 100%)", 100: "hsl(225 100% 93%)", 500: "hsl(235 75% 60%)", 600: "hsl(235 65% 48%)", 900: "hsl(235 65% 30%)", 1000: "hsl(240 100% 10%)" })
```
---
![violet](https://dev.lineheight.cc/src/paletten/violet.svg)
```js
paletten({ 0: "hsl(250 100% 100%)", 100: "hsl(255 100% 94%)", 500: "hsl(260 70% 58%)", 600: "hsl(260 65% 48%)", 900: "hsl(260 90% 30%)", 1000: "hsl(260 100% 15%)" })
```
---
![purple](https://dev.lineheight.cc/src/paletten/purple.svg)
```js
paletten({ 0: "hsl(275 100% 100%)", 100: "hsl(275 100% 94%)", 300: "hsl(275 85% 85%)", 400: "hsl(275 80% 75%)", 500: "hsl(275 70% 60%)", 600: "hsl(275 60% 50%)", 900: "hsl(275 90% 30%)", 1000: "hsl(280 100% 15%)" })
```
---
![fuchsia](https://dev.lineheight.cc/src/paletten/fuchsia.svg)
```js
paletten({ 0: "hsl(285 100% 100%)", 200: "hsl(285 95% 90%)", 500: "hsl(290 80% 60%)", 600: "hsl(290 60% 50%)", 900: "hsl(295 90% 30%)", 1000: "hsl(295 100% 15%)" })
```
---
![pink](https://dev.lineheight.cc/src/paletten/pink.svg)
```js
paletten({ 0: "hsl(330 100% 100%)", 200: "hsl(330 95% 90%)", 500: "hsl(330 80% 55%)", 600: "hsl(330 65% 50%)", 900: "hsl(330 90% 30%)", 1000: "hsl(330 100% 15%)" })
```
---
![rose](https://dev.lineheight.cc/src/paletten/rose.svg)
```js
paletten({ 0: "hsl(350 100% 100%)", 200: "hsl(350 95% 90%)", 500: "hsl(350 80% 55%)", 600: "hsl(350 65% 49%)", 900: "hsl(345 90% 30%)", 1000: "hsl(340 100% 12%)" })
```
---
![brown](https://dev.lineheight.cc/src/paletten/brown.svg)
```js
paletten({ 0: "hsl(15 25% 100%)", 100: "hsl(15 25% 93%)", 200: "hsl(15 25% 85%)", 500: "hsl(15 25% 40%)", 900: "hsl(10 30% 25%)", 1000: "hsl(10 35% 10%)" })
```
---
![gray](https://dev.lineheight.cc/src/paletten/gray.svg)
```js
paletten({ 0: "hsl(0 0% 100%)", 100: "hsl(0 0% 95%)", 200: "hsl(0 0% 90%)", 500: "hsl(0 0% 50%)", 1000: "hsl(0 0% 0%)" })
```
---
![blueGray](https://dev.lineheight.cc/src/paletten/blueGray.svg)
```js
paletten({ 0: "hsl(200 10% 100%)", 100: "hsl(200 10% 95%)", 200: "hsl(200 10% 90%)", 500: "hsl(200 10% 50%)", 1000: "hsl(200 10% 0%)" })
```

## License

[MIT License](https://andreasonny.mit-license.org/2019) © otsubocloud