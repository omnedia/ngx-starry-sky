# ngx-starry-sky

`@omnedia/ngx-starry-sky` is an Angular library that creates a beautiful starry sky background with optional shooting star effects. This component is fully customizable, allowing you to adjust the density of stars, the behavior of shooting stars, and the overall appearance of the sky.

## Features

- Realistic starry sky background with twinkling stars.
- Configurable shooting star effects, including speed, color, and frequency.
- Fully customizable star density, twinkle behavior, and sky color.
- Lightweight and easy to integrate as a standalone component.

## Installation

Install the library using npm:

```bash
npm install @omnedia/ngx-starry-sky
```

## Usage

Import the `NgxStarrySkyComponent` in your Angular module or component:

```typescript
import { NgxStarrySkyComponent } from '@omnedia/ngx-starry-sky';

@Component({
  ...
  imports: [
    ...
    NgxStarrySkyComponent,
  ],
  ...
})
```

Use the component in your template:

```html
<om-starry-sky
  [skyColor]="'#0a0a0a'"
  [starsBackgroundConfig]="{
    starDensity: 0.0002,
    allStarsTwinkle: true,
    twinkleProbability: 0.8
  }"
  [shootingStarsConfig]="{
    minSpeed: 15,
    maxSpeed: 35,
    starColor: '#FFFFFF',
    trailColor: '#FF6347'
  }"
  styleClass="custom-starry-sky"
>
  <h1>Your content here</h1>
</om-starry-sky>
```

## API

```html
<om-starry-sky
  [skyColor]="skyColor"
  [starsBackgroundConfig]="starsBackgroundConfig"
  [shootingStarsConfig]="shootingStarsConfig"
  [disableShootingStars]="disableShootingStars"
  styleClass="your-custom-class"
>
  <ng-content></ng-content>
</om-starry-sky>
```

- `skyColor` (optional): The background color of the sky. Accepts any valid CSS color value.
- `starsBackgroundConfig` (optional): Configuration object for the starry background, including star density, twinkle behavior, and twinkle speed.
- `shootingStarsConfig` (optional): Configuration object for the shooting stars, including speed, color, and frequency.
- `disableShootingStars` (optional): A boolean to enable or disable shooting stars. Defaults to false.
- `styleClass` (optional): A custom CSS class to apply to the starry sky container.

## Configuration Options

### `starsBackgroundConfig`

- `starDensity`: The density of stars in the sky, affecting how many stars are rendered. Defaults to 0.00015.
- `allStarsTwinkle`: A boolean to enable or disable twinkling for all stars. Defaults to true.
- `twinkleProbability`: The probability that a star will twinkle if allStarsTwinkle is false. Defaults to 0.7.
- `minTwinkleSpeed`: The minimum speed of the twinkling effect. Defaults to 0.5.
- `maxTwinkleSpeed`: The maximum speed of the twinkling effect. Defaults to 1.

### `shootingStarsConfig`

- `minSpeed`: The minimum speed of the shooting stars. Defaults to 10.
- `maxSpeed`: The maximum speed of the shooting stars. Defaults to 30.
- `minDelay`: The minimum delay between shooting stars in milliseconds. Defaults to 1200ms.
- `maxDelay`: The maximum delay between shooting stars in milliseconds. Defaults to 4200ms.
- `starColor`: The color of the shooting stars. Defaults to #9E00FF.
- `trailColor`: The color of the trail left by the shooting stars. Defaults to #2EB9DF.
- `starWidth`: The width of the shooting stars. Defaults to 10px.
- `starHeight`: The height of the shooting stars. Defaults to 1px.

## Example

```html
<om-starry-sky
  [skyColor]="'#000022'"
  [starsBackgroundConfig]="{
    starDensity: 0.00025,
    twinkleProbability: 0.9,
    minTwinkleSpeed: 0.3,
    maxTwinkleSpeed: 0.7
  }"
  [shootingStarsConfig]="{
    minSpeed: 20,
    maxSpeed: 40,
    starColor: '#FFD700',
    trailColor: '#FF4500'
  }"
  styleClass="starry-sky-custom"
>
  <div class="content">Magical Night Sky</div>
</om-starry-sky>
```

This example creates a starry sky with higher star density, frequent twinkling, and golden shooting stars with a fiery trail.

## Styling

To further customize the appearance of the starry sky or container, use the styleClass input to apply your own CSS classes.

```css
.starry-sky-custom {
  position: relative;
  height: 100vh;
  background-color: #000022;
}

.content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding-top: 50px;
}
```

This will create a fullscreen starry sky with custom content displayed on top.

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.