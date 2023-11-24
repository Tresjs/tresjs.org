---
title: 'TresJS 1 Year Anniversary'
description: 'Lorem ipsum dolor sit amet'
pubDate: 'Nov 28 2023'
author: alvaro-saburido
heroImage: '/blog/anniversary/tres-1-year-anniversary.webp'
---

A year ago, I was learning how to use React Three Fiber, a custom renderer with the power of creating 3D scenes declarately with React components and it blowed my mind 🤯. 

Then, I did what I do best, complain in twitter 😅 😂:

![Tweet complaining about the lack of a 3D framework on VueJS](/blog/anniversary/the-spark.png)

Yep, that was the panorama for VueJS developers like me back then. There were some initiatives like TroisJS, a manual wrapper of ThreeJS for VueJS that became unmantained and Lunchbox, who were the firsts to try to create a renderer. But, it was not enough for me, inspired by Pmndrs work and Thretle for Svelte I decided to create a renderer for VueJS, and that's how TresJS was born.

I started with a simple idea, provide the vue community with a ecosystem that would allow you to create 3D scenes declaratively with VueJS components and that was easy to mantain and extend.

![](/blog/anniversary/the-confirmation-tweet.png)

For us it was important to solve the biggest problems of previous solutions:

- Keep it up to date with ThreeJS which constantly updates
- A good DX, we wanted to make it easy to use and learn
- Performant, even with reactivity. 
- Extendable, we wanted to make it easy to create new components and extend the core library with community-driven packages.
  

Although v1 was a decent solution 😄 and we managed to achieve some of the goals, it has some limitations that would only be solved by using [Vue's Custom Renderer API](https://vuejs.org/api/custom-renderer.html).

