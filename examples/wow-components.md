# Wow Components — readme-aura Built-in Library

`StatsCard` and `MockupPhone` ship with readme-aura and are available in every `aura` block
without any imports. Just use them like `<StatsCard github={github} />`.

***

## Hero Banner

![component-0](./assets/component-0.svg)

***

## `<StatsCard />`

Cyberpunk/neon stats card — stars, commits, repos, forks as glowing tiles with a language strip.
Syntax: ` ```aura width=800 height=190 ` then `<StatsCard github={github} />` then ` ``` `.

![component-1](./assets/component-1.svg)

You can spread-override specific values for static/preview use:

![component-2](./assets/component-2.svg)

***

## `<MockupPhone />`

Phone-frame mockup — avatar initial, mini stats bar, and top repositories inside a phone shell.
Syntax: ` ```aura width=380 height=680 ` then `<MockupPhone github={github} />` then ` ``` `.

![component-3](./assets/component-3.svg)

***

## Combined Dashboard

Both components composed inside a single `aura` block — phone frame on the right, stats and
language grid on the left, all unified on one dark canvas.

![component-4](./assets/component-4.svg)

***

## Custom Composition (Raw JSX)

Full creative control — no components required. This is a hand-written profile card using only
raw Satori-compatible JSX with gradients, glows, and live GitHub data.

![component-5](./assets/component-5.svg)
