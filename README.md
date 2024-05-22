This is my (vivlim's) fork of ztext. I wanted to add some additional effects, and along the way had to figure out how to make the project buildable.

## My changes

- Use `pug` to template the index page, instead of `slim`; this avoids a dependency on ruby
- Use latest versions available of dependencies
- Add github action to publish to https://vivlim.github.io/ztext

![ztext.js](https://bennettfeely.com/ztext/img/logo.png)

## 3D typography for any website and any font

Live: https://vivlim.github.io/ztext (also see https://bennettfeely.com/ztext)

Ztext gives the illusion of volume by creating layers from an HTML element. There's no need to spend hours fiddling with `<canvas>` or forcing users to download multi-megabyte WebGL libraries. Content remains fully selectable and accessible.

### Frameworks

For using React implementation, see [react-ztext](https://github.com/snettah/react-ztext) by [@snettah](https://github.com/snettah).

For using Vue implementation, see [vue-ztext](https://github.com/snettah/vue-ztext) by [@Namchee](https://github.com/Namchee).
